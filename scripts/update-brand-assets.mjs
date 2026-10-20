import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Use the mark from the supplied logo, retaining its original white field.
const source = 'src/assets/logo/dixon-masonry.jpg';
const mark = await sharp(source).extract({ left: 1060, top: 205, width: 370, height: 370 }).png().toBuffer();
for (const size of [32, 192, 512]) {
  await sharp(mark).resize(size, size).png().toFile(`public/favicon-${size}.png`);
}
await sharp(mark).resize(180, 180).png().toFile('public/apple-touch-icon.png');
const png = await sharp(mark).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, png]));
