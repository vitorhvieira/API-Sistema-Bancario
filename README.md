# API RESTFUL para um sistema bancario.

O papel desta API para um banco é a criação de contas bancarias, listagem de todas as contas armazenadas, pode atualizar os dados do cliente, excluir caso necessario a conta, depositar, sacar, tranferir valores entre contas do banco, consultar o saldo e emitir todo o extrato referente a conta.

## Endpoints

### Listar contas bancárias

#### `GET` `http://localhost:3000/contas?senha_banco=Cubos123Bank`

Esse endpoint ira listar todas as contas bancárias existentes. Para ter a listagem é necessario passar a senha "Cubos123Bank" na query senha_banco.

- **Requisição** - query params (respeitando este nome)

  - senha_banco

- **Resposta**
  - listagem de todas as contas bancárias existentes

<img src ="./imagens/listarContas.png">

### Criar conta bancária

#### `POST` `http://localhost:3000/contas`

Esse endpoint ira criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

- **Requisição** - O corpo (body) ira possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

  <img src ="./imagens/criarConta.png">

### Atualizar usuário da conta bancária

#### `PUT` `http://localhost:3000/contas/:numeroConta/usuario`

Esse endpoint ira atualizar apenas os dados do usuário de uma conta bancária.

- **Requisição** - O corpo (body) irá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

 <img src ="./imagens/atualizarConta.png">

### Excluir Conta

#### `DELETE` `http://localhost:3000/contas/:numeroConta`

Esse endpoint ira excluir uma conta bancária existente.

- **Requisição**

  - Numero da conta bancária (passado como parâmetro na rota)

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

<img src ="./imagens/excluirConta.png">

### Depositar

#### `POST` `http://localhost:3000/transacoes/depositar`

Esse endpoint ira somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

- **Requisição** - O corpo (body) ira possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

<img src ="./imagens/deposito.png">

### Sacar

Esse endpoint ira realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

#### `POST` `http://localhost:3000/transacoes/sacar`

- **Requisição** - O corpo (body) ira possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor
  - senha

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

<img src ="./imagens/saque.png">

### Tranferir

#### `POST` `http://localhost:3000/transacoes/transferir`

Esse endpoint ira permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

- **Requisição** - O corpo (body) ira possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta_origem
  - numero_conta_destino
  - valor
  - senha

- **Resposta**

  Em caso de **sucesso**, não ira enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta ira possuir **_status code_** apropriado, e em seu corpo (body) ira possuir um objeto com uma propriedade **mensagem** que ira possuir como valor um texto explicando o motivo da falha.

<img src =".http://localhost:3000/imagens/transferencia.png">

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint ira retornar o saldo de uma conta bancária.

- **Requisição** - query params

  - numero_conta
  - senha

- **Resposta**

  - Saldo da conta

<img src ="./imagens/saldo.png">

### Extrato

#### `GET` `http://localhost:3000/contas/extrato?numero_conta=123&senha=123`

Esse endpoint ira listar as transações realizadas de uma conta específica.

- **Requisição** - query params

  - numero_conta
  - senha

- **Resposta**
  - Relatório da conta

<img src ="./imagens/extrato.png">
