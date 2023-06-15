import { MinIOService } from "../../../shared/services/minio-s3.service";
import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import "multer"

@Controller('file')
export class FileController {
    constructor(private fileUploadService: MinIOService) {}
    @Post("/upload")
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
        const uploadedFile = await this.fileUploadService.uploadFile(file);
        console.log('File has been uploaded,', uploadedFile);        
    }

}