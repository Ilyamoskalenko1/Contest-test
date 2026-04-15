const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });

  // Регистрируем нового пользователя
  const email = `inspect_${Date.now()}@mailinator.com`;
  const password = 'Test1234!';

  await page.goto('https://staging.cutieville.com/users/sign_up', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#user_email', { state: 'visible' });

  await page.locator('#user_email').fill(email);
  await page.locator('#user_password').fill(password);
  await page.locator('#user_password_confirmation').fill(password);
  await page.click('input[name="commit"]');

  await page.waitForTimeout(3000);

  console.log('URL после регистрации:', page.url());

  const inputs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('input, button, select, textarea')).map(e => ({
      tag: e.tagName,
      type: e.getAttribute('type'),
      name: e.getAttribute('name'),
      id: e.id,
      placeholder: e.getAttribute('placeholder'),
      text: (e.textContent || '').trim().substring(0, 40),
    }))
  );
  console.log(JSON.stringify(inputs, null, 2));

  await browser.close();
})();
