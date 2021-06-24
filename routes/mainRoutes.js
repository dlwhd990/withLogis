const main_router = require("express").Router()
const main_controller = require("../controllers/mainController")
const path = require("path")

const index = path.resolve(__dirname, "../../withLogis/client/build/index.html")

main_router.get("*", (req, res) => {
  res.sendFile(index)
})

module.exports = main_router
