import { Module } from "@nestjs/common";
import { FileController } from "./controllers/file.controller";
import { MinIOService } from "../../shared/services/minio-s3.service";
import { GeneratorService } from "../../shared/services/generator.service";

@Module({
  providers: [MinIOService, GeneratorService],
  controllers: [FileController],
})
export class FileModule {}
