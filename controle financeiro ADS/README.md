# FinTrack Portfolio

Aplicacao web completa de controle financeiro com foco didatico e pronta para portfolio. O projeto usa React no frontend, Firebase Authentication para login/cadastro, Firestore para persistencia multiusuario e GitHub Actions para CI/CD com deploy separado entre `dev` e `main`.

## Stack principal

- React + TypeScript + Vite
- Firebase Auth
- Firestore
- Cloud Functions for Firebase
- GitHub Actions
- Firebase Hosting

## Funcionalidades implementadas

- Cadastro e login com Firebase Auth
- Rotas protegidas para usuarios autenticados
- Logout
- CRUD completo de movimentacoes financeiras
- Relacao de dados por usuario autenticado
- Dashboard com resumo financeiro e graficos
- Filtros por tipo, status e busca textual
- Validacao de formularios com `react-hook-form` + `zod`
- Feedback visual de carregamento, sucesso e erro
- Configuracao simples de preferencias da conta

## Estrutura de pastas

```text
.
|-- .github/
|   |-- workflows/
|-- functions/
|   |-- src/
|-- src/
|   |-- components/
|   |-- constants/
|   |-- contexts/
|   |-- hooks/
|   |-- lib/
|   |-- pages/
|   |-- services/
|   |-- styles/
|   |-- types/
|   |-- validators/
|-- .env.example
|-- .firebaserc
|-- firebase.json
|-- firestore.indexes.json
|-- firestore.rules
|-- package.json
```

## Modelagem no Firestore

```text
users/{uid}
  uid: string
  name: string
  email: string
  currency: string
  createdAt: timestamp
  updatedAt: timestamp

users/{uid}/transactions/{transactionId}
  title: string
  amount: number
  type: "income" | "expense"
  category: string
  paymentMethod: string
  status: "paid" | "pending"
  date: string (YYYY-MM-DD)
  notes?: string
  createdAt: timestamp
  updatedAt: timestamp
```

Essa estrutura permite multi-user de forma segura e simples, com todos os dados isolados no escopo do usuario autenticado.

## Configuracao do Firebase

1. Crie um projeto Firebase para `dev` e outro para `prod`, ou use dois sites/targets dentro do mesmo projeto.
2. Ative `Authentication` com `Email/Password`.
3. Ative o `Cloud Firestore` em modo production.
4. Configure dois Hosting Targets:
   - `dev` para ambiente de desenvolvimento
   - `prod` para producao
5. Copie `.env.example` para `.env` e preencha com as credenciais do projeto correspondente.
6. Atualize o arquivo `.firebaserc` com seus `projectId` reais e nomes dos targets.

## Execucao local

```bash
npm install
npm run dev
```

Para emuladores do Firebase:

```bash
firebase emulators:start
```

## Deploy manual

Ambiente de desenvolvimento:

```bash
npm run build
firebase deploy --project SEU_PROJECT_ID_DEV --only hosting:dev,firestore:rules,firestore:indexes
```

Ambiente de producao:

```bash
npm run build
firebase deploy --project SEU_PROJECT_ID_PROD --only hosting:prod,firestore:rules,firestore:indexes
```

## CI/CD com GitHub Actions

### Branch `dev`

- Executa instalacao, typecheck e build
- Realiza deploy automatico para ambiente de desenvolvimento
- Esperado usar uma URL separada, por exemplo: `https://fintrack-dev.web.app`

### Branch `main`

- Executa instalacao, typecheck e build
- Realiza deploy automatico para ambiente de producao
- URL oficial, por exemplo: `https://fintrack-prod.web.app`

### Secrets recomendados no GitHub

Para CI:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

Para deploy `dev`:

- `FIREBASE_SERVICE_ACCOUNT_DEV`
- `FIREBASE_PROJECT_ID_DEV`
- `VITE_FIREBASE_PROJECT_ID_DEV`
- `VITE_FIREBASE_STORAGE_BUCKET_DEV`
- `VITE_FIREBASE_MESSAGING_SENDER_ID_DEV`
- `VITE_FIREBASE_APP_ID_DEV`
- `VITE_FIREBASE_MEASUREMENT_ID_DEV`

Para deploy `prod`:

- `FIREBASE_SERVICE_ACCOUNT_PROD`
- `FIREBASE_PROJECT_ID_PROD`
- `VITE_FIREBASE_PROJECT_ID_PROD`
- `VITE_FIREBASE_STORAGE_BUCKET_PROD`
- `VITE_FIREBASE_MESSAGING_SENDER_ID_PROD`
- `VITE_FIREBASE_APP_ID_PROD`
- `VITE_FIREBASE_MEASUREMENT_ID_PROD`

## Boas praticas de seguranca adotadas

- Regras do Firestore restringem leitura e escrita ao proprio usuario autenticado
- Colecao de transacoes aninhada por `uid`
- Rotas privadas no frontend
- Nenhum dado sensivel fixado no codigo
- Possibilidade de usar Cloud Functions para regras de negocio complementares

## Backend complementar leve

Foi incluido um exemplo de Cloud Function callable em `functions/src/index.ts` para calcular um resumo consolidado de dashboard no backend, o que ajuda a demonstrar extensibilidade e separacao de responsabilidades.

## Observacoes finais

- O ambiente atual onde o projeto foi gerado nao possui `node`, `npm` ou `firebase` instalados, entao a aplicacao foi preparada integralmente, mas a build nao foi executada aqui.
- Antes do primeiro deploy, ajuste `.firebaserc`, crie os sites/targets do Hosting e configure os secrets no GitHub.
