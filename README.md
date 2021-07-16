<h2 align="center"> Rental Club</h2>

<p align="center"> Aplicação para reserva de carros </p>

# Cadastro de Carro

**Regra Funcional**
Deve ser possível cadastrar novo carro

**Regra de Negócio**
Não deve ser possível cadastrar um carro com placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Regra Funcional**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de Negócio**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação do veículo

**Regra Funcional**
Deve ser possível cadastrar a especificação de um veículo

**Regra de Negócio**
Não deve ser possível cadastrar a especificação de um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**Regra Funcional**
Deve ser possível cadastrar a imagem do carro

**Regra não funcional**
Utilizar o multer para upload dos arquivos

**Regra de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**Regra Funcional**
Deve ser possível cadastrar um aluguel.

**Regra de Negócio**
O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**Regra Funcional**
Deve ser possível realizar a devolução de um carro.

**Regra de Negócio**
Se o carro for devolvido com menos d e24 horas, devera ser cobrado diária completa.
Ao Realizar a devolução, o carro devera ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de Alugueis para usuário

**Regra Funcional**
Deve ser possível realizar a busca de todos os alugueis para o usuário.

**Regra de Negócio**
O usuário deve estar logado.

<h3 align="center"> :construction: Em Desenvolvimento :construction: </h3>

**Made by Jefferson da Silva** :v:
