# Todos & Posts Project

## 📋 Features

### ✅ Todos Management

A fully functional Todo application demonstrating client-side state management.

- **Create, Toggle, Delete**: Full CRUD operations for task management.
- **Persistence**: Tasks are automatically saved to `localStorage`, preserving state across reloads.
- **Filtering**: Filter tasks by status (All, Completed, Pending).
- **Responsive Design**: Optimized for all screen sizes.

### 📝 Posts Browser

A data-fetching showcase demonstrating server side state management.

- **Infinite Scrolling**: Seamlessly browse through lists of posts.
- **Caching**: Data is cached and deduplicated using TanStack Query.
- **Post Details**: Expand posts to view comments and author details.
- **Optimized Performance**: Virtualization techniques for high performance.

## 🛠 Tech Stack

Built with a curated selection of modern tools for best-in-class performance and developer experience.

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) - Lightning fast HMR and build bundling
- **Routing**: [React Router v7](https://reactrouter.com/en/main)
- **State Management**:
  - **Client State**: [Redux Toolkit](https://redux-toolkit.js.org/) for complex local state logic.
  - **Server State**: [TanStack Query](https://tanstack.com/query/latest) for async data fetching, caching, and synchronization.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge` for conditional class management.
- **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit and integration testing.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting and Formatting**: [Biome](https://biomejs.dev/) - Fast formatter and linter.

## 🚀 Getting Started

### Prerequisites

This project uses [Bun](https://bun.sh) as the package manager and runtime, but you can also use `npm` or `pnpm` or `yarn`.

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todos-post
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

### Running Locally

Start the development server:

```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Create a production-ready build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## 🧪 Testing

This project uses Jest for unit testing.

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch
```

## 📂 Project Structure

```text
src/
├── app/              # Global app configuration (Redux store)
├── features/         # Feature-based modules
│   ├── todos/        # Todo feature (Slice, UI)
│   └── posts/        # Posts feature (Queries, UI)
├── layout/           # Layout for page
├── routes/           # Route definitions and navigation logic
├── services/         # API service definitions
├── tests/            # Unit tests
└── main.tsx          # Application entry point
```

### Design Decisions

- I chose **Redux Toolkit** for the Todo list because the data is local, synchronous, and benefits from the strict state transitions of Redux. It also demonstrates how to handle complex client-side logic.
- I chose **TanStack Query** for the Posts feature because server state requires handling race conditions, caching, background updates, and loading/error states—problems that Redux is not natively designed to solve efficiently.
