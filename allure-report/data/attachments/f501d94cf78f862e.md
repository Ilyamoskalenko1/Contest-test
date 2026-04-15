# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cutieville.spec.ts >> Создание участника авторизованным пользователем
- Location: tests/cutieville.spec.ts:103:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
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
  35  |   await page.goto('/', { waitUntil: 'domcontentloaded' });
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
  87  |   // 4. Загружаем фото (input скрыт, setInputFiles работает с hidden-инпутами)
  88  |   await page.locator('#user_avatar').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/аватар.png');
  89  |   await page.waitForTimeout(1000);
  90  | 
  91  |   // 5. Выбираем регион (локация)
  92  |   await page.locator('#user_region_id').selectOption({ index: 1 });
  93  |   await page.waitForTimeout(500);
  94  | 
  95  |   // 6. Нажимаем Save Changes
  96  |   await page.locator('text=SAVE CHANGES').click();
  97  |   await page.waitForTimeout(3000);
  98  | 
  99  |   // Пауза — браузер остаётся открытым для проверки
  100 |   await page.pause();
  101 | });
  102 | 
  103 | test('Создание участника авторизованным пользователем', async () => {
  104 |   test.setTimeout(180_000);
  105 | 
  106 |   // 1. Кликаем Participate в футере
> 107 |   await page.locator('a[href*="choose_baby"][href*="bottom_bar"]').click();
      |                                                                    ^ Error: locator.click: Target page, context or browser has been closed
  108 |   await page.waitForURL(/babies\/new/, { timeout: 15000 });
  109 |   await page.waitForTimeout(1000);
  110 | 
  111 |   // 2. Кликаем Boy, вводим имя
  112 |   await page.locator('button.gender-button:has-text("Boy")').click();
  113 |   await page.waitForURL(/babies\/\d+\/registration/, { timeout: 15000 });
  114 |   await page.waitForTimeout(1000);
  115 |   await page.locator('#baby_name').pressSequentially('automated baby', { delay: 50 });
  116 |   await page.locator('input[type="submit"][name="commit"]').click();
  117 |   await page.waitForTimeout(2000);
  118 | 
  119 |   // 3. Загружаем фото — setInputFiles вызывает авто-навигацию на следующий шаг
  120 |   await page.waitForSelector('#baby_image', { state: 'attached', timeout: 15000 });
  121 |   await Promise.all([
  122 |     page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
  123 |     page.locator('#baby_image').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/automated baby.jpeg'),
  124 |   ]);
  125 |   await page.waitForTimeout(2000);
  126 | 
  127 |   // 4. Выбираем любую доступную дату из пикера и кликаем PROCEED
  128 |   await page.waitForSelector('td[data-action="selectDay"]:not(.disabled):not(.old)', { timeout: 15000 });
  129 |   await page.locator('td[data-action="selectDay"]:not(.disabled):not(.old)').first().click();
  130 |   await page.waitForTimeout(1000);
  131 |   await page.locator('input[value="PROCEED"]').first().click({ force: true });
  132 |   await page.waitForTimeout(3000);
  133 | 
  134 |   // 5. Кликаем Continue (страница с отзывами)
  135 |   await page.waitForSelector('input.btn-finish[value="CONTINUE"]', { timeout: 15000 });
  136 |   await page.locator('input.btn-finish[value="CONTINUE"]').click();
  137 |   await page.waitForTimeout(3000);
  138 | 
  139 |   // 6. Кликаем Enter Without Sharing (финальная страница)
  140 |   await page.waitForSelector('a:has-text("ENTER WITHOUT SHARING")', { timeout: 15000 });
  141 |   await page.locator('a:has-text("ENTER WITHOUT SHARING")').click();
  142 |   await page.waitForTimeout(3000);
  143 | 
  144 |   // Пауза — браузер остаётся открытым для проверки
  145 |   await page.pause();
  146 | });
  147 | 
```