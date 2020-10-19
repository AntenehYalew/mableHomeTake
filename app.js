const express = require("express"),
  app = express(),
  http = require("http"),
  bodyParser = require('body-parser');
require("./routes")(app);

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //parsing req */

var httpServer = http.createServer(app)

app.get("/", (req, res) => {
  res.header("Content-type", "application/json");
  res.json({
    "success": "Welcome to Mabel's Showcase project by Anteneh T AKA Antiti"
  })
})

httpServer.listen(process.env.PORT || "3001", () => {
  console.log("Connected to local Server 3001 or your web hosting Post");
});