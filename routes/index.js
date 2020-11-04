module.exports = (todo_app) => {
    const todo_controller = require("../controllers/todo_controller")

    todo_app.route("/todos").get(todo_controller.get_todos)
    todo_app.route("/todos/new").post(todo_controller.add_todo)
    todo_app.route("/todos/").patch(todo_controller.edit_todo)
    todo_app.route("/todos").delete(todo_controller.delete_todo)
}