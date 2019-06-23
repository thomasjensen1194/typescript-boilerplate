import "reflect-metadata";
import { createConnection } from "typeorm";
import User from "./models/user";

createConnection({
  type: "mysql",
  host: "212.112.144.171",
  port: 3306,
  username: "root",
  password: "thomasdev",
  database: "klinikbytte",
  entities: [User],
  synchronize: true,
  logging: false
})
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(error => console.log(error));
