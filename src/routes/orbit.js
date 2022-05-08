const { repo } = require("../orbit");

module.exports.createDb = async (req, res, next) => {
    const { project_id } = req.params;
    await repo.init(project_id).catch(noop => noop);
    res.send({ msg: "OK" });
};
module.exports.kvGet = async (req, res, next) => {
    const db = repo.getKeyValueDb(req.params.project_id);
    const { key } = req.params;
    res.send({
        val: db.get(key),
    });
};
module.exports.kvPut = async (req, res, next) => {
    const db = repo.getKeyValueDb(req.params.project_id);
    const { key, val } = req.body;
    await db.put(key, val);
    res.send({ msg: "OK" });
};
module.exports.kvDel = async (req, res, next) => {
    const db = repo.getKeyValueDb(req.params.project_id);
    const { key } = req.params;
    const mh = await db.del(key);
    res.send({ msg: "OK", mh });
};

module.exports.kvAll = async (req, res, next) => {
    const db = repo.getKeyValueDb(req.params.project_id);
    res.send({ all: db.all });
};

module.exports.logAdd = async (req, res, next) => {
    const db = repo.getLogDb(req.params.project_id);
    const log = req.body;
    const hash = await db.add({log});
    res.send({ hash });
};

module.exports.logGet = async (req, res, next) => {
    const db = repo.getLogDb(req.params.project_id);
    const { hash } = req.params;
    const log = db.get(hash).map(e => e.payload.value);
    res.send({ log });
};

module.exports.logGetAll = async (req, res, next) => {
    const db = repo.getLogDb(req.params.project_id);
    const all = db.iterator(req.body).collect().map(e => e.payload.value);
    res.send(all);
}
