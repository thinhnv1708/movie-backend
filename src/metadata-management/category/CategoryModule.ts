import { Module } from '@nestjs/common';
import { CategoryController } from './CategoryController';
import { CategoryService } from './CategoryService';
import { CategoryRepository } from './CategoryRepository';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepo',
      useClass: CategoryRepository,
    },
    CategoryService,
  ],
  exports: ['CategoryRepo', CategoryService],
})
export class CategoryModule {}