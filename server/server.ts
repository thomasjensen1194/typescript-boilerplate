import express from "express";
import "reflect-metadata";
import apollo from "./graphql/apolloServer";
import "./typeORM/typeORM";
const app = express();
const PORT = process.env.PORT || 3001;

apollo.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
