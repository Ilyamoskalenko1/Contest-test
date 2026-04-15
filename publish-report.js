const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

console.log('Генерируем Allure отчёт...');
run('npx allure generate allure-results --clean -o allure-report');

// Копируем историю из gh-pages если есть
const historyDir = 'allure-report/history';

console.log('Публикуем на GitHub Pages...');

// Сохраняем отчёт во временную папку
const tmpDir = '/tmp/allure-gh-pages';
if (fs.existsSync(tmpDir)) run(`rm -rf ${tmpDir}`);
fs.mkdirSync(tmpDir);
run(`cp -r allure-report/. ${tmpDir}/`);

// Переключаемся на ветку gh-pages
try {
  run('git checkout gh-pages');
} catch {
  run('git checkout --orphan gh-pages');
  run('git rm -rf . --quiet 2>/dev/null || true');
}

// Копируем отчёт
run(`cp -r ${tmpDir}/. .`);
run('git add -A');
run('git commit -m "Update Allure report"');
run('git push origin gh-pages');

// Возвращаемся на main
run('git checkout main');

console.log('\nОтчёт опубликован: https://ilyamoskalenko1.github.io/contest-tests/');
