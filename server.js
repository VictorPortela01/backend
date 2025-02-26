const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User")
const Teste36 = require("./models/Teste36");

const app = express();

app.use(cors());

// Ou permitir apenas uma origem específica
// app.use(cors({ origin: 'http://localhost:3000' })); 

// Exemplo de resposta com cabeçalhos CORS manualmente
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite qualquer origem
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json());



const SECRET_KEY = "seu_segredo"; // Utilizando variável de ambiente

// Rota GET para buscar todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Busca todos os registros na tabela "users"
    res.json(users);  // Retorna os dados em formato JSON
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

app.get('/teste', async (req, res) => {
  try {
    const teste36 = await Teste36.findAll()
    res.json(teste36)
  } catch (error) {
    console.error('Erro ')
  }
})

// Nova rota GET para buscar dados da tabela Teste36 por código
app.get('/teste/:cpf', async (req, res) => {
  const { cpf  } = req.params;
  console.log("Código recebido no backend:", cpf ); // Debug

  try {
    const registro = await Teste36.findOne({ 
      where: { cpf: cpf.toString()  } });

    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado para CPF fornecido." });
    }

    res.json(registro);
  } catch (error) {
    console.error('Erro ao buscar registro por CPF :', error);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Rota para login
app.post("/login", async (req, res) => {
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


// 🔍 Listar usuários que não estão mais ativos na empresa
app.get("/usuarios-inativos", async (req, res) => {
    try {
        const usuariosInativos = await User.findAll({
            where: {
                codigo: {
                    [Sequelize.Op.notIn]: Sequelize.literal("(SELECT codigo FROM teste36)")
                }
            }
        });

        res.json(usuariosInativos);
    } catch (error) {
        console.error("Erro ao buscar usuários inativos:", error);
        res.status(500).json({ erro: "Erro ao buscar usuários inativos." });
    }
});

// ❌ Deletar um usuário pelo ID
app.delete("/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o usuário existe
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // Deleta o usuário
        await usuario.destroy();
        res.json({ mensagem: "Usuário deletado com sucesso!" });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ erro: "Erro ao deletar usuário." });
    }
});


// Iniciar o servidor
app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor rodando...");
});
