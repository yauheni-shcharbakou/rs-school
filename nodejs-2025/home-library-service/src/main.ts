import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IEnv } from './interfaces/env.interface';
import { LoggingService } from './modules/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IEnv>);
  const loggingService = app.get(LoggingService);

  const port = configService.get('PORT', { infer: true });

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swagger = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup('doc', app, swaggerDoc, {
    yamlDocumentUrl: 'doc/api.yaml',
  });

  process.on('exit', () => app.close());
  process.on('SIGINT', () => app.close());

  process.on('unhandledRejection', (error) =>
    loggingService.fatal(error ?? 'UnhandledRejection', error?.['stack']),
  );

  process.on('uncaughtException', (error) =>
    loggingService.fatal(error, error.stack),
  );

  await app.listen(port, async () => {
    loggingService.log(`Server is listening on http://localhost:${port}`);
    loggingService.log(`Swagger is available on http://localhost:${port}/doc`);
  });
}
bootstrap();
