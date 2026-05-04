const fs = require('fs');

const oldContent = fs.readFileSync('frontend/app/dashboard/old_page.tsx', 'utf-8');
const newContent = fs.readFileSync('frontend/app/dashboard/page.tsx', 'utf-8');

const varsRegex = /    const userName = dashboardData\.user\?\.name \|\| 'Pengguna';[\s\S]*?    const totalKuis = 4;/m;
const varsMatch = newContent.match(varsRegex);
const varsBlock = varsMatch ? varsMatch[0] : '';

const innerStart = newContent.indexOf('{/* Profile & XP Row */}');
const innerEnd = newContent.indexOf('</main>');
const innerContent = newContent.slice(innerStart, innerEnd);

let finalContent = oldContent.replace(
    /    return \(/,
    `${varsBlock}\n\n    return (`
);

const startMarker = '<div className="p-6 space-y-6 max-w-7xl mx-auto w-full">';
const endMarker = '{/* FOOTER */}';

const startIndex = finalContent.indexOf(startMarker) + startMarker.length;
const endIndex = finalContent.indexOf(endMarker);

const beforeFooter = finalContent.lastIndexOf('</div>', endIndex);

finalContent = finalContent.slice(0, startIndex) + '\n' + innerContent + finalContent.slice(beforeFooter);

fs.writeFileSync('frontend/app/dashboard/page.tsx', finalContent);
console.log('Merge complete!');
