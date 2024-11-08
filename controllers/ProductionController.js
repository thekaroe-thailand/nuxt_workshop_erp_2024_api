const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    list: async (req, res) => {
        const productionPlanId = req.params.productionPlanId;

        try {
            const productions = await prisma.production.findMany({
                where: {
                    status: "active",
                    productionPlanId: productionPlanId
                },
                include: {
                    ProductionPlan: {
                        include: {
                            Product: {
                                include: {
                                    Packaging: true,
                                    ProductType: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json({ results: productions });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    create: async (req, res) => {
        try {
            await prisma.production.create({
                data: req.body
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.production.update({
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
            await prisma.production.update({
                where: {
                    id: req.params.id
                },
                data: { status: "inactive" }
            });

            res.json({ message: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}