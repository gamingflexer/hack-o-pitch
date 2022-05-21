const { getOrbitInstance } = require("../orbit");
const { prisma } = require("../db");
const { nanoid } = require("nanoid");

module.exports.createAnalyticsStore = async (req, res) => {
    const { project_id } = req.params;
    const orbit = await getOrbitInstance();
    const docs = await orbit.create(`${project_id}.analytics`, "docstore", { overwrite: true });
    const db = await prisma.docstore.create({
        data: {
            projectId: Number(project_id),
            address: docs.address.toString(),
        },
    });
    res.send({ msg: "OK" });
};

module.exports.analyticsStatus = async (req, res) => {
    const { project_id } = req.params;
    if (await prisma.docstore.findFirst({ where: { projectId: Number(project_id) } })) {
        return res.send({ status: "up" });
    }
    res.status(404).send({ status: "down" });
};

module.exports.postAnalytics = async (req, res) => {
    const { project_id } = req.params;
    const { address } = await prisma.docstore.findFirst({
        where: { projectId: Number(project_id) },
    });
    const { time, resource_id, visitor_id, event_type, event_value } = req.body;
    if (!time || !resource_id || !visitor_id || !event_type || !event_value) {
        res.status(400).send("Missing time, resource_id, visitor_id, event_type, or event_value");
        return;
    }
    const orbit = await getOrbitInstance();
    const docstore = await orbit.open(address, { type: "docstore" });
    await docstore.load();
    const hash = await docstore.put({
        _id: nanoid(),
        time,
        resource_id,
        visitor_id,
        event_type,
        event_value,
    });
    res.send({ hash });
};

module.exports.getAnalytics = async (req, res) => {
    const { project_id } = req.params;
    const { address } = await prisma.docstore.findFirst({
        where: { projectId: Number(project_id) },
    });
    const { minTime, maxTime, format } = req.query;
    const orbit = await getOrbitInstance();
    const docstore = await orbit.open(address, { type: "docstore" });
    await docstore.load();
    // will support other filters in the future
    const filter =
        (minTime && maxTime && (doc => doc.time >= minTime && doc.time <= maxTime)) || (doc => doc);
    const all = docstore.query(filter);
    const timeKeyFormatter = docs =>
        docs
            .map(({ time, ...rest }) => ({ [time]: rest }))
            .reduce((acc, item) => ({ ...acc, ...item }));
    const formatted = format === "timeKey" ? timeKeyFormatter(all) : all;
    res.send(formatted);
};
