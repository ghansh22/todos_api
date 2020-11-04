const config = {
    "production" : {
        "dbConnectionstring" : "mongodb://root:root@127.0.0.1:27017/todo_app?authSource=admin"
    },
    "stage" : {
        "dbConnectionstring" : "mongodb://root:root@127.0.0.1:27017/todo_app?authSource=admin"
    },
    "default" : {
        "dbConnectionstring" : "mongodb://root:root@127.0.0.1:27017/todo_app?authSource=admin"
    },
}

exports.get = function get(env) {
    return config[env] || config.default
}