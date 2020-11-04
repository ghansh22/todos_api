A simple todo API

Please run following command to get started 
>npm install 

API endpoints:
1. LIST of all todos:
{url}/todos/
GET call : sample response: {
    "msg": "success",
    "descn": "tasks found",
    "data": [
        {
            "_id": "5fa29ddf37e6103add9fb91f",
            "tasks": "test",
            "is_completed": false
        },
        {
            "_id": "5fa29de037e6103add9fb920",
            "tasks": "test",
            "is_completed": false
        },
        {
            "_id": "5fa29de037e6103add9fb921",
            "tasks": "test",
            "is_completed": false
        }
    ]
}

2. Add a new todo 
Req:
{
	"tasks": "test"
}
POST Call: {url}/todos/new
{
    "msg": "success",
    "descn": "task created",
    "data": {
        "tasks": "test",
        "is_completed": false
    }
}

3. DELETE the todo
req:
{
	"_id": "5fa29de037e6103add9fb920"
}


response:
DELETE call : {url}/todos/
{
    "msg": "success",
    "desn": "5fa29de037e6103add9fb920 is deleted"
}

4. Edit /Mark task completed:
PATCH call: 
req: {
	"_id": "5fa29de037e6103add9fb921",
  "is_completed": true
}
Response: 
{
    "msg": "success",
    "desc": "todo updated",
    "data": {
        "_id": "5fa29de037e6103add9fb921",
        "tasks": "test",
        "is_completed": true
    }
}
