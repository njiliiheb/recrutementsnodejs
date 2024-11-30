import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './candidates/entities/candidate.entity';  // Vérifiez le bon chemin d'importation
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesService } from './candidates/candidates.service';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Candidate]),  // Assurez-vous que l'entité Candidate est correctement déclarée ici
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class AppModule {}
