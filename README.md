# Marvel Character Explore 🦸‍♂️

Uma aplicação React para explorar personagens e seus quadrinhos.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v14 ou superior)
- Yarn ou npm
- Credenciais da API Marvel (veja `.env.example`)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/emerson-franca/marvel-characters.git
cd marvel
```

2. Instale as dependências:

```bash
yarn install
```

3. Copie o arquivo de ambiente e preencha suas credenciais da API Marvel:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
yarn start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 🧪 Testes

### Testes Unitários

Execute os testes unitários com Jest:

```bash
yarn test
```

Para executar os testes em modo de observação:

```bash
yarn test:watch
```

### Testes End-to-End

Utilizamos Cypress para testes E2E. Para executar os testes:

1. Inicie o servidor de desenvolvimento:

```bash
yarn start
```

2. Em um novo terminal, execute os testes Cypress:

```bash
# Executar testes em modo headless
yarn cypress:run

# Abrir o Test Runner do Cypress
yarn cypress:open
```

## 🛠️ Scripts Disponíveis

- `yarn start` - Executa a aplicação em modo de desenvolvimento
- `yarn build` - Compila a aplicação para produção
- `yarn test` - Executa os testes unitários
- `yarn cypress:open` - Abre o Test Runner do Cypress
- `yarn cypress:run` - Executa os testes Cypress em modo headless

## 📦 Construído Com

- React
- TypeScript
- Jest
- Cypress
- API Marvel

## 📝 Informações adicionais

- Utilizado ReactQuery para cache das chamadas de Api
- Custom Hooks para melhor organização
- Pré commit para garantir que os testes rodem antes de subir qualquer código
- Deploy automático ao subir código para branch main
- Optei por não adicionar a SearchBar na página de character ( visto que não era um requisito listado) para não atrapalhar o cache
