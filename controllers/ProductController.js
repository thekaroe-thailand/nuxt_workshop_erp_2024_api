const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.product.create({
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    list: async (req, res) => {
        try {
            const products = await prisma.product.findMany({
                include: {
                    Packaging: true,
                    ProductType: true
                },
                where: {
                    status: "active"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            res.json({ results: products });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.product.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.product.update({
                where: {
                    id: req.params.id
                },
                data: {
                    status: "inactive"
                }
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}