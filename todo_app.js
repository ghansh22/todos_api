const express = require("express")
const todo_app = express()
const api_config = require("./configs/api_config").get(process.env.NODE_ENV)
const port = api_config["port"]
const listening_ip = api_config["listening_ip"]
const bodyparser = require("body-parser")

todo_app.use(bodyparser.json())

const routes = require("./routes/index")

routes(todo_app)

todo_app.get("/", (req, res, next) => {
    res.status(200).send({
        msg: "success",
        descn: "welcome to todo api"
    })
})

todo_app.get("*", (req, res, next) => {
    res.status(404).send({
        msg: "failure",
        descn: `req.url not found`
    })
})


todo_app.listen(port,listening_ip, (error) => {
    if(error) {
        console.log(error)
    }else{
        console.log(`listening on ${listening_ip}:${port}`)
    }
})

