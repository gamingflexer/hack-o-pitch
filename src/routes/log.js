const { prisma } = require("../db");
const { getOrbitInstance } = require("../orbit");

module.exports.createLogStore = async (req, res) => {
    const { project_id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).send("Missing store name");
        return;
    }
    const orbit = await getOrbitInstance();
    const log = await orbit.create(name, "eventlog");
    const db = await prisma.logstore.create({
        data: {
            projectId: Number(project_id),
            address: log.address.toString(),
        },
    });
    res.send({ id: db.id });
};

module.exports.getLogStores = async (req, res) => {
    const { project_id } = req.params;
    const logStores = await prisma.logstore.findMany({ where: { projectId: Number(project_id) } });
    res.send(logStores);
};

module.exports.logGet = async (req, res) => {
    const { hash } = req.body;
    if (!hash) {
        res.status(400).send("Missing hash");
        return;
    }
    const orbit = await getOrbitInstance();
    const db = await orbit.open(req.dbAddress, { type: "eventlog" });
    await db.load();
    const log = db.get(hash);
    res.send({ log });
    await db.close();
};

module.exports.logAdd = async (req, res) => {
    const { project_id, name } = req.params;
    const { log } = req.body;
    if (!log) {
        res.status(400).send("Missing log");
        return;
    }
    const orbit = await getOrbitInstance();
    const db = await orbit.open(req.dbAddress, { type: "eventlog" });
    await db.load();
    const hash = await db.add(log);
    res.send({ hash });
    await db.close();
};

module.exports.logGetAll = async (req, res) => {
    const orbit = await getOrbitInstance();
    const db = await orbit.open(req.dbAddress, { type: "eventlog" });
    await db.load();
    const all = db
        .iterator({ limit: -1 })
        .collect()
        .map(e => e.payload.value);
    res.send(all);
    await db.close();
};
