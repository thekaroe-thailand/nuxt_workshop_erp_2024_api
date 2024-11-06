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
    }
}
