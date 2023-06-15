import { Injectable } from "@nestjs/common";
import mime from "mime-types";

import { ApiConfigService } from "./api-config.service";
import { GeneratorService } from "./generator.service";
import * as Minio from "minio";
import { IFileUpload } from "@/interfaces";

@Injectable()
export class MinIOService {
  private minioClient: Minio.Client;
  constructor(
    public configService: ApiConfigService,
    public generatorService: GeneratorService
  ) {
    this.minioClient = new Minio.Client({
      endPoint: configService.minioS3Config.host,
      port: configService.minioS3Config.port,
      useSSL: false, // Set to true if your MinIO server uses SSL
      accessKey: configService.minioS3Config.username,
      secretKey: configService.minioS3Config.password,
    });
  }

  async uploadFile(file: IFileUpload): Promise<string> {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype)
    );
    const metaData = {
      "Content-Type": "application/octet-stream",
      "X-Amz-Meta-Testing": "1234",
      example: "5678",
    };
    
    const key = "file/" + fileName;
    return new Promise<string>((resolve, reject) => {
      this.minioClient.putObject(
        "europetrip",
        key,
        file.buffer,
        file.buffer.length,
        metaData,
        (err) => {
          if (err) {
            console.error("Error uploading file:", err);
            reject(err);
          } else {
            console.log("File uploaded successfully.");
            resolve(key);
          }
        }
      );
    });
  }
}
