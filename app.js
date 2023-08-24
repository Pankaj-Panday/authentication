import express from "express";
import { URL, fileURLToPath } from "node:url";
import { connectDB } from "./db/connect.js";
import { router as homeRouter } from "./routes/homeRouter.js";
import { router as userRouter } from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import ejs from "ejs";

const app = express();
const staticDir = fileURLToPath(new URL("public", import.meta.url));

// Connect DB
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(staticDir));
app.use(cookieParser());
app.use("/user", express.static(staticDir));

// using ejs for rendering
app.set("view engine", "ejs");

// custom routes
app.use("/", homeRouter);
app.use("/user", userRouter);

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
