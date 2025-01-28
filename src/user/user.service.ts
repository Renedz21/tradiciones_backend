import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  logger: Logger = new Logger(UserService.name);

  /**
   *
   */
  constructor(private readonly prisma: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
