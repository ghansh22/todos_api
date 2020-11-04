const config = {
    "production" : {
        "port" : 4545,
        "listening_ip": "127.0.0.1"
    },
    "stage" : {
        "port" : 4545,
        "listening_ip": "127.0.0.1"
    },
    "default" : {
        "port" : 4545,
        "listening_ip": "127.0.0.1"
    },
}

exports.get = function get(env) {
    return config[env] || config.default
}