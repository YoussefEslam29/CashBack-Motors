const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/bikes');

fs.readdir(dir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const name = path.basename(file, ext);
      const inPath = path.join(dir, file);
      const outPath = path.join(dir, `${name}.webp`);

      sharp(inPath)
        .webp({ quality: 80 })
        .toFile(outPath)
        .then(() => {
          console.log(`Converted ${file} to ${name}.webp`);
          // optionally remove old file
          fs.unlinkSync(inPath);
        })
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
  });
});
