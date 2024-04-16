const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const slidesSrc = path.resolve(__dirname, 'slides')
const dist = path.resolve(__dirname, 'dist/slides')

const buildSlides = () => {
  const slideNames = fs
    .readdirSync(slidesSrc)
    .filter((filename) => filename.startsWith('lesson-') && filename.endsWith('.md'))

  slideNames.map((filename) => {
    const name = filename.replace('.md', '')
    const command = `pnpm run sli:dev build --out ${dist}/${name} --base /slides/${name}/ ${slidesSrc}/${filename}`
    console.log(`Build command: ${command}`)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        console.error(stderr)
      } else {
        console.log(stdout)
      }
    })
  })
}

buildSlides()
