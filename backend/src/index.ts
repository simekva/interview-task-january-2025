import express, { Request, Response } from "express";
import cors from "cors";
import { promises as fs } from "fs";

const app = express();
const port = 3000;

app.use(cors());

let data = "";

async function readData() {
  try {
    const fileContent = await fs.readFile("./src/data/devices.json", "utf8");
    data = JSON.parse(fileContent);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// Serves JSON with all devices. For this task this is the only
// necessary end-point.
app.get("/", (req: Request, res: Response) => {
  try {
    res.json(data);
  } catch (e) {
    console.log(e);
  }
});

readData();
app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
