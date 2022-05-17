const { prisma } = require("../db");
const { getOrbitInstance } = require("../orbit");

module.exports.createKvStore = async (req, res) => {
    const { project_id } = req.params;
    const { name } = req.body;
    await (await getOrbitInstance()).keyvalue(`${project_id}.${name}`);
    await prisma.kV.create({ data: { projectId: Number(project_id), address: name } });
    res.status(204).send();
};

module.exports.kvGet = async (req, res) => {
    const { project_id, name } = req.params;
    const { key } = req.body;
    const kv = await (await getOrbitInstance()).keyvalue(`${project_id}.${name}`);
    await kv.load();
    const value = await kv.get(key);
    console.log(value);
    res.send({ value });
};

module.exports.kvPut = async (req, res) => {
    const { project_id, name } = req.params;
    const { key, value } = req.body;
    const kv = await (await getOrbitInstance()).keyvalue(`${project_id}.${name}`);
    await kv.put(key, value);
    res.send({ key, value });
};

module.exports.kvDel = async (req, res) => {
    const { project_id, name } = req.params;
    const { key } = req.body;
    const kv = await (await getOrbitInstance()).keyvalue(`${project_id}.${name}`);
    await kv.del(key);
    res.status(204).send();
};

module.exports.kvGetAll = async (req, res) => {
    const { project_id, name } = req.params;
    const kv = await (await getOrbitInstance()).keyvalue(`${project_id}.${name}`);
    await kv.load();
    res.send(kv.all);
};
