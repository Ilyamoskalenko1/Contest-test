# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cutieville.spec.ts >> Добавление фото и добавление локации
- Location: tests/cutieville.spec.ts:64:5

# Error details

```
Error: page.waitForSelector: Error: strict mode violation: locator('.modal:visible, [class*="modal"]:visible').filter({ hasText: 'Close' }) resolved to 5 elements:
    1) <body class="modal-open">…</body> aka locator('body')
    2) <div tabindex="-1" role="dialog" aria-modal="true" id="badge-modal-175182" data-class-binder="Modal" class="modal fade auto-modal show" data-mark-as-read-url="/users/read_achievement/175182">…</div> aka locator('#badge-modal-175182')
    3) <div class="modal-dialog modal-dialog-centered modal-md">…</div> aka locator('div').filter({ hasText: 'Pathfinder Explore the' }).nth(1)
    4) <div class="modal-content">…</div> aka locator('div').filter({ hasText: 'Pathfinder Explore the' }).nth(2)
    5) <div class="modal-body">…</div> aka locator('div').filter({ hasText: 'Pathfinder Explore the' }).nth(3)

Call log:
  - waiting for locator('#user_avatar') to be visible

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
          - button "Taylor85" [ref=e14] [cursor=pointer]:
            - text: Taylor85
            - img [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]: Profile Settings
      - generic [ref=e19]:
        - generic [ref=e20]: Avatar
        - generic [ref=e22]:
          - img [ref=e23]
          - generic [ref=e24]: Click here to upload a photo
        - generic [ref=e25]: Name
        - textbox "Name" [ref=e27]: Taylor85
        - generic [ref=e28]: Email
        - textbox "Email" [ref=e30]: test_1776263652668@mailinator.com
        - generic [ref=e32]:
          - img [ref=e35]
          - paragraph [ref=e37]: Add your location to have the chance to win additional prizes in your region.
        - generic [ref=e38]: Location
        - combobox [ref=e42]:
          - option "Select your region..." [selected]
          - option "Australia"
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
        - generic [ref=e43]:
          - group [ref=e44]:
            - checkbox [checked] [ref=e46]
          - generic [ref=e47]: I want to recieve e-mail notifications
      - generic [ref=e48]: Link accounts
      - generic [ref=e49]:
        - generic [ref=e50]:
          - img [ref=e51]
          - generic [ref=e52]:
            - generic [ref=e53]: facebook
            - button "LINK" [ref=e54] [cursor=pointer]
        - generic [ref=e55]:
          - img [ref=e56]
          - generic [ref=e57]:
            - generic [ref=e58]: instagram
            - button "LINK" [ref=e59] [cursor=pointer]
        - generic [ref=e60]:
          - img [ref=e61]
          - generic [ref=e62]:
            - generic [ref=e63]: google
            - button "LINK" [ref=e64] [cursor=pointer]
      - button "SAVE CHANGES" [ref=e65] [cursor=pointer]
      - generic [ref=e66]: Delete profile
      - generic [ref=e67]:
        - generic [ref=e68]: If you delete your account, all your data and votes will be deleted.
        - button "DELETE" [ref=e70] [cursor=pointer]
    - generic [ref=e73]:
      - generic [ref=e74]:
        - img [ref=e77]
        - generic [ref=e79]:
          - link "Terms and Rules" [ref=e80] [cursor=pointer]:
            - /url: /terms_and_rules
          - link "Privacy Policy" [ref=e81] [cursor=pointer]:
            - /url: /privacy_policy
          - link "Is Cutieville safe?" [ref=e82] [cursor=pointer]:
            - /url: /scam_unsafe
          - link "Contact" [ref=e83] [cursor=pointer]:
            - /url: /contact
        - generic [ref=e85]:
          - link [ref=e86] [cursor=pointer]:
            - /url: https://www.facebook.com/cutieville
            - img [ref=e87]
          - link [ref=e88] [cursor=pointer]:
            - /url: https://www.instagram.com/cutieville.babycontest
            - img [ref=e89]
      - generic [ref=e91]: COPYRIGHT © 2022-2026 LIMI SOLVISE - FZCO
  - navigation [ref=e92]:
    - generic [ref=e93]:
      - link " Home" [ref=e94] [cursor=pointer]:
        - /url: /
        - generic [ref=e95]:
          - generic [ref=e96]: 
          - text: Home
      - generic [ref=e97]:
        - generic [ref=e98]: "1"
        - link " Treasure" [ref=e99] [cursor=pointer]:
          - /url: /users/treasure
          - generic [ref=e100]:
            - generic [ref=e101]: 
            - text: Treasure
      - link " Contest" [ref=e102] [cursor=pointer]:
        - /url: /contests
        - generic [ref=e103]:
          - generic [ref=e104]: 
          - text: Contest
      - link " Participate" [ref=e105] [cursor=pointer]:
        - /url: /participants/choose_baby?tkn=bottom_bar
        - generic [ref=e106]:
          - generic [ref=e107]: 
          - text: Participate
      - link " Profile" [ref=e109] [cursor=pointer]:
        - /url: /users/219545
        - generic [ref=e110]:
          - generic [ref=e111]: 
          - text: Profile
  - dialog [active] [ref=e112]:
    - generic [ref=e115]:
      - heading "Pathfinder" [level=4] [ref=e116]
      - paragraph [ref=e117]: Explore the homepage
      - img [ref=e118]
      - paragraph [ref=e119]: You are rewarded with 10 votes
      - paragraph [ref=e120]: "Current wallet balance: 10"
      - button "Close" [ref=e122] [cursor=pointer]
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
  30  |   await page.goto('/', { waitUntil: 'domcontentloaded' });
  31  |   await page.click('a:has-text("Sign in")');
  32  |   await page.waitForSelector('#user_email', { state: 'visible' });
  33  |   await page.click('a:has-text("Sign Up")');
  34  |   // Ждём поле подтверждения пароля — оно есть только на странице Sign Up
  35  |   await page.waitForSelector('#user_password_confirmation', { state: 'visible' });
  36  | 
  37  |   await page.locator('#user_email').click();
  38  |   await page.locator('#user_email').pressSequentially(email, { delay: 50 });
  39  | 
  40  |   await page.locator('#user_password').click();
  41  |   await page.locator('#user_password').pressSequentially(password, { delay: 50 });
  42  | 
  43  |   await page.locator('#user_password_confirmation').click();
  44  |   await page.locator('#user_password_confirmation').pressSequentially(password, { delay: 50 });
  45  | 
  46  |   await page.click('input[name="commit"]');
  47  | 
  48  |   // После регистрации переход на страницу "Finish your account"
  49  |   await page.waitForURL(/registration_step\/names/, { timeout: 60000 });
  50  | 
  51  |   // Генерируем случайное имя
  52  |   const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
  53  |   const firstName = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);
  54  | 
  55  |   await page.locator('#user_first_name').click();
  56  |   await page.locator('#user_first_name').pressSequentially(firstName, { delay: 80 });
  57  | 
  58  |   await page.click('input[name="commit"]');
  59  | 
  60  |   // Ждём загрузки главной страницы после регистрации
  61  |   await page.waitForTimeout(3000);
  62  | });
  63  | 
  64  | test('Добавление фото и добавление локации', async () => {
  65  |   test.setTimeout(120_000);
  66  | 
  67  |   // Закрываем любые achievement/reward-модалы автоматически
  68  |   await page.addLocatorHandler(page.locator('.modal:visible, [class*="modal"]:visible').filter({ hasText: 'Close' }), async () => {
  69  |     await page.locator('text=Close').first().click();
  70  |   });
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
  83  |   // Ждём появления поля аватара — признак загрузки страницы редактирования
> 84  |   await page.waitForSelector('#user_avatar', { timeout: 30000 });
      |              ^ Error: page.waitForSelector: Error: strict mode violation: locator('.modal:visible, [class*="modal"]:visible').filter({ hasText: 'Close' }) resolved to 5 elements:
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
  96  |   await page.locator('#user_location').click();
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