const { prisma } = require("../db");
const { getOrbitInstance } = require("../orbit");

module.exports.createKvStore = async (req, res) => {
    const { project_id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).send("Missing store name");
        return;
    }
    const orbit = await getOrbitInstance();
    const kv = await orbit.create(name, "keyvalue", {
        overwrite: true,
    });
    const db = await prisma.kV.create({
        data: {
            projectId: Number(project_id),
            address: kv.address.toString(),
        },
    });
    res.send({ id: db.id });
};

module.exports.getKvStores = async (req, res) => {
    const { project_id } = req.params;
    const kvStores = await prisma.kV.findMany({ where: { projectId: Number(project_id) } });
    res.send(kvStores.map(({ address }) => address));
};

module.exports.kvGet = async (req, res) => {
    const { key } = req.body;
    if (!key) {
        res.status(400).send("Missing key");
        return;
    }
    const orbit = await getOrbitInstance();
    const kv = await orbit.open(req.dbAddress, { type: "keyvalue" });
    await kv.load();
    const value = await kv.get(key);
    res.send({ value });
    await kv.close();
};

module.exports.kvPut = async (req, res) => {
    const { key, value } = req.body;
    if (!(key && value)) {
        res.status(400).send("Missing key or value");
        return;
    }
    const orbit = await getOrbitInstance();
    const kv = await orbit.open(req.dbAddress, { type: "keyvalue" });
    await kv.load();
    const hash = await kv.put(key, value, { pin: true });
    res.send({ hash });
    await kv.close();
};

module.exports.kvDel = async (req, res) => {
    const { key } = req.body;
    if (!key) {
        res.status(400).send("Missing key");
        return;
    }
    const orbit = await getOrbitInstance();
    const kv = await orbit.open(req.dbAddress, { type: "keyvalue" });
    await kv.load();
    await kv.del(key);
    res.status(204).send();
    await kv.close();
};

module.exports.kvGetAll = async (req, res) => {
    const orbit = await getOrbitInstance();
    const kv = await orbit.open(req.dbAddress, { type: "keyvalue" });
    await kv.load();
    res.send(kv.all);
    await kv.close();
};
