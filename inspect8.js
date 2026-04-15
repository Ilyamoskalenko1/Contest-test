const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });
  await page.addLocatorHandler(page.locator('.auto-modal'), async () => {
    await page.locator('.auto-modal').locator('text=Close').click();
  });

  const email = `inspect9_${Date.now()}@mailinator.com`;
  const password = 'Test1234!';
  await page.goto('https://staging.cutieville.com/users/sign_up', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#user_password_confirmation', { state: 'visible' });
  await page.locator('#user_email').pressSequentially(email, { delay: 30 });
  await page.locator('#user_password').pressSequentially(password, { delay: 30 });
  await page.locator('#user_password_confirmation').pressSequentially(password, { delay: 30 });
  await page.click('input[name="commit"]');
  await page.waitForURL(/registration_step\/names/, { timeout: 60000 });
  await page.locator('#user_first_name').pressSequentially('TestUser', { delay: 30 });
  await page.click('input[name="commit"]');
  await page.waitForTimeout(3000);

  // Participate → Boy → имя → фото
  await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  await page.waitForTimeout(2000);
  await page.locator('button.gender-button:has-text("Boy")').click();
  await page.waitForTimeout(2000);
  await page.locator('#baby_name').pressSequentially('automated baby', { delay: 30 });
  await page.locator('input[type="submit"][name="commit"]').click();
  await page.waitForTimeout(2000);

  // Загружаем фото
  await page.locator('#baby_image').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/automated baby.jpeg');
  await page.waitForTimeout(2000);

  // Ждём кнопку PROCEED
  await page.waitForSelector('input[value="PROCEED"]:not([disabled])', { timeout: 15000 });
  console.log('PROCEED button enabled!');
  await page.locator('input[value="PROCEED"]').click();
  await page.waitForTimeout(2000);
  console.log('=== URL после PROCEED:', page.url());

  // Смотрим дату
  const html = await page.evaluate(() => {
    const form = document.querySelector('form[id*="baby"]');
    return form ? form.innerHTML.substring(0, 5000) : document.body.innerHTML.substring(0, 5000);
  });
  console.log('=== DATE STEP HTML ===');
  console.log(html);

  const fields = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select, [class*="date"], [class*="calendar"]')).map(e => ({
      tag: e.tagName,
      type: e.getAttribute('type'),
      id: e.id,
      name: e.getAttribute('name'),
      cls: (e.className || '').substring(0, 100),
    }));
  });
  console.log('=== DATE FIELDS ===');
  console.log(JSON.stringify(fields, null, 2));

  await browser.close();
})();
