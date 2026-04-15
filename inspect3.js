const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });

  const email = `inspect4_${Date.now()}@mailinator.com`;
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
  await page.waitForTimeout(4000);

  // Открываем дропдаун → Settings → Profile Settings
  await page.locator('#navbarScrollingDropdown').click();
  await page.waitForTimeout(800);
  await page.locator('button.dropdown-item[data-bs-toggle="offcanvas"]').click();
  await page.waitForTimeout(1500);
  await page.locator('.offcanvas a:has-text("Profile Settings")').click();
  await page.waitForTimeout(3000);

  console.log('URL:', page.url());

  // Смотрим все инпуты, селекты, кнопки на странице
  const fields = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select, textarea, button[type="submit"], input[type="submit"], input[type="file"]')).map(e => ({
      tag: e.tagName,
      type: e.getAttribute('type'),
      id: e.id,
      name: e.getAttribute('name'),
      cls: (e.className || '').substring(0, 60),
      placeholder: e.getAttribute('placeholder'),
      value: e.tagName === 'SELECT' ? Array.from(e.options).slice(0, 5).map(o => o.text) : undefined,
    }));
  });
  console.log('=== FIELDS ===');
  console.log(JSON.stringify(fields, null, 2));

  // Смотрим структуру страницы (аватар, локация)
  const sections = await page.evaluate(() => {
    const avatarArea = document.querySelector('[class*="avatar"], [id*="avatar"], [class*="photo"], [id*="photo"]');
    const locationArea = document.querySelector('[class*="location"], [id*="location"], [id*="city"], [class*="city"]');
    return {
      avatarHtml: avatarArea ? avatarArea.outerHTML.substring(0, 500) : 'not found',
      locationHtml: locationArea ? locationArea.outerHTML.substring(0, 500) : 'not found',
    };
  });
  console.log('=== AVATAR AREA ===');
  console.log(sections.avatarHtml);
  console.log('=== LOCATION AREA ===');
  console.log(sections.locationHtml);

  await browser.close();
})();
