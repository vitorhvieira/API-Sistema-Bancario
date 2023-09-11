const dateFns = require("date-fns");

let { contas, saques, depositos, transferencias } = require("../bancodedados");

const listarContas = (req, res) => {
  res.status(200).json(contas);
};

const criarContas = (req, res) => {
  let numero = 1;
  let saldo = 0;

  if (contas.length > 0) {
    numero = contas[contas.length - 1].numero + 1;
  }

  contas.push({ numero, saldo, usuario: req.body });

  res.status(201).send();
};

const atualizarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!verificarConta) {
    return res
      .status(400)
      .json({ mensagem: "Numero de conta não encontrado!" });
  }

  verificarConta.usuario.nome = nome;
  verificarConta.usuario.cpf = cpf;
  verificarConta.usuario.data_nascimento = data_nascimento;
  verificarConta.usuario.telefone = telefone;
  verificarConta.usuario.email = email;
  verificarConta.usuario.senha = senha;

  res.status(200).send();
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!verificarConta) {
    return res
      .status(404)
      .json({ mensagem: "Numero de conta não encontrado!" });
  }

  if (verificarConta.saldo === 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  contas = contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  });

  res.status(200).send();
};

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  const data = new Date();
  const dataFormatada = dateFns.format(data, "yyy-MM-dd H:mm:ss");

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "Não é possivel depositar valores negativos ou zerados",
    });
  }

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!verificarConta) {
    return res
      .status(404)
      .json({ mensagem: "Numero de conta não encontrado!" });
  }

  verificarConta.saldo += valor;

  depositos.push({ data: dataFormatada, numero_conta, valor });

  res.status(200).send();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;
  const data = new Date();
  const dataFormatada = dateFns.format(data, "yyy-MM-dd H:mm:ss");

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "O valor não pode ser menor que zero!",
    });
  }

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  const verificarSenha = contas.find((conta) => {
    return conta.usuario.senha === senha;
  });

  if (!verificarConta) {
    return res.status(404).json({
      mensagem: "Conta não encontrada!",
    });
  }

  if (!verificarSenha) {
    return res.status(401).json({
      mensagem: "Senha incorreta!",
    });
  }

  if (verificarConta.saldo < valor) {
    return res.status(400).json({
      mensagem: "A conta nao possui saldo suficente para o saque!",
    });
  }

  verificarConta.saldo -= valor;

  saques.push({ data: dataFormatada, numero_conta, valor });

  res.status(200).send();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  const data = new Date();
  const dataFormatada = dateFns.format(data, "yyy-MM-dd H:mm:ss");

  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "O valor não pode ser menor que zero!",
    });
  }

  if (!numero_conta_origem || !numero_conta_destino || !valor | !senha) {
    return res
      .status(400)
      .json({ mensagem: "Informe todos os dados corretamentes!" });
  }

  const verificarContaOrigem = contas.find((conta) => {
    return conta.numero === Number(numero_conta_origem);
  });

  const verificarContaDestino = contas.find((conta) => {
    return conta.numero === Number(numero_conta_destino);
  });

  const verificarSenhaOrigem = contas.find((conta) => {
    return conta.usuario.senha === senha;
  });

  if (!verificarSenhaOrigem) {
    return res.status(401).json({
      mensagem: "Senha incorreta!",
    });
  }

  if (!verificarContaOrigem) {
    return res.status(404).json({
      mensagem: "Conta de Origem não encontrada!",
    });
  }

  if (!verificarContaDestino) {
    return res.status(404).json({
      mensagem: "Conta de Destino não encontrada!",
    });
  }

  if (verificarContaOrigem.saldo <= 0) {
    return res.status(400).json({
      mensagem: "Não ha saldo disponivel",
    });
  }

  if (verificarContaOrigem.saldo < valor) {
    return res.status(400).json({
      mensagem: "Saldo insuficiente para transferencia",
    });
  }

  verificarContaOrigem.saldo -= valor;
  verificarContaDestino.saldo += valor;

  transferencias.push({
    data: dataFormatada,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  });

  res.status(200).send({ saldo: verificarContaOrigem.saldo });
};

const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta | !senha) {
    return res
      .status(400)
      .json({ mensagem: "Informe todos os dados corretamente!" });
  }

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  const verificarSenha = contas.find((conta) => {
    return conta.usuario.senha === senha;
  });

  if (!verificarConta) {
    return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
  }

  if (!verificarSenha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" });
  }

  res.status(200).json({ saldo: verificarConta.saldo });
};

const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Informe todos os dados corretamente" });
  }

  const verificarConta = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  const verificarSenha = contas.find((conta) => {
    return conta.usuario.senha === senha;
  });

  if (!verificarConta) {
    return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
  }

  if (!verificarSenha) {
    return res.status(401).json({ mensagem: "Senha Incorreta!" });
  }
  const verificarDepositos = depositos.filter((deposito) => {
    return deposito.numero_conta === numero_conta;
  });
  const verificarSaques = saques.filter((saques) => {
    return saques.numero_conta === numero_conta;
  });
  const verificarTransferenciasEnviadas = transferencias.filter(
    (transferencia) => {
      return transferencia.numero_conta_origem === numero_conta;
    }
  );
  const verificarTransferenciasRecebidas = transferencias.filter(
    (transferencia) => {
      return transferencia.numero_conta_destino === numero_conta;
    }
  );

  res.status(200).json({
    depositos: verificarDepositos,
    saques: verificarSaques,
    transferenciasEnviadas: verificarTransferenciasEnviadas,
    transferenciasRecebidas: verificarTransferenciasRecebidas,
  });
};

module.exports = {
  listarContas,
  criarContas,
  atualizarConta,
  excluirConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
};
