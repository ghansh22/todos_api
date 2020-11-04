const mongojs = require("mongojs")
const dbconfig = require("../configs/db_config").get(process.env.NODE_ENV)
const db = mongojs(dbconfig["dbConnectionstring"])
todo_col = "todo_col"
ObjectId = require('mongodb').ObjectID;

exports.delete_todo = (req, res) => {
    // res.send('s')
    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            msg: "failure",
            desn: "please send req.body"
        })
    } if (req.body["_id"] == undefined) {
        res.status(400).send({
            msg: "failure",
            desn: "please id field required"
        })
    } else {
        db.collection(todo_col).remove({ "_id": ObjectId(req.body._id) }, (error, result) => {
            if (error) {
                res.status(200).send({
                    msg: "failure",
                    desn: "something went wrong"
                })
            } else {
                res.status(200).send({
                    msg: "success",
                    desn: `${req.body["_id"]} is deleted`
                })
            }
        })
    }
}

exports.edit_todo = (req, res) => {
    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            msg: "failure",
            desn: "please send req.body"
        })
    } else {
        // debugger
        if (req.body["_id"] == undefined) {
            res.status(400).send({
                msg: "failure",
                desn: "please id field required"
            })
        } else {
            if (req.body["is_completed"] == undefined) {
                res.status(400).send({
                    msg: "failure",
                    desn: "please iscompeted field required"
                })
            } else {
                data = {}
                data["is_completed"] = req.body["is_completed"]
                db.collection(todo_col).findAndModify({
                    query: { "_id": ObjectId(req.body._id) },
                    update: { $set: data },
                    new: true
                }, function (error, doc, lastErrorObject) {
                    if (error) {
                        res.status(200).send({
                            msg: "failure",
                            desn: "something went wrong"
                        })
                    } else {

                        res.send({
                            msg: "success",
                            desc: "todo updated",
                            data: doc
                        })
                    }
                })
            }
        }
    }
}


exports.get_todos = (req, res) => {
    db.collection(todo_col).find((error, result) => {
        if (error) {
            res.status(503).send({
                msg: "failure",
                desn: "something went wrong"
            })
        } else {
            db.collection(todo_col).find({}, (error, result) => {
               // debugger
                if (error) {
                    res.status(503).send({
                        msg: "failure",
                        desn: "something went wrong"
                    })
                } else {
                    if (result.length == 0) {
                        res.status(200).send({
                            msg: "success",
                            descn: "no taks found",
                            data: result
                        })
                    } else {
                        res.status(200).send({
                            msg: "success",
                            descn: "tasks found",
                            data: result
                        })
                    }
                }
            })
        }
    })
}

exports.add_todo = (req, res) => {
    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            msg: "failure",
            desn: "please send req.body"
        })
    } else {
        if (req.body["tasks"] == undefined) {
            res.status(400).send({
                msg: "failure",
                desn: "task is required"
            })
        } else {
            data = {}
            data["tasks"] = req.body["tasks"]
            data["is_completed"] = req.body["is_completed"] = false

            db.collection(todo_col).save(data, (error, result) => {
                if (error) {
                    res.status(503).send({
                        msg: "failure",
                        desn: "something went wrong"
                    })
                } else {
                    if (result) {
                        // not showing id in respose
                        delete result["_id"]
                        res.status(200).send({
                            msg: "success",
                            descn: "task created",
                            data: result
                        })
                    } else {
                        res.status(503).send({
                            msg: "failure",
                            desn: "something went wrong"
                        })
                    }
                }
            })
        }
    }
}
