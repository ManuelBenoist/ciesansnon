import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'fs'
import { join } from 'path'

const dirs = [
  { path: 'public/images/creations/venavi' },
  { path: 'public/images/creations/simple' },
]

for (const { path } of dirs) {
  const files = readdirSync(path)
    .filter(f => /\.(jpeg|jpg|JPG|JPEG)$/i.test(f) && f.startsWith('galerie-'))
    .sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)?.[1] || '0', 10)
      const nb = parseInt(b.match(/(\d+)/)?.[1] || '0', 10)
      return na - nb
    })

  for (const file of files) {
    const num = file.match(/(\d+)/)?.[1]
    const inputPath = join(path, file)
    const outputPath = join(path, `galerie-${num}.webp`)
    console.log(`${file} → galerie-${num}.webp`)

    const img = sharp(inputPath)
    const meta = await img.metadata()
    const width = meta.width || 2000

    await img
      .resize(Math.min(width, 2000), undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 95 })
      .toFile(outputPath)

    unlinkSync(inputPath)
  }
}

console.log('\nDone!')
