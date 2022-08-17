import express from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is now running: http://localhost:3000");
});
