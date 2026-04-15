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

  const email = `inspect7_${Date.now()}@mailinator.com`;
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

  // Participate → Boys
  await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  await page.waitForTimeout(2000);
  await page.locator('button.gender-button:has-text("Boy")').click();
  await page.waitForTimeout(2000);
  console.log('=== URL after Boy:', page.url());

  // Смотрим поля на странице (имя ребёнка, фото, дата)
  const fields = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select, [class*="upload"], [class*="dropzone"], [class*="photo"]')).map(e => ({
      tag: e.tagName,
      type: e.getAttribute('type'),
      id: e.id,
      name: e.getAttribute('name'),
      cls: (e.className || '').substring(0, 80),
      placeholder: e.getAttribute('placeholder'),
    }));
  });
  console.log('=== FIELDS ===');
  console.log(JSON.stringify(fields, null, 2));

  // Смотрим кнопки и ссылки
  const btns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, input[type="submit"], a.btn')).map(e => ({
      tag: e.tagName,
      text: (e.textContent || '').trim().substring(0, 60),
      cls: (e.className || '').substring(0, 80),
      id: e.id,
    })).filter(e => e.text);
  });
  console.log('=== BUTTONS ===');
  console.log(JSON.stringify(btns, null, 2));

  // HTML страницы (первые 3000 символов основного контента)
  const mainHtml = await page.evaluate(() => {
    const main = document.querySelector('main, [class*="main"], .container form, form');
    return main ? main.innerHTML.substring(0, 3000) : document.body.innerHTML.substring(0, 3000);
  });
  console.log('=== MAIN HTML ===');
  console.log(mainHtml);

  await browser.close();
})();
