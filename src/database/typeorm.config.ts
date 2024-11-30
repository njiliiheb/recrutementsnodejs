import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost', // Utilisation d'une valeur statique pour l'hôte
  port: 3306, // Port par défaut pour MySQL
  username: 'root', // Changez en fonction de votre configuration
  password: '', // Votre mot de passe, si nécessaire
  database: 'candidates_db', // Nom de votre base de données
  entities: [Candidate], 
    synchronize: true, // À ne pas utiliser en production pour éviter les pertes de données
};
