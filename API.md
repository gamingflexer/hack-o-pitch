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

## analytics

-   POST `/api/projects/project_id/analytics/init` **first** to initialize the analytics service
-   GET `/api/projects/project_id/analytics/status` to check if the analytics service is running
-   POST `/api/projects/project_id/analytics` to send analytics data
    -   Format is {time (unix timestamp), resource_id, visitor_id, event_type, event_value}
-   GET `/api/projects/project_id/analytics` to query the analytics data

    -   querying options:

        -   minTime and maxTime in request body to fetch data between those times (both in unix timestamp)
        -   `?format=timeKey` query parameter to get the data like

        ```json
        {
            "830231291209121": {
                "resource_id": "resource_id",
                "visitor_id": "visitor_id",
                "event_type": "event_type",
                "event_value": "event_value"
            },
            "882032932849230": {
                "resource_id": "resource_id",
                "visitor_id": "visitor_id",
                "event_type": "event_type",
                "event_value": "event_value"
            }
        }
        ```

        as opposed to

        ```json
        [
            {
                "time": "830231291209121",
                "resource_id": "resource_id",
                "visitor_id": "visitor_id",
                "event_type": "event_type",
                "event_value": "event_value"
            },
            {
                "time": "882032932849230",
                "resource_id": "resource_id",
                "visitor_id": "visitor_id",
                "event_type": "event_type",
                "event_value": "event_value"
            }
        ]
        ```
        which is the normal output
