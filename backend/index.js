import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { router } from "./routes/index.js";
import path from "path";
// Import your signup route

const PORT = process.env.PORT || 3001;

const app = express();

//Configure CORS
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods to allow
    credentials: true // Allow credentials if needed
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//added by pooja

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Base API route for all the routes in the backend
app.use("/api/", router);

// serve react app in backend after the frontend build is completed
// app.use(express.static(path.join("build")));
// app.get("*", function (request, response) {
//   response.sendFile("index.html", { root: path.join("build") });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
