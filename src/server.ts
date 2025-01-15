import express, { Application } from "express";
import todoRoutes from "../src/routes/main";
import path from "path";

const app: Application = express();
const port: number = 5757;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use("/", todoRoutes);

app.listen(port, (): void => {
    console.log('===================================================');
    console.log(`Server is running at http://localhost:${port}  : ✅`);
    console.log('===================================================');
});
