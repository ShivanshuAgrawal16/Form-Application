# Form Application

A full-stack, end-to-end typesafe monorepo application for creating and managing forms.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with React 19)
- **API Layer:** [tRPC](https://trpc.io/) for end-to-end typesafe data fetching
- **Validation:** [Zod](https://zod.dev/)
- **OpenAPI:** [trpc-to-openapi](https://github.com/jlalmes/trpc-to-openapi) for RESTful API generation
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Language:** TypeScript

## 📁 Project Structure

This project utilizes a monorepo workspace architecture managed by `pnpm`:

```text
Form-Application/
├── apps/                 # Application frontends (e.g., Next.js)
├── packages/
│   └── trpc/             # Shared tRPC server logic, contexts, and routers
├── package.json
└── pnpm-workspace.yaml
```

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and pnpm installed on your local machine.

### Installation

1. Clone the repository.
2. Install workspace dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables (refer to `.env.example` if available).

### Running the Application

To start the development servers across the workspace:

```bash
pnpm dev
```

## 🔒 Authentication & API

The API leverages tRPC and uses a token-based authentication system managed through cookies.

Available base procedures:

- `publicProcedure`: Accessible to any user.
- `authenticatedProcedure`: Requires a valid user token. Extracts the token from cookies, verifies it, and injects the decoded `user.id` into the request context for protected routes.

## 📝 Scripts

- `pnpm dev` - Starts the development environment.
- `pnpm build` - Builds the applications and packages for production.
- `pnpm lint` - Runs ESLint across the workspace.
