import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'country',
})
export class CountryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;
}