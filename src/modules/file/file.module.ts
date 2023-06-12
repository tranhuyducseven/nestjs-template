import { MulterModule } from "@nestjs/platform-express";
import { FileController } from "./controllers/file.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [FileController],
})
export class FileModule {}
