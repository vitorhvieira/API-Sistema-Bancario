let { contas, banco } = require("../bancodedados");

const senha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(401).json({ mensagem: "Senha não informada!" });
  }

  if (senha_banco !== banco.senha) {
    return res.status(401).json({
      mensagem: "A senha do banco informada é inválida!",
    });
  }

  next();
};

const validacaoCpfEEmail = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os dados corretamente!" });
  }

  const validarCPF = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  const validarEMAIL = contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (validarCPF) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o cpf informado!" });
  }

  if (validarEMAIL) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o e-mail informado!" });
  }
  next();
};

const numeroContaEValor = (req, res, next) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta é obrigatorio!" });
  }

  if (!valor) {
    return res.status(400).json({ mensagem: "O valor é obrigatorio!" });
  }

  next();
};

const numeroValido = (req, res, next) => {
  const { numeroConta } = req.params;
  if (isNaN(Number(numeroConta))) {
    return res.status(400).json({ mensagem: "Informe um numero valido" });
  }
  next();
};
module.exports = { senha, validacaoCpfEEmail, numeroContaEValor, numeroValido };
