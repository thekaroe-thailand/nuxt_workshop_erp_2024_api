const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    list: async (req, res) => {
        try {
            const formulars = await prisma.productFormular.findMany({
                include: {
                    Material: true
                },
                where: {
                    productId: req.params.productId,
                    status: "active"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json({ results: formulars });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.productFormular.update({
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
            await prisma.productFormular.update({
                where: {
                    id: req.params.formularId
                },
                data: {
                    status: "inactive"
                }
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    create: async (req, res) => {
        try {
            await prisma.productFormular.create({
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
