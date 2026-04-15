# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cutieville.spec.ts >> Создание участника авторизованным пользователем
- Location: tests/cutieville.spec.ts:105:5

# Error details

```
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "https://staging.cutieville.com/babies/new?tkn=bottom_bar"
============================================================
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
          - button "Morgan98" [ref=e14] [cursor=pointer]:
            - text: Morgan98
            - img [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "You are entering the competition" [level=1] [ref=e19]
        - heading "$ 4,655.8182 to win" [level=6] [ref=e21]
      - generic [ref=e25]:
        - heading "Is it a boy or a girl?" [level=4] [ref=e27]
        - generic [ref=e28]:
          - button "participate-boy Boy" [ref=e31] [cursor=pointer]:
            - generic [ref=e32]:
              - img "participate-boy" [ref=e33]
              - generic [ref=e34]: Boy
          - button "participate-girl Girl" [ref=e37] [cursor=pointer]:
            - generic [ref=e38]:
              - img "participate-girl" [ref=e39]
              - generic [ref=e40]: Girl
      - generic [ref=e41]:
        - generic [ref=e42]:
          - img [ref=e43]
          - img [ref=e44]
          - img [ref=e45]
          - img [ref=e46]
          - img [ref=e47]
        - generic [ref=e48]:
          - generic [ref=e49]: 4.86 / 5.0
          - generic [ref=e50]: Based On 2588 Reviews
      - generic [ref=e51]:
        - button "Previous" [ref=e52] [cursor=pointer]:
          - generic [ref=e54]: Previous
        - generic [ref=e56]:
          - generic [ref=e57]:
            - img [ref=e58]
            - generic [ref=e59]:
              - generic [ref=e60]: $2,800
              - generic [ref=e61]:
                - img [ref=e62]
                - img [ref=e63]
                - img [ref=e64]
                - img [ref=e65]
                - img [ref=e66]
          - generic [ref=e67]:
            - generic [ref=e68]: Britney W.
            - generic [ref=e69]: Thank you so much! This was the most fun contest ever!
        - button "Next" [ref=e70] [cursor=pointer]:
          - generic [ref=e72]: Next
    - generic [ref=e75]:
      - generic [ref=e76]:
        - img [ref=e79]
        - generic [ref=e81]:
          - link "Terms and Rules" [ref=e82] [cursor=pointer]:
            - /url: /terms_and_rules
          - link "Privacy Policy" [ref=e83] [cursor=pointer]:
            - /url: /privacy_policy
          - link "Is Cutieville safe?" [ref=e84] [cursor=pointer]:
            - /url: /scam_unsafe
          - link "Contact" [ref=e85] [cursor=pointer]:
            - /url: /contact
        - generic [ref=e87]:
          - link [ref=e88] [cursor=pointer]:
            - /url: https://www.facebook.com/cutieville
            - img [ref=e89]
          - link [ref=e90] [cursor=pointer]:
            - /url: https://www.instagram.com/cutieville.babycontest
            - img [ref=e91]
      - generic [ref=e93]: COPYRIGHT © 2022-2026 LIMI SOLVISE - FZCO
```

# Test source

```ts
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
> 110 |   await page.waitForURL(/babies\/new/, { timeout: 15000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  111 |   await page.waitForTimeout(1000);
  112 | 
  113 |   // 2. Кликаем Boy, вводим имя
  114 |   await page.locator('button.gender-button:has-text("Boy")').click();
  115 |   await page.waitForURL(/babies\/\d+\/registration/, { timeout: 15000 });
  116 |   await page.waitForTimeout(1000);
  117 |   await page.locator('#baby_name').pressSequentially('automated baby', { delay: 50 });
  118 |   await page.locator('input[type="submit"][name="commit"]').click();
  119 |   await page.waitForTimeout(2000);
  120 | 
  121 |   // 3. Загружаем фото — setInputFiles вызывает авто-навигацию на следующий шаг
  122 |   await page.waitForSelector('#baby_image', { state: 'attached', timeout: 15000 });
  123 |   await Promise.all([
  124 |     page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }),
  125 |     page.locator('#baby_image').setInputFiles('/Users/aleksandrpasinin/Documents/Партиципуки/automated baby.jpeg'),
  126 |   ]);
  127 |   await page.waitForTimeout(2000);
  128 | 
  129 |   // 4. Выбираем любую доступную дату из пикера и кликаем PROCEED
  130 |   await page.waitForSelector('td[data-action="selectDay"]:not(.disabled):not(.old)', { timeout: 15000 });
  131 |   await page.locator('td[data-action="selectDay"]:not(.disabled):not(.old)').first().click();
  132 |   await page.waitForTimeout(1000);
  133 |   await page.locator('input[value="PROCEED"]').first().click({ force: true });
  134 |   await page.waitForTimeout(3000);
  135 | 
  136 |   // 5. Кликаем Continue (страница с отзывами)
  137 |   await page.waitForSelector('input.btn-finish[value="CONTINUE"]', { timeout: 15000 });
  138 |   await page.locator('input.btn-finish[value="CONTINUE"]').click();
  139 |   await page.waitForTimeout(3000);
  140 | 
  141 |   // 6. Кликаем Enter Without Sharing (финальная страница)
  142 |   await page.waitForSelector('a:has-text("ENTER WITHOUT SHARING")', { timeout: 15000 });
  143 |   await page.locator('a:has-text("ENTER WITHOUT SHARING")').click();
  144 |   await page.waitForTimeout(3000);
  145 | 
  146 |   // Пауза — браузер остаётся открытым для проверки
  147 |   await page.pause();
  148 | });
  149 | 
```