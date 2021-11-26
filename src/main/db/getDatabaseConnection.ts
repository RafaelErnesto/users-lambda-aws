import "reflect-metadata";
import { createConnection } from "typeorm";

export const getDatabaseConnection = async () => {
    const connection =  await createConnection({
        type: "postgres",
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5431,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'api',
        entities: [
            process.env.ENV ? "build/infraestructure/database/postgres/entity/*.js" : "src/infraestructure/database/postgres/entity/*.ts"
         ],
         migrations: [
            
         ],
         subscribers: [
            
         ],
        logging: false,
        synchronize: true,
     });
    return connection;
} 
