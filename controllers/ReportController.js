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
    },
    sumProductionPlanPerYearAndMonth: async (req, res) => {
        try {
            const year = req.body.year;
            const month = req.body.month;
            const totalDaysInMonth = new Date(year, month, 0).getDate();

            const productionPlan = await prisma.productionPlan.aggregate({
                _sum: {
                    quantity: true
                },
                where: {
                    createdAt: {
                        gte: dayjs(`${year}-${month}-01`).toDate(),
                        lte: dayjs(`${year}-${month}-${totalDaysInMonth}`).toDate()
                    },
                    status: "active"
                }
            });

            res.json({ result: productionPlan._sum.quantity ?? 0 });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    sumProductionPerYearAndMonth: async (req, res) => {
        try {
            const year = req.body.year;
            const month = req.body.month;
            const totalDaysInMonth = new Date(year, month, 0).getDate();

            const production = await prisma.production.aggregate({
                _sum: {
                    quantity: true
                },
                where: {
                    createdAt: {
                        gte: dayjs(`${year}-${month}-01`).toDate(),
                        lte: dayjs(`${year}-${month}-${totalDaysInMonth}`).toDate()
                    },
                    status: "active"
                }
            });

            res.json({ result: production._sum.quantity ?? 0 });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    sumPriceStockMaterialPerYearAndMonth: async (req, res) => {
        try {
            const year = req.body.year;
            const month = req.body.month;
            const totalDaysInMonth = new Date(year, month, 0).getDate();

            const stockMaterials = await prisma.stockMaterial.aggregate({
                _sum: {
                    price: true,
                    quantity: true
                },
                where: {
                    createdAt: {
                        gte: dayjs(`${year}-${month}-01`).toDate(),
                        lte: dayjs(`${year}-${month}-${totalDaysInMonth}`).toDate()
                    }
                }
            });

            const total = stockMaterials._sum.price * stockMaterials._sum.quantity;
            res.json({ result: total ?? 0 });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    sumProductionPerDayInMonthAndYear: async (req, res) => {
        try {
            const year = req.body.year;
            const month = req.body.month;
            const totalDaysInMonth = new Date(year, month, 0).getDate();

            const arr = [];

            for (let i = 1; i <= totalDaysInMonth; i++) {
                const startDate = dayjs(`${year}-${month}-${i}`).format("YYYY-MM-DD 00:00:00");
                const endDate = dayjs(`${year}-${month}-${i}`).format("YYYY-MM-DD 23:59:59");

                const production = await prisma.production.aggregate({
                    _sum: {
                        quantity: true
                    },
                    where: {
                        createdAt: {
                            gte: dayjs(startDate).toDate(),
                            lte: dayjs(endDate).toDate()
                        },
                        status: "active"
                    }
                });

                arr.push(production._sum.quantity ?? 0);
            }

            res.json({ results: arr });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    sumProductionPerMonthAndYear: async (req, res) => {
        try {
            const year = req.body.year;
            const arr = [];

            for (let i = 1; i <= 12; i++) {
                const totalDaysInMonth = new Date(year, i, 0).getDate();
                const production = await prisma.production.aggregate({
                    _sum: {
                        quantity: true
                    },
                    where: {
                        createdAt: {
                            gte: dayjs(`${year}-${i}-01`).toDate(),
                            lte: dayjs(`${year}-${i}-${totalDaysInMonth}`).toDate()
                        },
                        status: "active"
                    }
                });

                arr.push(production._sum.quantity ?? 0);
            }

            res.json({ results: arr });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}