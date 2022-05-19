## creating a project

- POST to /api/projects with the request body having {name, description}

## viewing projects

- GET /api/projects and you'll get a list of all projects each in the form
  ```json
  {
      "id": 1,
      "name": "...",
      "description": "optional"
  }
  ```

- GET api/projects/:id will return the project with the given id

## creating a key value store

- GET /api/projects/:id/kv will return a list of all key value stores in the project
