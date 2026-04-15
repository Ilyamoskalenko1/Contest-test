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

  const email = `avatartest2_${Date.now()}@mailinator.com`;
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

  await page.locator('#navbarScrollingDropdown').click();
  await page.waitForTimeout(800);
  await page.locator('button.dropdown-item[data-bs-toggle="offcanvas"]').click();
  await page.waitForSelector('.offcanvas.show', { state: 'visible', timeout: 10000 });
  await page.locator('.offcanvas a:has-text("Profile Settings")').click();
  await page.waitForSelector('#user_avatar', { state: 'attached', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Смотрим HTML вокруг формы профиля — первые 5000 символов
  const formHtml = await page.evaluate(() => {
    const form = document.querySelector('form[id*="user"]');
    return form ? form.outerHTML.substring(0, 5000) : document.querySelector('.container').innerHTML.substring(0, 5000);
  });
  console.log('=== PROFILE FORM HTML ===');
  console.log(formHtml);

  await browser.close();
})();
