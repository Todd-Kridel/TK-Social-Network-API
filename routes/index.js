

const router = require("express").Router();
const apiRoutes = require("./api");


router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("ERROR: The specified route path is not correct/valid.");
});


module.exports = router;

