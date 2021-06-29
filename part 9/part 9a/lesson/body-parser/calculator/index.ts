import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
import { calculator } from "./calculator";

const PORT = 3003;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  console.log(`req.body`, req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  const result = calculator(Number(value1), Number(value2), op);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
