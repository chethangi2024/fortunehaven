import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

// Directories and specific files to convert
const targetFolders = [
  {
    dir: path.join(workspaceRoot, 'public/digital-assets/Villa Images'),
    isFloorPlan: false
  },
  {
    dir: path.join(workspaceRoot, 'public/digital-assets/Floor Plane and Site Plan'),
    isFloorPlan: true
  },
  {
    dir: path.join(workspaceRoot, 'src/assets/floor-plans'),
    isFloorPlan: true
  },
  {
    dir: path.join(workspaceRoot, 'public/digital-assets/Hero Section'),
    isFloorPlan: false,
    filter: (file) => ['ezgif-frame-001.jpg', 'ezgif-frame-075.jpg', 'ezgif-frame-150.jpg', 'ezgif-frame-225.jpg'].includes(file)
  }
];

async function convertImage(inputPath, outputPath, isFloorPlan) {
  const statBefore = fs.statSync(inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const options = isFloorPlan
    ? { quality: 88, effort: 5, nearLossless: true }
    : { quality: 82, effort: 5 };

  await image.webp(options).toFile(outputPath);
  const statAfter = fs.statSync(outputPath);

  return {
    file: path.basename(inputPath),
    width: metadata.width,
    height: metadata.height,
    sizeBefore: statBefore.size,
    sizeAfter: statAfter.size,
    ratio: ((1 - statAfter.size / statBefore.size) * 100).toFixed(1)
  };
}

async function run() {
  console.log('Starting image conversion to WebP...\n');
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const target of targetFolders) {
    if (!fs.existsSync(target.dir)) continue;
    const files = fs.readdirSync(target.dir);

    for (const file of files) {
      if (file.endsWith('.webp')) continue;
      if (!/\.(png|jpe?g)$/i.test(file)) continue;
      if (target.filter && !target.filter(file)) continue;

      const inputPath = path.join(target.dir, file);
      const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp');
      const outputPath = path.join(target.dir, outputName);

      try {
        const res = await convertImage(inputPath, outputPath, target.isFloorPlan);
        results.push({ ...res, folder: path.relative(workspaceRoot, target.dir) });
        totalBefore += res.sizeBefore;
        totalAfter += res.sizeAfter;
        console.log(`[CONVERTED] ${res.file} -> ${outputName} (${(res.sizeBefore / 1024 / 1024).toFixed(2)} MB -> ${(res.sizeAfter / 1024 / 1024).toFixed(2)} MB, -${res.ratio}%)`);
      } catch (err) {
        console.error(`[ERROR] Failed to convert ${file}:`, err);
      }
    }
  }

  console.log('\n==========================================');
  console.log(`Total images converted: ${results.length}`);
  console.log(`Total size before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total size after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings:     ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% (${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB reduced)`);
  console.log('==========================================\n');

  fs.writeFileSync(
    path.join(workspaceRoot, 'image_conversion_stats.json'),
    JSON.stringify({ results, totalBefore, totalAfter }, null, 2)
  );
}

run().catch(console.error);
