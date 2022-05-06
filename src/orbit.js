const IPFS = require("ipfs-http-client");
const OrbitDB = require("orbit-db");

const ipfs = IPFS.create({url: 'http://localhost:5001'});

class Repository {
    constructor() {
        this.dbs = {};
        OrbitDB.createInstance(ipfs).then(orbit => (this.orbit = orbit));
    }

    async init(projectId) {
        this.dbs[projectId] = await this.orbit.keyvalue(`${projectId}`);
        this.inited = true;
    }

    getDb(projectId) {
        return this.dbs[projectId];
    }
}

const repo = new Repository();

module.exports = { repo };
