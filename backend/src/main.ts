import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWTValidationMiddleware } from '@vypham0209/nestjs-common';
import 'config/index';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(global.Config.APP_CONTEXT);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.use(new JWTValidationMiddleware().use);
  const config = new DocumentBuilder()
    .setTitle('Idle khanwars')
    .setDescription('Idle khanwars API ')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' }, 'JWT-auth')
    .addSecurityRequirements('JWT-auth')
    .build();

  const appDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${global.Config.APP_CONTEXT}/api-docs`,
    app,
    appDocument,
  );
  await app.listen(global.Config.PORT);
  console.log(
    `Server running on http://localhost:${global.Config.PORT}/api/api-docs`,
  );
}
bootstrap();
