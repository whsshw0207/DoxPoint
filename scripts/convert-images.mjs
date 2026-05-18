import sharp from 'sharp'

const tasks = [
  { input: 'public/etc/3인배너 수정.png',       output: 'public/etc/3인배너 수정.webp',       width: 1920 },
  { input: 'public/etc/png_DOX_Headshot.png',   output: 'public/etc/png_DOX_Headshot.webp',   width: 800  },
  { input: 'public/etc/Frame 1321316174.png',   output: 'public/etc/Frame 1321316174.webp'                },
  { input: 'public/class/1시간.png',             output: 'public/class/1시간.webp'                         },
  { input: 'public/class/2시간.png',             output: 'public/class/2시간.webp'                         },
  { input: 'public/class/그룹특강.png',          output: 'public/class/그룹특강.webp'                      },
  { input: 'public/class/단기특강_큰용량.jpg',   output: 'public/class/단기특강_큰용량.webp'               },
  { input: 'public/class/티어.png',              output: 'public/class/티어.webp'                          },
  { input: 'public/class/프로.png',              output: 'public/class/프로.webp'                          },
  { input: 'public/class/한달.png',              output: 'public/class/한달.webp'                          },
]

for (const task of tasks) {
  let pipeline = sharp(task.input)
  if (task.width) {
    pipeline = pipeline.resize(task.width, null, { withoutEnlargement: true })
  }
  await pipeline.webp({ quality: 80 }).toFile(task.output)
  console.log(`✓ ${task.output}`)
}
