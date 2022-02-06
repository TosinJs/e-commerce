import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation usign class validator
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //This ensures irrelevant data is not passed in or processed
  }))
  //Setting Up the Swagger Docs
  const config = new DocumentBuilder()
    .setTitle("E-Commerce Api")
    .setDescription("This is the Documentation for the TosinJs E-Commerce Website")
    .setVersion("1.0")
    .addTag("E-Commerce")
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/documentation", app, document)
    
  await app.listen(3000);
}
bootstrap();
