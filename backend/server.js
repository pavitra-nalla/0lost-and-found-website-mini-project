import "./config/env.js";


import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// 🔥 IMPORTANT: just import config file (DON’T assign)
import "./config/cloudinary.js";

connectDB();

const app = express();

// Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use("/api/", limiter);



// Core middleware
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:8080"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(hpp());

// 🔥 TEST ROUTES FIRST
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/test", (req, res) => {
    console.log("🔥 TEST HIT");
    res.send("API working");
});

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});