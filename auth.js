const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usuarios");

const {
    express,
    site
} = require('../configs/server');

const JWT_SECRET = "indiuzin-domina-javascript";

// 📍 Registro
site.post("/register", async (req, res) => {// Sr, indiuzin
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "Preencha todos os campos" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
});

// 📍 Login
site.post("/login", async (req, res) => {// Sr, indiuzin
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Senha inválida" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login bem-sucedido", token });
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
});

module.exports = site;