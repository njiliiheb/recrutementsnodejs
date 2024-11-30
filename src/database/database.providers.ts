import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        console.log('DB Configuration:', {
          host: 'localhost',
          port: 3306,
          username: 'root', // Changez selon votre configuration
          password: '', // Changez si vous avez un mot de passe
          database: 'candidates_db',
        });

        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost', // Utilisation d'une valeur statique
          port: 3306,
          username: 'root',
          password: '', // ou votre mot de passe
          database: 'candidates_db',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // Désactivez-le en production !
        });

        return dataSource.initialize();
    },
  },
];
