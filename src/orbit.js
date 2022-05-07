const IPFS = require("ipfs-http-client");
const OrbitDB = require("orbit-db");

const ipfs = IPFS.create({ url: "http://localhost:5001" });

class Repository {
    constructor() {
        this.keyValueDbs = {};
        this.logDbs = {};
        OrbitDB.createInstance(ipfs).then(orbit => (this.orbit = orbit));
    }

    async init(projectId) {
        this.keyValueDbs[projectId] = await this.orbit.keyvalue(`${projectId}`);
        this.logDbs[projectId] = await this.orbit.log(`${projectId}`);
        this.inited = true;
    }

    getKeyValueDb(projectId) {
        return this.keyValueDbs[projectId];
    }

    getLogDb(projectId) {
        return this.logDbs[projectId];
    }
}

const repo = new Repository();

module.exports = { repo };
