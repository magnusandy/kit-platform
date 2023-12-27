import { NestFactory } from '@nestjs/core';
import { ContentModule } from './module';

async function start() {
    const app = await NestFactory.create(ContentModule);
    await app.listen(6110);
}
start();
