const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });

  const email = `inspect3_${Date.now()}@mailinator.com`;
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

  // Открываем дропдаун юзера
  await page.locator('#navbarScrollingDropdown').click();
  await page.waitForTimeout(1000);

  // Кликаем Settings
  await page.locator('button.dropdown-item[data-bs-toggle="offcanvas"]').click();
  await page.waitForTimeout(2000);

  // Смотрим что в offcanvas
  const offcanvasContent = await page.evaluate(() => {
    const oc = document.querySelector('.offcanvas, [class*="offcanvas"]');
    if (!oc) return 'offcanvas not found';
    return {
      html: oc.innerHTML.substring(0, 3000),
      links: Array.from(oc.querySelectorAll('a, button')).map(e => ({
        tag: e.tagName,
        text: e.textContent.trim().substring(0, 60),
        href: e.getAttribute('href'),
        cls: (e.className || '').substring(0, 60),
      }))
    };
  });
  console.log('=== OFFCANVAS ===');
  console.log(JSON.stringify(offcanvasContent, null, 2));

  await browser.close();
})();
