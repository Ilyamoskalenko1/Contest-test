# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cutieville.spec.ts >> Регистрация нового пользователя
- Location: tests/cutieville.spec.ts:19:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
  2   | 
  3   | test.describe.configure({ mode: 'serial' });
  4   | 
  5   | let browser: Browser;
  6   | let context: BrowserContext;
  7   | let page: Page;
  8   | 
  9   | test.beforeAll(async ({ browser: b }) => {
  10  |   browser = b;
  11  |   context = await browser.newContext();
  12  |   page = await context.newPage();
  13  | });
  14  | 
  15  | // Браузер не закрываем — чтобы видеть результат после тестов
  16  | 
  17  | // ── Тесты ────────────────────────────────────────────────────────────────────
  18  | 
  19  | test('Регистрация нового пользователя', async () => {
  20  |   test.setTimeout(180_000);
  21  | 
  22  |   const email = `test_${Date.now()}@mailinator.com`;
  23  |   const password = 'Test1234!';
  24  | 
  25  |   // Автоматически закрываем онбординг-модал когда он появляется
  26  |   await page.addLocatorHandler(page.locator('#onboarding-modal'), async () => {
  27  |     await page.locator('#onboarding-modal .btn-close').first().click();
  28  |   });
  29  | 
  30  |   // Закрываем achievement-модалы (badge-modal) когда они появляются
  31  |   await page.addLocatorHandler(page.locator('.auto-modal'), async () => {
  32  |     await page.locator('.auto-modal').locator('text=Close').click();
  33  |   });
  34  | 
> 35  |   await page.goto('/', { waitUntil: 'domcontentloaded' });
      |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  36  |   await page.click('a:has-text("Sign in")');
  37  |   await page.waitForSelector('#user_email', { state: 'visible' });
  38  |   await page.click('a:has-text("Sign Up")');
  39  |   // Ждём поле подтверждения пароля — оно есть только на странице Sign Up
  40  |   await page.waitForSelector('#user_password_confirmation', { state: 'visible' });
  41  | 
  42  |   await page.locator('#user_email').click();
  43  |   await page.locator('#user_email').pressSequentially(email, { delay: 50 });
  44  | 
  45  |   await page.locator('#user_password').click();
  46  |   await page.locator('#user_password').pressSequentially(password, { delay: 50 });
  47  | 
  48  |   await page.locator('#user_password_confirmation').click();
  49  |   await page.locator('#user_password_confirmation').pressSequentially(password, { delay: 50 });
  50  | 
  51  |   await page.click('input[name="commit"]');
  52  | 
  53  |   // После регистрации переход на страницу "Finish your account"
  54  |   await page.waitForURL(/registration_step\/names/, { timeout: 60000 });
  55  | 
  56  |   // Генерируем случайное имя
  57  |   const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
  58  |   const firstName = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);
  59  | 
  60  |   await page.locator('#user_first_name').click();
  61  |   await page.locator('#user_first_name').pressSequentially(firstName, { delay: 80 });
  62  | 
  63  |   await page.click('input[name="commit"]');
  64  | 
  65  |   // Ждём загрузки главной страницы после регистрации
  66  |   await page.waitForTimeout(3000);
  67  | });
  68  | 
  69  | test('Добавление фото и добавление локации', async () => {
  70  |   test.setTimeout(120_000);
  71  | 
  72  |   // 1. Открываем дропдаун с именем пользователя
  73  |   await page.locator('#navbarScrollingDropdown').click();
  74  |   await page.waitForTimeout(800);
  75  | 
  76  |   // 2. Кликаем Settings (открывает offcanvas)
  77  |   await page.locator('button.dropdown-item[data-bs-toggle="offcanvas"]').click();
  78  |   // Ждём пока offcanvas полностью откроется
  79  |   await page.waitForSelector('.offcanvas.show', { state: 'visible', timeout: 10000 });
  80  | 
  81  |   // 3. Кликаем Profile Settings
  82  |   await page.locator('.offcanvas a:has-text("Profile Settings")').click();
  83  |   // Ждём появления поля аватара — скрытый input, ждём attached-состояния
  84  |   await page.waitForSelector('#user_avatar', { state: 'attached', timeout: 30000 });
  85  |   await page.waitForTimeout(1000);
  86  | 
  87  |   // 4. Загружаем фото — кликаем на #profileEditImageBlock чтобы открыть file chooser
  88  |   const [fileChooser] = await Promise.all([
  89  |     page.waitForEvent('filechooser', { timeout: 10000 }),
  90  |     page.locator('#profileEditImageBlock').click(),
  91  |   ]);
  92  |   await fileChooser.setFiles('/Users/aleksandrpasinin/Documents/Партиципуки/аватар.png');
  93  |   await page.waitForTimeout(2000);
  94  | 
  95  |   // 5. Выбираем регион (локация)
  96  |   await page.locator('#user_region_id').selectOption({ index: 1 });
  97  |   await page.waitForTimeout(500);
  98  | 
  99  |   // 6. Нажимаем Save Changes
  100 |   await page.locator('text=SAVE CHANGES').click();
  101 |   await page.waitForTimeout(3000);
  102 |   // Не делаем pause() здесь — продолжаем в следующем тесте
  103 | });
  104 | 
  105 | test('Создание участника авторизованным пользователем', async () => {
  106 |   test.setTimeout(180_000);
  107 | 
  108 |   // 1. Кликаем Participate в футере
  109 |   await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
  110 |   await page.waitForSelector('button.gender-button:has-text("Boy")', { timeout: 20000 });
  111 | 
  112 |   // 2. Кликаем Boy, вводим имя
  113 |   await page.locator('button.gender-button:has-text("Boy")').click();
  114 |   await page.waitForSelector('#baby_name', { timeout: 20000 });
  115 |   await page.waitForTimeout(1000);
  116 |   await page.locator('#baby_name').pressSequentially('automated baby', { delay: 50 });
  117 |   await page.locator('input[type="submit"][name="commit"]').click();
  118 |   await page.waitForTimeout(2000);
  119 | 
  120 |   // 3. Загружаем фото — setInputFiles вызывает авто-навигацию на следующий шаг
  121 |   await page.waitForSelector('#baby_image', { state: 'attached', timeout: 15000 });
  122 |   await Promise.all([
  123 |     page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
  124 |     page.locator('#baby_image').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/automated baby.jpeg'),
  125 |   ]);
  126 |   await page.waitForTimeout(2000);
  127 | 
  128 |   // 4. Выбираем любую доступную дату из пикера и кликаем PROCEED
  129 |   await page.waitForSelector('td[data-action="selectDay"]:not(.disabled):not(.old)', { timeout: 15000 });
  130 |   await page.locator('td[data-action="selectDay"]:not(.disabled):not(.old)').first().click();
  131 |   await page.waitForTimeout(1000);
  132 |   await page.locator('input[value="PROCEED"]').first().click({ force: true });
  133 |   await page.waitForTimeout(3000);
  134 | 
  135 |   // 5. Кликаем Continue (страница с отзывами)
```