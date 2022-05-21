const { prisma } = require("../db");

async function createBucket(req, res, next) {
    const { name } = req.body;
    const { project_id } = req.params;

    const bucket = await prisma.bucket.create({
        data: { name, projectId: Number(project_id) },
    });

    res.send({ id: bucket.id });
}

async function readBucket(req, res, next) {
    const { project_id, bucket_id } = req.params;

    const bucket = await prisma.bucket.findFirst({
        where: { id: Number(bucket_id), projectId: Number(project_id) },
        include: { files: true },
    });

    res.send(bucket);
}

async function allBuckets(req, res, next) {
    const { project_id } = req.params;

    const buckets = await prisma.bucket.findMany({
        where: { projectId: Number(project_id) },
    });

    res.send(buckets);
}

async function updateBucket(req, res, next) {
    const { project_id, bucket_id } = req.params;
    const { name } = req.body;

    const bucket = await prisma.bucket.update({
        where: { id: Number(bucket_id), projectId: Number(project_id) },
        data: { name },
    });

    res.send(bucket);
}

async function deleteBucket(req, res, next) {
    const { project_id } = req.params;

    await prisma.bucket.delete({ where: { id: Number(project_id) } });

    res.status(204).send();
}

module.exports = { createBucket, readBucket, allBuckets, updateBucket, deleteBucket };
