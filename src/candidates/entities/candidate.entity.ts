// candidate.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()  // Assurez-vous que l'entité est bien décorée
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column('simple-array')
  skills: string[];

  @Column()
  status: string;

  @Column()
  recruited: boolean;

  @Column({ nullable: true })
  recruitmentYear: number;
}
