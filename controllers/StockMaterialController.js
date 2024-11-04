const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.stockMaterial.create({
                data: {
                    materialId: req.body.material_id,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    remark: req.body.remark
                }
            })

            res.json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}