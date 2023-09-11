const express = require("express");
const {
  listarContas,
  criarContas,
  atualizarConta,
  excluirConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
} = require("./controladores/controladores");
const {
  senha,
  validacaoCpfEEmail,
  numeroContaEValor,
  numeroValido,
} = require("./intermerdiario/intermerdiario");

const rotas = express();
rotas.use(express.json());

rotas.get("/contas/", senha, listarContas);
rotas.post("/contas/", validacaoCpfEEmail, criarContas);
rotas.put(
  "/contas/:numeroConta/usuario",
  validacaoCpfEEmail,
  numeroValido,
  atualizarConta
);
rotas.delete("/contas/:numeroConta", numeroValido, excluirConta);
rotas.post("/transacoes/depositar", numeroContaEValor, depositar);
rotas.post("/transacoes/sacar", numeroContaEValor, sacar);
rotas.post("/transacoes/transferir", transferir);
rotas.get("/contas/saldo", saldo);
rotas.get("/contas/extrato", extrato);

module.exports = rotas;
