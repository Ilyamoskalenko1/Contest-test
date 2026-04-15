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

  // Регистрируем пользователя
  const email = `inspect6_${Date.now()}@mailinator.com`;
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

  // Кликаем Participate в футере (bottom bar)
  await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  await page.waitForTimeout(2000);
  console.log('=== URL choose_baby:', page.url());

  // Смотрим кнопки Boy/Girl
  const btns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, [class*="card"], [class*="choose"]')).slice(0, 20).map(e => ({
      tag: e.tagName,
      text: (e.textContent || '').trim().substring(0, 60),
      href: e.getAttribute('href'),
      cls: (e.className || '').substring(0, 80),
      id: e.id,
    })).filter(e => e.text);
  });
  console.log('=== CHOOSE BABY PAGE ===');
  console.log(JSON.stringify(btns, null, 2));

  // Ищем Boy
  const boyLink = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('a, button'));
    const boy = all.find(e => (e.textContent || '').toLowerCase().includes('boy'));
    return boy ? { tag: boy.tagName, text: boy.textContent.trim(), href: boy.getAttribute('href'), cls: boy.className } : null;
  });
  console.log('=== BOY ELEMENT ===', JSON.stringify(boyLink));

  await browser.close();
})();
