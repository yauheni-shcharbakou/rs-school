import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { LOCAL_PORT } from 'src/shared/constants'

const port = process.env.PORT || LOCAL_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  await app.listen(port)
}
bootstrap().then(() => console.log(`Server started on port ${port}`))
