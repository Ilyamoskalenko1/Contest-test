const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  const dump = async (label) => {
    await page.waitForTimeout(500);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`=== ${label} | URL: ${page.url()}`);
    console.log('='.repeat(60));
    const btns = await page.evaluate(() =>
      Array.from(document.querySelectorAll('button, input[type="submit"], a.btn, a[class*="btn"], a[class*="view-contest"]')).map(e => ({
        tag: e.tagName,
        text: (e.value || e.textContent || '').trim().substring(0, 60),
        cls: (e.className || '').substring(0, 80),
        href: e.getAttribute('href'),
        disabled: e.disabled,
      })).filter(e => e.text && e.text.length > 1)
    );
    console.log('Buttons/Links:', JSON.stringify(btns, null, 2));
  };

  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });
  await page.addLocatorHandler(page.locator('.auto-modal'), async () => {
    await page.locator('.auto-modal').locator('text=Close').click();
  });

  // ── Регистрация ──────────────────────────────────────────────────────────────
  const email = `allinspect5_${Date.now()}@mailinator.com`;
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

  // ── Все шаги до CONTINUE ─────────────────────────────────────────────────────
  await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  await page.waitForTimeout(2000);
  await page.locator('button.gender-button:has-text("Boy")').click();
  await page.waitForTimeout(2000);
  await page.locator('#baby_name').pressSequentially('automated baby', { delay: 30 });
  await page.locator('input[type="submit"][name="commit"]').click();
  await page.waitForTimeout(2000);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
    page.locator('#baby_image').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/automated baby.jpeg'),
  ]);
  await page.waitForTimeout(2000);
  await page.locator('td[data-action="selectDay"]:not(.disabled):not(.old)').first().click();
  await page.waitForTimeout(1000);
  await page.locator('input[value="PROCEED"]').first().click({ force: true });
  await page.waitForTimeout(3000);

  // ── CONTINUE ─────────────────────────────────────────────────────────────────
  await page.locator('input.btn-finish[value="CONTINUE"]').click();
  await page.waitForTimeout(3000);
  await dump('STEP 6: after CONTINUE (Enter Sharing?)');

  const html = await page.evaluate(() => document.body.innerHTML.substring(0, 8000));
  console.log('\n=== STEP 6 BODY HTML ===');
  console.log(html);

  await browser.close();
})();
