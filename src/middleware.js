const { prisma } = require("./db");

module.exports.projectValidator = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send("Missing project name");
        return;
    }
    next();
};

module.exports.databaseInstanceValidator = async (req, res, next) => {
    const { project_id, database_id } = req.params;
    if (!(Number.isInteger(Number(database_id)) && Number.isInteger(Number(project_id)))) {
        res.status(400).send("Invalid database id or project id");
        return;
    }
    const storeString = req.originalUrl.split("/")[4].toLowerCase();
    const which = storeString === "kv" ? prisma.kV : prisma.logstore;
    const db = await which.findFirst({
        where: {
            id: Number(database_id),
            projectId: Number(project_id),
        },
    });
    if (!db) {
        res.status(404).send("Database not found");
        return;
    }
    req.dbAddress = db.address;
    next();
};
