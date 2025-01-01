import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.get("/test", (req: Request, res: Response) => {
  res.send([{ name: "test" }, { name: "test123" }, { name: "321" }]);
});

app.listen(port, () => {
  console.log(`[backend]: Server is running at port: ${port}`);
});
