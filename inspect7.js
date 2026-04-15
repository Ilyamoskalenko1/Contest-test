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

  const email = `inspect8_${Date.now()}@mailinator.com`;
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

  // Participate → Boy → имя
  await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  await page.waitForTimeout(2000);
  await page.locator('button.gender-button:has-text("Boy")').click();
  await page.waitForTimeout(2000);

  // Вводим имя
  await page.locator('#baby_name').pressSequentially('automated baby', { delay: 30 });
  await page.locator('input[type="submit"][name="commit"]').click();
  await page.waitForTimeout(2000);
  console.log('=== URL после имени:', page.url());

  // Смотрим страницу с фото
  const fields = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, [class*="upload"], [class*="dropzone"], [class*="photo-upload"], label')).map(e => ({
      tag: e.tagName,
      type: e.getAttribute('type'),
      id: e.id,
      name: e.getAttribute('name'),
      cls: (e.className || '').substring(0, 100),
      for: e.getAttribute('for'),
      text: (e.textContent || '').trim().substring(0, 60),
    }));
  });
  console.log('=== PHOTO PAGE FIELDS ===');
  console.log(JSON.stringify(fields, null, 2));

  const bodyHtml = await page.evaluate(() => {
    const main = document.querySelector('.container form, form[id*="baby"]');
    return main ? main.innerHTML.substring(0, 4000) : 'not found';
  });
  console.log('=== FORM HTML ===');
  console.log(bodyHtml);

  await browser.close();
})();
