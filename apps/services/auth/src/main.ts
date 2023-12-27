import { NestFactory } from '@nestjs/core';
import { AuthModule } from './module';

async function start() {
    const app = await NestFactory.create(AuthModule);
    await app.listen(6120);
}
start();
