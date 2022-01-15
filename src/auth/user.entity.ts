import { TimeEntity } from 'src/util/time.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  kakaoId: string;

  @Column({
    default: false,
  })
  deleted: boolean;
}
