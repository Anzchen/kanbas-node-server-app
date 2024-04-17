import express from "express";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import "dotenv/config";

const strippedNetlifyUrl = process.env.NETLIFY_URL.replace("https://", "");
const allowedOrigins = [
  process.env.FRONTEND_URL,`https://a6--${strippedNetlifyUrl}`,
];

mongoose.connect(process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas");
const app = express();
app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              return callback(null, true);
            } else {
              const msg =
                "The CORS policy for this site does not allow access from the specified Origin.";
              return callback(new Error(msg), false);
            }
        }
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
app.use(session(sessionOptions));  
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);