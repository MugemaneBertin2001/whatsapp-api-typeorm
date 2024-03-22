import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity'; 
import { AttachmentDto } from './dto/create-attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  async create(createAttachmentDto: AttachmentDto, messageId: any): Promise<Attachment> {
    try {
      createAttachmentDto.messageId = messageId;
      const createdAttachment = this.attachmentRepository.create({ ...createAttachmentDto});
      return await this.attachmentRepository.save(createdAttachment);
    } catch (error) {
      throw new HttpException('Could not create attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Attachment[]> {
    try {
      return await this.attachmentRepository.find();
    } catch (error) {
      throw new HttpException('Could not fetch attachments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: any): Promise<Attachment> {
    try {
      const attachment = await this.attachmentRepository.findOne(id);
      if (!attachment) {
        throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
      }
      return attachment;
    } catch (error) {
      throw new HttpException('Could not find attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: any, updateAttachmentDto: Partial<AttachmentDto>): Promise<Attachment> {
    try {
      await this.attachmentRepository.update(id, updateAttachmentDto);
      return await this.attachmentRepository.findOne(id);
    } catch (error) {
      throw new HttpException('Could not update attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.attachmentRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Could not delete attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
