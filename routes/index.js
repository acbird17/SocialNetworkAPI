const router = require("express").Router();
const API = require("./api");

router.use("/api", API);

router.use((req, res) => {
  res.status(404).send("<h1>404 Error!</h1>");
});

module.exports = router;
