// burda yazib o birlerine dagida bilerem...
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { homeRoutes } from "./router/homeRouter.js";
import { allcarsRoute } from "./router/allCarsRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/home", homeRoutes);
app.use("/cars", allcarsRoute);

main().catch((err) => console.log(err));

async function main() {
  await connect(
    "mongodb+srv://adminmenem:adminmenem@cluster0.9tdk0.mongodb.net/"
  );
  console.log("connected DB");
}
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
