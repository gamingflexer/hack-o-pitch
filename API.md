## creating a project

-   POST to /api/projects with the request body having {name, description}

## viewing projects

-   GET /api/projects and you'll get a list of all projects each in the form

    ```json
    {
        "id": 1,
        "name": "...",
        "description": "optional"
    }
    ```

-   GET api/projects/:id will return the project with the given id

## creating key value store

-   POST /api/projects/:id/kv/create with {name} in request body will create a new key value store with the given name

## viewing all kv stores

-   GET /api/projects/:id/kv will return a list of all key value stores in the project, each in the form

```json
{
    "id": 1,
    "address": "dont worry about this",
    "projectId": 1
}
```

## adding key:value to a kv store

-   POST /api/projects/:id/kv/:kvId with fields {key, value}

## viewing all kv pairs

-   GET /api/projects/:id/kv/:kvId/all

## log store

works the exact same way as the kv store except for two differences

-   the endpoint will have /api/projects/:id/log instead of kv.
-   instead of {key, value} you have to send {log}


## buckets
(soon)
