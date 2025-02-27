const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");
const Teste36 = require("./models/Teste36");

const app = express();

const SECRET_KEY = "seu_segredo"; // Utilize variável de ambiente no futuro
const FRONTEND_URL = "https://dissobelmetas.com"; // Domínio do frontend

// Middleware de CORS
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true // Permite envio de cookies e headers autenticados
}));

// Middleware para definir cabeçalhos CORS personalizados
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect(FRONTEND_URL);
});

// Rota para login
app.post("/api/login", async (req, res) => {
  const { cpf } = req.body;

  try {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const token = jwt.sign({ cpf: user.cpf }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    return res.json({
      token,
      user: {
        cpf: user.cpf,
        name: user.name,
        codigo: user.codigo,
        função: user.função
      },
      message: "Login bem-sucedido"
    });

  } catch (error) {
    console.error("Erro durante o login:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

// Middleware para verificar token
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
  res.json({ message: `Bem-vindo ao dashboard, usuário de CPF ${req.user.cpf}!` });
});

// Iniciar o servidor
app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor rodando...");
});
