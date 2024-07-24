import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  
  const corsOption = {
    origin: true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true,
    maxAge: 3600
  }

  const app = await NestFactory.create(AppModule, { cors: corsOption });

  const confService = new ConfigService();
  const port = confService.get<number>("PORT") || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform:true }));

  const config = new DocumentBuilder()
    .setTitle("Task Flow")
    .setDescription("The task-flow API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
bootstrap()
  .then(() =>
    console.log(`Server is running on port ${process.env.PORT || 3000}`),
  )
  .catch((e) => console.error(e));
