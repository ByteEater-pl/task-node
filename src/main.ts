import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: readFileSync('./secrets/key.pem'),
      cert: readFileSync('./secrets/cert.pem')
    }});

  app.use(cookieParser());

  if (process.env.npm_lifecycle_script != process.env.npm_package_scripts_start_prod)
    SwaggerModule.setup(
      'api',
      app,
      SwaggerModule.createDocument(app, new DocumentBuilder().build()));

  await app.listen(3000);
}
bootstrap();