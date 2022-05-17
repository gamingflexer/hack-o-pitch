const { prisma } = require("../db");
const { getOrbitInstance } = require("../orbit");

module.exports.createLogStore = async (req, res) => {
    const { project_id } = req.params;
    const { name } = req.body;
    await (await getOrbitInstance()).log(`${project_id}.${name}`);
    await prisma.logstore.create({ data: { projectId: Number(project_id), address: name } });
    res.status(204).send();
};

module.exports.getLogStores = async (req, res) => {
    const { project_id } = req.params;
    const logStores = await prisma.logstore.findMany({ where: { projectId: Number(project_id) } });
    res.send(logStores.map(({ address }) => address));
};

module.exports.logGet = async (req, res) => {
    const { project_id, name } = req.params;
    const { hash } = req.body;
    const db = await (await getOrbitInstance()).log(`${project_id}.${name}`);
    await db.load();
    const log = db.get(hash);
    res.send({ log });
};

module.exports.logAdd = async (req, res) => {
    const { project_id, name } = req.params;
    const db = await (await getOrbitInstance()).log(`${project_id}.${name}`);
    const { log } = req.body;
    const hash = await db.add(log);
    res.send({ hash });
};

module.exports.logGetAll = async (req, res) => {
    const { project_id, name } = req.params;
    const db = await (await getOrbitInstance()).log(`${project_id}.${name}`);
    await db.load();
    const all = db
        .iterator({ limit: -1 })
        .collect()
        .map(e => e.payload.value);
    res.send(all);
};
