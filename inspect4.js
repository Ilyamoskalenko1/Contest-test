const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });
  await page.addLocatorHandler(page.locator('.auto-modal'), async () => {
    await page.locator('.auto-modal').locator('text=Close').click();
  });

  // Регистрируем пользователя
  const email = `inspect5_${Date.now()}@mailinator.com`;
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

  console.log('=== После регистрации, URL:', page.url());

  // Ищем Participate в футере
  const footerParticipate = await page.evaluate(() => {
    const footer = document.querySelector('footer, [class*="footer"], .bottom-nav, nav[class*="bottom"]');
    if (!footer) return 'footer not found';
    return footer.innerHTML.substring(0, 1000);
  });
  console.log('=== FOOTER ===');
  console.log(footerParticipate);

  // Ищем все ссылки с текстом Participate
  const participateLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).filter(e =>
      (e.textContent || '').trim().toLowerCase().includes('participate')
    ).map(e => ({
      tag: e.tagName,
      text: e.textContent.trim().substring(0, 50),
      href: e.getAttribute('href'),
      cls: (e.className || '').substring(0, 80),
    }));
  });
  console.log('=== PARTICIPATE LINKS ===');
  console.log(JSON.stringify(participateLinks, null, 2));

  await browser.close();
})();
