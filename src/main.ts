import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./exception.filter";
import { TransformInterceptor } from "./transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
