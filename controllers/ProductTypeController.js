const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.productType.create({
                data: {
                    name: req.body.name,
                    remark: req.body.remark,
                }
            });

            res.send({ message: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    list: async (req, res) => {
        try {
            const productTypes = await prisma.productType.findMany({
                where: {
                    status: 'active'
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            res.json({ results: productTypes });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.productType.update({
                where: {
                    id: req.params.id
                },
                data: {
                    name: req.body.name,
                    remark: req.body.remark,
                }
            });

            res.send({ message: 'success' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.productType.update({
                where: {
                    id: req.params.id
                },
                data: {
                    status: 'inactive'
                }
            });

            res.send({ message: 'success' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}