# React Introduction Notes (Share Version)

This README is organized as a classroom presentation handout for an introductory React session.

## 1. Class Context

- Course: Web Technology and Internet
- Student background: backend already completed with Spring Boot
- Today focus: frontend fundamentals with React
- In-class practice: project setup with Vite + Tailwind CSS v4.2

## 2. Learning Outcomes

By the end of class, students should be able to:

1. Explain what React is and where it fits in a full-stack application.
2. Describe React rendering and how Virtual DOM helps performance.
3. Build and compose components with JSX.
4. Explain and use props and state correctly.
5. Understand core hooks and when to use them.
6. Create a React project with Vite.
7. Configure Tailwind CSS v4.2 with Vite.

## 3. What is React?

React is a JavaScript library for building user interfaces.

Key characteristics:

- It focuses on UI (the View layer).
- It is component-based.
- It is declarative: define what UI should look like for a given state.
- It integrates well with REST backends such as Spring Boot.

## 4. Why Learn React?

- Strong industry adoption and job-market relevance.
- Excellent ecosystem, tooling, and community support.
- Promotes reusable UI and maintainable architecture.
- Smooth path from simple projects to production-level applications.

## 5. React + Spring Boot (Architecture View)

- Spring Boot provides APIs, business logic, and data access.
- React consumes API responses and renders interactive UI.
- Communication happens via HTTP and JSON.

Typical flow:

1. User interacts with React UI.
2. React sends a request to Spring Boot endpoint.
3. Spring Boot returns JSON.
4. React updates state and re-renders affected UI.

## 6. React Rendering: What It Is and How It Works

### 6.1 Rendering in React

Rendering means React executes component functions to determine what the UI should look like now.

- React reads state and props.
- React creates a new virtual tree of elements.
- React compares with the previous tree.
- React updates only the necessary parts of the real DOM.

### 6.2 Virtual DOM and Reconciliation

- Virtual DOM is an in-memory representation of the UI.
- Reconciliation is the comparison process between previous and new trees.
- Diffing finds what changed (text, attributes, added/removed elements).
- Commit phase applies only those changes to the browser DOM.

### 6.3 Why This Matters

- Better performance for dynamic UIs.
- Less manual DOM manipulation.
- Predictable mental model: state changes drive UI updates.

## 7. Core Building Blocks

### 7.1 Components

- Reusable UI units.
- Usually written as functions.
- Can be small and composable.

### 7.2 JSX

- Syntax extension to write UI markup inside JavaScript.
- Compiled by tooling (Vite + Babel ecosystem).

Basic JSX rules:

- Return one parent element.
- Use className for CSS classes.
- Use braces {} for JavaScript expressions.

### 7.3 Props

- Data passed from parent component to child component.
- Read-only in child components.
- Useful for component reuse and configuration.

### 7.4 State

- Internal component data that can change over time.
- Updating state triggers re-render.

## 8. Hooks (Detailed Intro)

Hooks are functions that let function components use React features (state, lifecycle-like behavior, refs, memoization).

### 8.1 useState

Use when a component needs local changing data.

- Returns: current value and setter function.
- Setter schedules a re-render.

Common use cases:

- counters
- form inputs
- toggle visibility

### 8.2 useEffect

Use for side effects that are outside pure rendering logic.

Examples:

- API requests
- timers
- subscriptions

Dependency behavior:

- No dependency array: runs after every render.
- Empty dependency array: runs once after initial render.
- With dependencies: runs when listed values change.

### 8.3 useRef

Use for values that persist across renders without causing re-renders.

Common uses:

- focusing an input
- storing mutable values (for example interval IDs)

### 8.4 useMemo and useCallback

- useMemo memoizes a computed value.
- useCallback memoizes a function reference.

Use when performance optimization is needed, especially with expensive calculations or preventing unnecessary child re-renders.

### 8.5 Rules of Hooks

1. Call hooks only at the top level of React function components or custom hooks.
2. Do not call hooks inside loops, conditions, or nested functions.
3. Keep call order consistent between renders.

## 9. Events in React

Common handlers:

- onClick
- onChange
- onSubmit

React event naming uses camelCase, and handlers are functions.

## 10. Hands-On Setup: React Project + Tailwind CSS v4.2 on Vite

Note: the counter app code already exists in this repository, so this section focuses on project and styling setup only.

### Step 1: Create a React project with Vite

```bash
npm create vite@latest react-counter-demo -- --template react
cd react-counter-demo
npm install
npm run dev
```

### Step 2: Install Tailwind CSS v4.2 and Vite plugin

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 3: Configure Vite plugin

Update vite.config.js:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Step 4: Enable Tailwind in global stylesheet

Update src/index.css:

```css
@import "tailwindcss";
```

### Step 5: Verify Tailwind is active

Add temporary utility classes in any component, save, and confirm style updates in the browser.

## 11. Common Beginner Mistakes

- Mutating state directly instead of using setter functions.
- Confusing props with state.
- Calling hooks in conditional blocks.
- Forgetting dependency behavior in useEffect.
- Overusing useMemo and useCallback prematurely.

## 12. Quick Knowledge Check

1. Why is React called declarative?
2. What happens internally after setState or hook setter is called?
3. What is reconciliation?
4. When should useEffect run only once?
5. What does Tailwind plugin do in Vite setup?

## 13. Official Resources

- React Docs: https://react.dev
- React Learn: https://react.dev/learn
- React Reference (Hooks): https://react.dev/reference/react
- Rendering Lists and Reconciliation Concepts: https://react.dev/learn/rendering-lists
- Vite Guide: https://vite.dev/guide
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Tailwind CSS with Vite: https://tailwindcss.com/docs/installation/using-vite
