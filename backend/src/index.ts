import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());


let dataPath = require("./data/devices.json")

// Serves JSON with all devices.
app.get("/", (req: Request, res: Response) => {
  res.json(dataPath)
});

app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
