import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'
import { join } from 'path'

const dirs = [
  { path: 'public/images/creations/venavi', prefix: 'galerie-', start: 1 },
  { path: 'public/images/creations/simple', prefix: 'galerie-', start: 1 },
]

for (const { path, prefix, start } of dirs) {
  const files = readdirSync(path)
    .filter(f => /\.(JPG|jpeg|jpg|PNG|png)$/i.test(f))
    .sort()

  let count = start
  for (const file of files) {
    const name = file.replace(/\.(JPG|jpeg|jpg|PNG|png)$/i, '')
    if (name.toLowerCase() === 'affiche' || name.toLowerCase() === 'hero') {
      console.log(`Skipping: ${file}`)
      continue
    }

    const inputPath = join(path, file)
    const outputPath = join(path, `${prefix}${count}.webp`)

    console.log(`${file} → ${prefix}${count}.webp`)

    const img = sharp(inputPath)
    const meta = await img.metadata()
    const width = meta.width || 2000

    await img
      .resize(Math.min(width, 2000), undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath)

    unlinkSync(inputPath)
    count++
  }
}

console.log('\nDone!')
