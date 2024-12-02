# Link Flow

Preview: [link-flow-beta.vercel.app](https://link-flow-beta.vercel.app/).

Link Flow is a dynamic web application for managing hierarchical link structures with drag-and-drop functionality. 

## Features

- Drag and drop interface for organizing links
- Hierarchical structure support with unlimited nesting
- Add, edit, and delete links
- Add sub-items to existing links
- Real-time updates using Redux state management

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: React 19 (RC)
- **State Management**: Redux Toolkit
- **Drag and Drop**: dnd-kit & dnd-kit-sortable-tree
- **Form Management**: Formik with Yup validation
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development

- `npm run dev` - Starts development server with Turbopack
- `npm run build` - Creates production build
- `npm run start` - Starts production server
- `npm run lint` - Runs ESLint

## Project Structure

```
link-flow/        
├── src/
│   ├── app/          # Next.js app router files
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── assets/       # Project assets
│   ├── components/   # Reusable UI components
│   │   ├── Button/
│   │   ├── ConfirmDialog/
│   │   └── TextInput/
│   ├── constants/    # Constant values
│   ├── providers/    # Context providers
│   ├── redux/        # Redux store setup
│   ├── styles/       # Global styles
│   ├── templates/    # Page templates
│   │   └── HomeTemplate/
│   ├── types/        # TypeScript definitions
│   ├── utils/        # Utility functions
│   └── widgets/      # Complex UI components
│       ├── AddEditForm/
│       ├── GeneralAdd/
│       ├── Link/
│       └── List/
```

## Deployment

The project is deployed on [Vercel](https://vercel.com) and can be accessed at [link-flow-beta.vercel.app](https://link-flow-beta.vercel.app/).