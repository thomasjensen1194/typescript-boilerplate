import express from "express";
import apollo from "./graphql/apolloServer";
import helmet from "helmet";
import "./objection/objection";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
apollo.applyMiddleware({ app });

// Serve index.js
app.use(express.static(path.join(__dirname, "..")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
