import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { CustomValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3003;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    // app.useGlobalPipes(new CustomValidationPipe())

    const config = new DocumentBuilder()
      .setTitle("MyTicket Project")
      .setDescription("iTicket saytining o'quv uchun yaratilgan REST API proyekti")
      .setVersion("1.0")
      .addTag("nestjs,validation,swagger,sequelize,pg,guard")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(PORT,()=> {
      console.log(`Server started at: ${PORT}`);
    });
    
  } catch (error) {
    console.log(error);
  }
}
start();
