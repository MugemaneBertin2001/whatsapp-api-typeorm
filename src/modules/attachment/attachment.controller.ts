import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, UseInterceptors, UploadedFile, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentDto } from './dto/create-attachment.dto';
import { Attachment } from './entities/attachment.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';

@Controller('api/chatRoom/messages/:messageId/attachment')
@UseGuards(AuthGuard('jwt'))
export class AttachmentController {
  attachmentRepository: any;
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req,file,cb)=>{
        return cb(null,`./uploads/${file.mimetype.split('/')[0].concat('s')}`)
      },
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `/${randomName}${extname(file.originalname)}`);
      },
    }),
    limits:{
      fileSize:  10 * 1024 * 1024,
    }
  }))
  async create(
    @Body() createAttachmentDto: AttachmentDto,
    @UploadedFile() file, 
    @Param('messageId') messageId: string,
  ): Promise<Attachment> {
    createAttachmentDto.url = file.path;
    createAttachmentDto.type = file.mimetype;
    createAttachmentDto.size = file.size;
    return this.attachmentService.create(createAttachmentDto, messageId);
  }

  @Get()
  async findAll(): Promise<Attachment[]> {
    try {
      return await this.attachmentService.findAll();
    } catch (error) {
      console.error('Failed to fetch attachments:', error);
      throw new BadRequestException('Failed to fetch attachments');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Attachment> {
    try {
      const attachment = await this.attachmentService.findOne(id);
      if (!attachment) {
        throw new NotFoundException('Attachment not found');
      }
      return attachment;
    } catch (error) {
      console.error('Failed to find attachment:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Failed to find attachment');
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateAttachmentDto: Partial<AttachmentDto>): Promise<any> {
    try {
      return await this.attachmentService.update(id, updateAttachmentDto);
    } catch (error) {
      console.error('Failed to update attachment:', error);
      throw new BadRequestException('Failed to update attachment');
    }
  }

  @Delete(':id')
  async remove(id: number): Promise<string> {
    try {
      const attachment = await this.attachmentRepository.findOne(id);
      if (!attachment) {
        throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
      }
      
      const filePath = attachment.filePath; 
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await this.attachmentRepository.remove(attachment);
      
      return 'Attachment deleted successfully';
    } catch (error) {
      throw new HttpException('Could not delete attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

