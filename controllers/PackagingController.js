const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.packaging.create({
                data: req.body
            });

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    list: async (req, res) => {
        try {
            const packagings = await prisma.packaging.findMany({
                where: {
                    status: "active"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json({ results: packagings });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.packaging.update({
                data: {
                    status: "inactive"
                },
                where: {
                    id: req.params.id
                }
            });

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.packaging.update({
                data: req.body,
                where: {
                    id: req.params.id
                }
            });

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}