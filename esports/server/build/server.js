import express from "express";
const app = express();
app.get("/ads", (req, res) => res.status(200).json({
    status: "on-line",
}));
app.listen(3333);
