const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

module.exports = {
    production: async (req, res) => {
        try {
            const fromDate = dayjs(req.body.fromDate).format("YYYY-MM-DD 00:00:00");
            const toDate = dayjs(req.body.toDate).format("YYYY-MM-DD 23:59:59");

            const production = await prisma.production.findMany({
                include: {
                    ProductionPlan: {
                        include: {
                            Product: true
                        }
                    }
                },
                where: {
                    status: "active",
                    createdAt: {
                        gte: dayjs(fromDate).toDate(),
                        lte: dayjs(toDate).toDate()
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json({ results: production });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    productsAndCost: async (req, res) => {
        try {
            const products = await prisma.product.findMany({
                include: {
                    ProductFormular: {
                        include: {
                            Material: true
                        }
                    }
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
            res.status(500).json({ error: e.message });
        }
    }
}