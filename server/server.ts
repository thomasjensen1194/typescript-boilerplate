import express from "express";
import "reflect-metadata";
import apollo from "./graphql/apolloServer";
import helmet from "helmet";
import "./typeORM/typeORM";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
apollo.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
