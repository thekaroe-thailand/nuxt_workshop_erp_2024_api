const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    signIn: async (req, res) => {
        try {
            req.body.username = req.body.username.trim();
            req.body.password = req.body.password.trim();

            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const user = await prisma.user.findFirst({
                where: {
                    username: req.body.username,
                    password: req.body.password,
                    status: "active",
                }
            });

            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const payload = {
                id: user.id,
                username: user.username
            }

            const key = process.env.SECRET_KEY;
            const token = jwt.sign(payload, key, { expiresIn: "30d" }); // 30 days

            res.json({ token: token, level: user.level, id: user.id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
