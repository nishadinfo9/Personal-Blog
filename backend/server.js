import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./src/db/db.js";

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log("server is ready", process.env.PORT);
    })
  )
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});
