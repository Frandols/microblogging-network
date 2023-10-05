import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import config from '../config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config.port)
}
bootstrap()
