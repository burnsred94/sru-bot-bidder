import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { RabbitMqPublisher } from './modules/rabbitmq/services/rabbitmq.publisher';
import { RpcExceptionFilter } from './modules/rabbitmq/utils';
import * as compress from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix(`${configService.get('PROJECT')}`);

  app.enableCors();

  app.use(compress());

  app.get(RabbitMqPublisher);
  app.useGlobalFilters(new RpcExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('PROJECT_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
}

bootstrap();
function compression(): any {
  throw new Error('Function not implemented.');
}

