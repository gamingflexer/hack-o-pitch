const IPFS = require("ipfs-http-client");
const OrbitDB = require("orbit-db");

const ipfs = IPFS.create({ url: "http://localhost:5001" });
let orbitInstance = null;
async function getOrbitInstance() {
    if (orbitInstance) return orbitInstance;
    orbitInstance = await OrbitDB.createInstance(ipfs);
    return orbitInstance;
}

module.exports = { getOrbitInstance };
