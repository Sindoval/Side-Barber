# ✂️ Side Barber

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Shadcn](https://img.shields.io/badge/Shadcn-18181B?style=for-the-badge)](https://ui.shadcn.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-1A202C?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)

---

## 📌 Descrição

**Side Barber** é um sistema **SaaS moderno e escalável** desenvolvido para facilitar a **marcação de serviços em barbearias**, otimizando tanto a experiência do cliente quanto a organização do estabelecimento.

O usuário pode:

- 🔍 Pesquisar barbearias por **nome** ou **serviços oferecidos**
- 📅 Agendar um horário com a barbearia desejada
- 🔐 Fazer login com sua conta **Google** via autenticação OAuth
- 🚀 Interface rápida, moderna e responsiva

---

## ✨ Funcionalidades

- ✅ Cadastro e login via **Google (NextAuth)**
- ✅ Lista de barbearias com **busca por nome ou serviço**
- ✅ Página individual de barbearia com detalhes e horários disponíveis
- ✅ Sistema de **agendamento** com UX intuitiva
- 🔄 Carregamento otimizado com **SSR e ISR (Next.js)**
- 📦 Backend robusto com **Prisma + PostgreSQL**

---

## 🔭 Funcionalidades Futuras

- 💳 Integração com **gateway de pagamento**
- 🧾 Planos mensais para barbearias se cadastrarem no sistema
- 📈 Painel administrativo para gestão de agendamentos e clientes

---

## 🧠 Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
|----------|------------|-----------|
| Frontend | [Next.js](https://nextjs.org/) | Framework React com SSR/SSG |
| Styling/UI | [Shadcn/UI](https://ui.shadcn.dev/) | Componentes acessíveis e estilizados |
| Tipagem | [TypeScript](https://www.typescriptlang.org/) | Tipagem estática para maior segurança |
| Forms | [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários eficiente |
| Auth | [NextAuth.js](https://next-auth.js.org/) | Autenticação pronta para produção |
| ORM | [Prisma](https://www.prisma.io/) | Mapeamento objeto-relacional com migrations |
| Banco | [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional confiável |
| Deploy | Vercel (futuramente) | Hospedagem e CI/CD integrada com Git |

---


- **Componentes Reutilizáveis**: Design system baseado no Shadcn
- **Separação de Lógicas**: Serviços, Hooks e Helpers separados
- **Gerenciamento de Estado**: Simples, focado em hooks locais
- **Validações**: Feitas com `zod` + `react-hook-form`

---

## 🔒 Autenticação

Autenticação é feita com o `NextAuth.js`, utilizando o provedor do Google (OAuth2):

- Sessões seguras
- Tokens protegidos com JWT
- Callback para personalização do fluxo

---

## 📦 Banco de Dados

Modelado com **Prisma** e utilizando o **PostgreSQL** como banco principal.

Exemplo de um model simplificado:

```ts
model Appointment {
  id          String   @id @default(uuid())
  user        User     @relation(fields: [userId], references: [id])
  userId      String
  barbershop  Barbershop @relation(fields: [barbershopId], references: [id])
  barbershopId String
  date        DateTime
  createdAt   DateTime @default(now())
}
```

# Clone o repositório
git clone https://github.com/Sindoval/Side-Barber.git

# Acesse a pasta
cd side-barber

# Instale as dependências
npm install

# Crie o arquivo .env e configure as variáveis
cp .env.example .env
DATABASE_URL=""
GOOGLE_CLIENT_ID="'
GOOGLE_CLIENT_SECRET=""

# Rode as migrations
npx prisma migrate dev

# Rode o projeto
npm run dev

