import { NestFactory } from '@nestjs/core';
import { ProgressModule } from './generated/module';

async function start() {
    const app = await NestFactory.create(ProgressModule);
    await app.listen(6130);
}
start();
