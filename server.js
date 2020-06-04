const express = require("express");
const request = require("request");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));


app.use((req, res, next) => {
    console.log("request details. Method", req.method, "original url:", req.originalUrl);

    next();
});


// Handles the CORS error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    next();
});


// handle errors middleware
app.use((err, req, res, next) => {
    console.log("err", err);

    res.status(500).json({ type: "error", message: err.message });
});


// Visit /ping to see if server is running properly
app.get("/ping", (req, res) => {
    res.send("pong!");
});



var server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server is started on localhost:' + (process.env.PORT || 3000))
})