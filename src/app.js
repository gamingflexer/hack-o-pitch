const express = require("express");
const {
    createProject,
    deleteProject,
    allProjects,
    readProject,
    updateProject,
} = require("./routes/project");
const {
    createBucket,
    deleteBucket,
    updateBucket,
    allBuckets,
    readBucket,
} = require("./routes/buckets");
const { Router } = require("express");

const cors = require("cors");
const { createKvStore, kvGetAll, kvGet, kvPut, kvDel, getKvStores } = require("./routes/kv");
const { logGet, logGetAll, logAdd, createLogStore, getLogStores } = require("./routes/log");
const { projectValidator, databaseInstanceValidator } = require("./middleware");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static("client"));

const projectRouter = new Router();

projectRouter
    .get("/", allProjects)
    .post("/", projectValidator, createProject)
    .get("/:project_id", readProject)
    .put("/:project_id", projectValidator, updateProject)
    .delete("/:project_id", deleteProject)
    .get("/:project_id/buckets", allBuckets)
    .post("/:project_id/buckets", createBucket)
    .get("/:project_id/buckets/:bucket_id", readBucket)
    .put("/:project_id/buckets/:bucket_id", updateBucket)
    .delete("/:project_id/buckets/:bucket_id", deleteBucket)
    .post("/:project_id/kv/create", createKvStore)
    .get("/:project_id/kv", getKvStores)
    .get("/:project_id/kv/:database_id/all", databaseInstanceValidator, kvGetAll)
    .get("/:project_id/kv/:database_id", databaseInstanceValidator, kvGet)
    .post("/:project_id/kv/:database_id", databaseInstanceValidator, kvPut)
    .delete("/:project_id/kv/:database_id", databaseInstanceValidator, kvDel)
    .post("/:project_id/log/create", createLogStore)
    .get("/:project_id/log", databaseInstanceValidator, getLogStores)
    .get("/:project_id/log/:database_id", databaseInstanceValidator, logGet)
    .get("/:project_id/log/:database_id/all", databaseInstanceValidator, logGetAll)
    .post("/:project_id/log/:database_id", databaseInstanceValidator, logAdd);

app.use("/api/projects", projectRouter);

module.exports = app;
