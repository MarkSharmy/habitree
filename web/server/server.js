const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("../vanilla"));

app.get(["/dashboard/", "/dashboard/*"], (request, response) => {

    response.sendFile(path.resolve(__dirname, "..", "vanilla", "admin.html"));

});

app.listen(process.env.PORT || 5056, () => console.log("Server running"));