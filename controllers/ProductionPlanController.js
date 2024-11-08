const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    list: async (req, res) => {
        try {
            const plans = await prisma.productionPlan.findMany({
                where: {
                    status: "active"
                },
                include: {
                    Product: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json({ results: plans });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    create: async (req, res) => {
        try {
            await prisma.productionPlan.create({
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.productionPlan.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.productionPlan.update({
                where: {
                    id: req.params.id
                },
                data: {
                    status: "inactive"
                }
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}