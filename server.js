const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User")
const Teste36 = require("./models/Teste36");

const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://https://dissobelmetas.com" , "https://backend-production-ce0e.up.railway.app/login", "http://backend-production-ce0e.up.railway.app/login"); // Adapte para seu domínio
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(cors({
  origin: ["https://https://dissobelmetas.com", "http://localhost:5173", "https://backend-production-ce0e.up.railway.app/login", "http://backend-production-ce0e.up.railway.app/login"], // Adapte para seu domínio real
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
}));

app.use(express.json());



const SECRET_KEY = "seu_segredo"; // Utilizando variável de ambiente

const FRONTEND_URL = "https://dissobelmetas.com"; // Substitua pelo domínio do seu frontend

app.get("/", (req, res) => {
    res.redirect(FRONTEND_URL);
});
app.get("/api/login", (req, res) => {
    res.redirect(FRONTEND_URL);
});


// Rota para login
app.post("/api/login", async (req, res) => {
  const { cpf } = req.body;

  console.log("Dados recebidos no login:", req.body); // Debug

  try {
    // Verificar se o usuário existe no banco de dados pelo CPF
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Gerar token JWT
    const token = jwt.sign({ cpf: user.cpf }, SECRET_KEY, { expiresIn: "1h" });

    // Inclua as informações do usuário na resposta
    return res.json({
      token,
      user: {
        cpf: user.cpf,
        name: user.name,
        codigo: user.codigo,
        função: user.função
      },
      message: "Login bem-sucedido",
    });

  } catch (error) {
    console.error("Erro durante o login:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

// Middleware para proteger rotas
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token não fornecido" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

// Rota protegida
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Bem-vindo ao dashboard, ${req.user.username}!` });
});



// Iniciar o servidor
app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor rodando...");
});
