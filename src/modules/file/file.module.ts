import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {FileController} from "./controllers/file.controller";

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [FileController],
})
export class FileModule {}
