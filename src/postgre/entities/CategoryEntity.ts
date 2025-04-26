import { Column, PrimaryColumn } from 'typeorm';

export class CategoryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
