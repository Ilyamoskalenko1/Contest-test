# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cutieville.spec.ts >> Добавление фото и добавление локации
- Location: tests/cutieville.spec.ts:69:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#user_location')
    - locator resolved to <input value="" type="text" id="user_location" name="user[location]" class="form-control string optional" placeholder="Type your location here"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    29 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e6]
      - list [ref=e8]:
        - listitem [ref=e9]:
          - link "Contests" [ref=e10] [cursor=pointer]:
            - /url: /contests
        - listitem [ref=e11]:
          - link "Participate" [ref=e12] [cursor=pointer]:
            - /url: /participants/choose_baby?tkn=header_link
        - listitem [ref=e13]:
          - button "Taylor35" [ref=e14] [cursor=pointer]:
            - text: Taylor35
            - img [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]: Profile Settings
      - generic [ref=e19]:
        - generic [ref=e20]: Avatar
        - img [ref=e23]
        - generic [ref=e24]: Name
        - textbox "Name" [ref=e26]: Taylor35
        - generic [ref=e27]: Email
        - textbox "Email" [ref=e29]: test_1776263817565@mailinator.com
        - generic [ref=e31]:
          - img [ref=e34]
          - paragraph [ref=e36]: Add your location to have the chance to win additional prizes in your region.
        - generic [ref=e37]: Location
        - combobox [ref=e41]:
          - option "Select your region..."
          - option "Australia" [selected]
          - option "Canada"
          - option "United Kingdom"
          - option "Alabama"
          - option "Alaska"
          - option "Arizona"
          - option "Arkansas"
          - option "California"
          - option "Colorado"
          - option "Connecticut"
          - option "Delaware"
          - option "District of Colombia"
          - option "Florida"
          - option "Georgia"
          - option "Hawaii"
          - option "Idaho"
          - option "Illinois"
          - option "Indiana"
          - option "Iowa"
          - option "Kansas"
          - option "Kentucky"
          - option "Louisiana"
          - option "Maine"
          - option "Maryland"
          - option "Massachusetts"
          - option "Michigan"
          - option "Minnesota"
          - option "Mississippi"
          - option "Missouri"
          - option "Montana"
          - option "Nebraska"
          - option "Nevada"
          - option "New Hampshire"
          - option "New Jersey"
          - option "New Mexico"
          - option "New York"
          - option "North Carolina"
          - option "North Dakota"
          - option "Ohio"
          - option "Oklahoma"
          - option "Oregon"
          - option "Pennsylvania"
          - option "Rhode Island"
          - option "South Carolina"
          - option "South Dakota"
          - option "Tennessee"
          - option "Texas"
          - option "Utah"
          - option "Vermont"
          - option "Virginia"
          - option "Washington"
          - option "West Virginia"
          - option "Wisconsin"
          - option "Wyoming"
          - option "Other"
        - generic [ref=e42]:
          - group [ref=e43]:
            - checkbox [checked] [ref=e45]
          - generic [ref=e46]: I want to recieve e-mail notifications
      - generic [ref=e47]: Link accounts
      - generic [ref=e48]:
        - generic [ref=e49]:
          - img [ref=e50]
          - generic [ref=e51]:
            - generic [ref=e52]: facebook
            - button "LINK" [ref=e53] [cursor=pointer]
        - generic [ref=e54]:
          - img [ref=e55]
          - generic [ref=e56]:
            - generic [ref=e57]: instagram
            - button "LINK" [ref=e58] [cursor=pointer]
        - generic [ref=e59]:
          - img [ref=e60]
          - generic [ref=e61]:
            - generic [ref=e62]: google
            - button "LINK" [ref=e63] [cursor=pointer]
      - button "SAVE CHANGES" [ref=e64] [cursor=pointer]
      - generic [ref=e65]: Delete profile
      - generic [ref=e66]:
        - generic [ref=e67]: If you delete your account, all your data and votes will be deleted.
        - button "DELETE" [ref=e69] [cursor=pointer]
    - generic [ref=e72]:
      - generic [ref=e73]:
        - img [ref=e76]
        - generic [ref=e78]:
          - link "Terms and Rules" [ref=e79] [cursor=pointer]:
            - /url: /terms_and_rules
          - link "Privacy Policy" [ref=e80] [cursor=pointer]:
            - /url: /privacy_policy
          - link "Is Cutieville safe?" [ref=e81] [cursor=pointer]:
            - /url: /scam_unsafe
          - link "Contact" [ref=e82] [cursor=pointer]:
            - /url: /contact
        - generic [ref=e84]:
          - link [ref=e85] [cursor=pointer]:
            - /url: https://www.facebook.com/cutieville
            - img [ref=e86]
          - link [ref=e87] [cursor=pointer]:
            - /url: https://www.instagram.com/cutieville.babycontest
            - img [ref=e88]
      - generic [ref=e90]: COPYRIGHT © 2022-2026 LIMI SOLVISE - FZCO
  - navigation [ref=e91]:
    - generic [ref=e92]:
      - link " Home" [ref=e93] [cursor=pointer]:
        - /url: /
        - generic [ref=e94]:
          - generic [ref=e95]: 
          - text: Home
      - generic [ref=e96]:
        - generic [ref=e97]: "1"
        - link " Treasure" [ref=e98] [cursor=pointer]:
          - /url: /users/treasure
          - generic [ref=e99]:
            - generic [ref=e100]: 
            - text: Treasure
      - link " Contest" [ref=e101] [cursor=pointer]:
        - /url: /contests
        - generic [ref=e102]:
          - generic [ref=e103]: 
          - text: Contest
      - link " Participate" [ref=e104] [cursor=pointer]:
        - /url: /participants/choose_baby?tkn=bottom_bar
        - generic [ref=e105]:
          - generic [ref=e106]: 
          - text: Participate
      - link " Profile" [ref=e108] [cursor=pointer]:
        - /url: /users/219547
        - generic [ref=e109]:
          - generic [ref=e110]: 
          - text: Profile
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
  91  |   // 5. Выбираем регион
  92  |   await page.locator('#user_region_id').selectOption({ index: 1 });
  93  |   await page.waitForTimeout(500);
  94  | 
  95  |   // 6. Вводим локацию
> 96  |   await page.locator('#user_location').click();
      |                                        ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  97  |   await page.locator('#user_location').pressSequentially('New York', { delay: 50 });
  98  | 
  99  |   // 7. Нажимаем Save Changes (первая кнопка submit — главная форма профиля)
  100 |   await page.locator('input[type="submit"][name="commit"]').first().click();
  101 |   await page.waitForTimeout(3000);
  102 | 
  103 |   // Пауза — браузер остаётся открытым для проверки
  104 |   await page.pause();
  105 | });
  106 | 
```