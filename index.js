//# mongoDB

//espero que gostem 😁
//criei pra ajudar vcs com muito amor ❤️
//lembra de ir no ./configs/mongo colocar a URL do teu cluster!
//suporte: https://wa.me/558592039551
//criador OFC: INDIUZIN 🥷🏾 estragados de xereca 🧙
const mongoose = require("mongoose");
const path = require('path');
const authRoutes = require("./routes/auth");

const {
    ConnMongo
} = require('./configs/mongo');

const {
    express,
    conn,
    base
} = require('./configs/server');

// Middleware
base.use(express.json());
base.use(express.static(path.join(__dirname, "pages")));

// Conexão MongoDB
mongoose.connect(ConnMongo, { dbName: "base" })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro na conexão MongoDB:", err));

// Rotas
base.use("/auth", authRoutes);

// Rota raiz
base.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicia servidor
base.listen(conn, () => console.log(`Servidor rodando na porta ${conn}`));