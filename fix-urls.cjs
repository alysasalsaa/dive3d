const fs = require('fs');
const files = [
  'frontend/app/register/page.tsx',
  'frontend/app/login/page.tsx',
  'frontend/lib/api.ts'
];
files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/'(\$\{process\.env\.NEXT_PUBLIC_API_URL\}[^']*)'/g, '' + '' + '');
  fs.writeFileSync(filepath, content, 'utf8');
  console.log('Fixed:', filepath);
});
