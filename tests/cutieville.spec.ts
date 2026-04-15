import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser: b }) => {
  browser = b;
  context = await browser.newContext();
  page = await context.newPage();
});

// Браузер не закрываем — чтобы видеть результат после тестов

// ── Тесты ────────────────────────────────────────────────────────────────────

test('Регистрация нового пользователя', async () => {
  test.setTimeout(180_000);

  const email = `test_${Date.now()}@mailinator.com`;
  const password = 'Test1234!';

  // Автоматически закрываем онбординг-модал когда он появляется
  await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
    await page.locator('#onboarding-modal .btn-close').first().click();
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.click('a:has-text("Sign in")');
  await page.waitForSelector('#user_email', { state: 'visible' });
  await page.click('a:has-text("Sign Up")');
  // Ждём поле подтверждения пароля — оно есть только на странице Sign Up
  await page.waitForSelector('#user_password_confirmation', { state: 'visible' });

  await page.locator('#user_email').click();
  await page.locator('#user_email').pressSequentially(email, { delay: 50 });

  await page.locator('#user_password').click();
  await page.locator('#user_password').pressSequentially(password, { delay: 50 });

  await page.locator('#user_password_confirmation').click();
  await page.locator('#user_password_confirmation').pressSequentially(password, { delay: 50 });

  await page.click('input[name="commit"]');

  // После регистрации переход на страницу "Finish your account"
  await page.waitForURL(/registration_step\/names/, { timeout: 60000 });

  // Генерируем случайное имя
  const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
  const firstName = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);

  await page.locator('#user_first_name').click();
  await page.locator('#user_first_name').pressSequentially(firstName, { delay: 80 });

  await page.click('input[name="commit"]');

  // Пауза — браузер остаётся открытым пока не закроешь вручную
  await page.pause();
});
