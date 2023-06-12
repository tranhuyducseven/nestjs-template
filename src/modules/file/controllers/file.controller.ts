import {Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";

export class FileController{
  @Post()
  @UseInterceptors(
    FileInterceptor('text', {
      dest:"../files"
    }),
  )
  async uploadedFile(@UploadedFile() file: any) {
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

}
