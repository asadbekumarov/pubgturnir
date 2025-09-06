# PUBG Tournament - Project Structure Documentation

## Overview

This document outlines the improved project structure for the PUBG Tournament website. The project has been reorganized to follow modern React/TypeScript best practices with clear separation of concerns.

## New Project Structure

```
src/
├── components/                 # React components organized by purpose
│   ├── layout/               # Layout components (Header, Footer)
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/             # Page sections (Hero, Achievements, etc.)
│   │   ├── Hero.tsx
│   │   ├── Achievements.tsx
│   │   ├── Tournament.tsx
│   │   ├── Teams.tsx
│   │   └── Schedule.tsx
│   └── index.ts              # Component exports
├── hooks/                    # Custom React hooks
│   ├── useScroll.ts
│   ├── useElementSize.ts
│   ├── useMobileMenu.ts
│   └── index.ts
├── types/                    # TypeScript type definitions
│   └── index.ts
├── constants/                # Application constants
│   └── index.ts
├── utils/                    # Utility functions
│   └── index.ts
├── data/                     # Static data and mock data
│   └── index.ts
├── assets/                   # Static assets
│   └── img/
│       └── HeroBG.avif
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles
```

## Key Improvements

### 1. **Organized Component Structure**

- **Layout Components**: Header and Footer in `components/layout/`
- **Section Components**: All page sections in `components/sections/`
- **Barrel Exports**: Clean imports via `components/index.ts`

### 2. **Custom Hooks**

- `useScroll`: Manages scroll state
- `useElementSize`: Tracks element dimensions
- `useMobileMenu`: Handles mobile menu state

### 3. **Type Safety**

- Centralized type definitions in `types/index.ts`
- Shared interfaces for components, data, and API responses
- Proper TypeScript support throughout

### 4. **Constants Management**

- All constants moved to `constants/index.ts`
- Color schemes, breakpoints, and configuration values
- Easy to maintain and update

### 5. **Utility Functions**

- Reusable utility functions in `utils/index.ts`
- Animation helpers, formatting functions, and common operations
- DRY principle implementation

### 6. **Data Management**

- Static data separated into `data/index.ts`
- Mock data for development and testing
- Easy to replace with API calls later

## Benefits of New Structure

### **Maintainability**

- Clear separation of concerns
- Easy to locate and modify specific functionality
- Reduced code duplication

### **Scalability**

- Easy to add new components, hooks, or utilities
- Consistent patterns for new features
- Modular architecture supports growth

### **Developer Experience**

- IntelliSense support with proper TypeScript types
- Clean import statements
- Self-documenting code structure

### **Performance**

- Tree-shaking friendly exports
- Optimized bundle splitting potential
- Reusable hooks reduce re-renders

## Usage Examples

### Importing Components

```typescript
// Clean barrel imports
import { Header, Footer, Hero, Achievements } from "./components";

// Or specific imports
import { Header } from "./components/layout/Header";
```

### Using Custom Hooks

```typescript
import { useScroll, useMobileMenu } from "./hooks";

const MyComponent = () => {
  const isScrolled = useScroll();
  const { isOpen, toggle } = useMobileMenu();
  // ...
};
```

### Accessing Constants

```typescript
import { colors, breakpoints, navigationLinks } from "./constants";
```

### Using Utilities

```typescript
import { getAnimationDelay, formatNumber, cn } from "./utils";
```

## Migration Notes

### **What Changed**

1. Components moved to organized subdirectories
2. Shared logic extracted to custom hooks
3. Types centralized and properly defined
4. Constants and utilities separated
5. Data moved to dedicated files

### **What Stayed the Same**

1. All functionality preserved
2. Styling and UI unchanged
3. Component behavior identical
4. Build process unaffected

## Future Enhancements

### **Potential Additions**

1. **Services Layer**: API calls and data fetching
2. **Context Providers**: Global state management
3. **Error Boundaries**: Error handling components
4. **Testing**: Unit and integration tests
5. **Storybook**: Component documentation
6. **i18n**: Internationalization support

### **Performance Optimizations**

1. **Code Splitting**: Route-based lazy loading
2. **Memoization**: React.memo and useMemo usage
3. **Virtual Scrolling**: For large lists
4. **Image Optimization**: Next.js Image component

## Best Practices Implemented

1. **Single Responsibility**: Each file has one clear purpose
2. **DRY Principle**: No code duplication
3. **Type Safety**: Full TypeScript coverage
4. **Consistent Naming**: Clear, descriptive names
5. **Modular Design**: Loosely coupled, highly cohesive
6. **Clean Imports**: Barrel exports for better DX

This structure provides a solid foundation for the PUBG Tournament website and can easily accommodate future growth and feature additions.
