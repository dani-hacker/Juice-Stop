const fs = require('fs');
const path = require('path');

const constantsContent = fs.readFileSync('src/constants.ts', 'utf8');
const appContent = fs.readFileSync('src/App.tsx', 'utf8');

const usedImages = new Set();

// Extract from constants.ts
const regex = /image:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(constantsContent)) !== null) {
  usedImages.add(match[1]);
}

// Add App.tsx explicit images
usedImages.add('/hero-background.jpg');
usedImages.add('/vite.svg');

const publicDir = path.join(__dirname, 'public');
const productsDir = path.join(publicDir, 'images', 'products');

let deletedCount = 0;

if (fs.existsSync(productsDir)) {
  const files = fs.readdirSync(productsDir);
  for (const file of files) {
    const relativePath = /images/products/\;
    if (!usedImages.has(relativePath)) {
      console.log('Deleting unused image:', relativePath);
      fs.unlinkSync(path.join(productsDir, file));
      deletedCount++;
    }
  }
}

console.log('Finished checking products dir. Deleted', deletedCount, 'images.');
