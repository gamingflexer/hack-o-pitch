# hack-o-pitch

### PPT - https://docs.google.com/presentation/d/1wf_ZQv4dzlsmJjGDBOtzEQmebTqBBcHtdwSijlyWz-s/edit?usp=sharing

### Youtube Video - https://youtu.be/uYbMd1IiCE0

### Flask Backend
==================================

### SetUp and Run

### Fork, Clone and Remote

    (venv) $ cd flask
    (venv) $ pip install -r requirements.txt

## Running the Flask Server

Step 1: Change the current directory to Flask-backend
```sh
(venv) $ cd flask
```

Step 2: Set up FLASK_APP
(For Linux or Mac)
```sh
(venv) $ `export FLASK_APP=run.py`
```

(For Windows)
```sh
(venv) $ `set FLASK_APP=run.py`
```


Step 4:Start the backend server
To run the server use the following command:
```sh
(venv) $ flask run --host=0.0.0.0 --port=5000
```

# Analytics

```
(venv) $ cd streamlit
(venv) $ streamlit run ml.py

```

# IPFS

```
(venv) $ ipfs init
(venv) $ ipfs daemon --enable-pubsub-experiment

```

# API Endpoints List

```

base API -- /api/projects

    Methods      Endpoint       Rule
    --------     --------       ----
    get - "/" -->  allProjects
    post - "/" -->  projectValidator -->  createProject
    get - "/:project_id" -->  readProject
    put - "/:project_id" -->  projectValidator -->  updateProject
    delete - "/:project_id" -->  deleteProject
    get - "/:project_id/buckets" -->  allBuckets
    post - "/:project_id/buckets" -->  createBucket
    get - "/:project_id/buckets/:bucket_id" -->  readBucket
    put - "/:project_id/buckets/:bucket_id" -->  updateBucket
    delete - "/:project_id/buckets/:bucket_id" -->  deleteBucket
    post - "/:project_id/kv/create" -->  createKvStore
    get - "/:project_id/kv" -->  getKvStores
    get - "/:project_id/kv/:database_id/all" -->  databaseInstanceValidator -->  kvGetAll
    get - "/:project_id/kv/:database_id" -->  databaseInstanceValidator -->  kvGet
    post - "/:project_id/kv/:database_id" -->  databaseInstanceValidator -->  kvPut
    delete - "/:project_id/kv/:database_id" -->  databaseInstanceValidator -->  kvDel
    post - "/:project_id/log/create" -->  createLogStore
    get - "/:project_id/log" -->  databaseInstanceValidator -->  getLogStores
    get - "/:project_id/log/:database_id" -->  databaseInstanceValidator -->  logGet
    get - "/:project_id/log/:database_id/all" -->  databaseInstanceValidator -->  logGetAll
    post - "/:project_id/log/:database_id" -->  databaseInstanceValidator -->  logAdd
    post - "/:project_id/analytics/init" -->  createAnalyticsStore
    get - "/:project_id/analytics/status" -->  analyticsStatus
    get - "/:project_id/analytics" -->  getAnalytics
    post - "/:project_id/analytics" -->  postAnalytics;
```

**Note** : You can find the updated list of API endpoints using the following command
```sh
(venv) $ flask routes
```
