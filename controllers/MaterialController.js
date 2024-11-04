const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    list: async (req, res) => {
        try {
            const materials = await prisma.material.findMany({
                where: {
                    status: 'active'
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    StockMaterial: true
                }
            });

            res.json({ results: materials });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            await prisma.material.create({
                data: req.body
            })

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.material.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            })

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.material.update({
                where: {
                    id: req.params.id
                },
                data: {
                    status: 'inactive'
                }
            })

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}