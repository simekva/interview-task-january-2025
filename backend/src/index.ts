import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

var data = ""

// Error handling for fetching of data.
try {
  data = require("./data/devices.json")
} catch (e) {
  console.log(e)
}


// Serves JSON with all devices.
app.get("/", (req: Request, res: Response) => {
  try {
    res.json(data)
  }
  catch (e) {
    console.log(e)
  }
});

app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
