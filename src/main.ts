import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  const port = Number(process.env.PORT)||3000;

  await app.listen(port, '0.0.0.0', () => {
    console.log(`La aplicación está corriendo en el puerto ${port}`);
    console.log(`La aplicación está corriendo en: http://localhost:${port}`);
  });
}

bootstrap();

//https://www.youtube.com/watch?v=wsqcg5ZtUMM      revisar--> 1:11