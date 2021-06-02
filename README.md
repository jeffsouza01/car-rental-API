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
Deve ser possível listar todos os carros disponíveis pelo nome da narca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de Negócio**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação do veículo

**Regra Funcional**
Deve ser possível cadastrar a especificação de um veículo
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**Regra de Negócio**
Não deve ser possível cadastrar a especificação de um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**Regra Funcional**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

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
