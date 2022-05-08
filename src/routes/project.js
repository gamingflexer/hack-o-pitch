const { prisma } = require("../db");

const createProject = async (req, res) => {
    const { name, description } = req.body;

    const project = await prisma.project.create({
        data: { name, description },
    });

    res.json({ id: project.id });
};

const readProject = async (req, res) => {
    const { project_id } = req.params;

    const project = await prisma.project.findFirst({
        where: { id: project_id },
    });

    res.json(project);
};

const allProjects = async (req, res) => {
    const projects = await prisma.project.findMany();

    res.json(projects);
};

const updateProject = async (req, res) => {
    const { project_id } = req.params;
    const { name, description, seed_phrase } = req.body;

    await prisma.project.update({
        where: { id: project_id },
        data: { name, description, seed_phrase },
    });

    res.send({ msg: "OK" });
};

const deleteProject = async (req, res) => {
    const { project_id } = req.params;

    await prisma.project.delete({ where: { id: project_id } });

    res.send({ msg: "OK" });
};

module.exports = {
    createProject,
    readProject,
    allProjects,
    updateProject,
    deleteProject,
};
