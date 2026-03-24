# React Introduction Notes

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

Example:

```jsx
function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

function App() {
  return <Header title="Welcome to React" />;
}
```

Component Rules:

1. Must return a single parent JSX element.
2. Component names must start with an uppercase letter.
3. Do not try to mutate props or state directly.
4. Component functions must be pure: same inputs always produce same output.

### 7.2 JSX

- Syntax extension to write UI markup inside JavaScript.
- Compiled by tooling (Vite + Babel ecosystem).

Example:

```jsx
function Greeting() {
  const name = "Alice";
  const year = 2026;

  return (
    <div className="greeting">
      <p>Hello, {name}!</p>
      <p>Year: {year}</p>
    </div>
  );
}
```

JSX Rules:

1. Return one parent element (use a Fragment `<></>` if needed).
2. Use `className` instead of `class`.
3. Use `htmlFor` instead of `for` in labels.
4. Use braces `{}` for JavaScript expressions, not strings.
5. Close all tags (self-closing tags like `<img />`).
6. Attribute names are camelCase (onClick, onChange, onSubmit).
7. Boolean attributes can be written as `disabled` or `disabled={true}`.

### 7.3 Props

- Data passed from parent component to child component.
- Read-only in child components.
- Useful for component reuse and configuration.

Example:

```jsx
function StudentCard({ name, course, score }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Course: {course}</p>
      <p>Score: {score}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentCard name="Ali" course="React" score={95} />
      <StudentCard name="Fatima" course="React" score={88} />
    </div>
  );
}
```

Props Rules:

1. Props are read-only; never modify them directly.
2. Props flow from parent to child only (one direction).
3. Any JavaScript value can be passed: strings, numbers, objects, functions, arrays.
4. Use destructuring in function parameters for cleaner code.
5. Use prop validation with PropTypes or TypeScript for type safety.

### 7.4 State

- Internal component data that can change over time.
- Updating state triggers re-render.

Example:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

State Rules:

1. Use `useState` hook to add state to function components.
2. Never modify state directly; always use setter function.
3. Setter function schedules an update, not immediate.
4. Each component instance has its own state.
5. State updates are asynchronous.

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

Example:

```jsx
import { useState } from 'react'

function TodoApp() {
  const [task, setTask] = useState('')
  const [isDone, setIsDone] = useState(false)

  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <label>
        <input
          type="checkbox"
          checked={isDone}
          onChange((e) => setIsDone(e.target.checked)}
        />
        Done?
      </label>
      {isDone && <p>Task completed: {task}</p>}
    </div>
  )
}
```

Functions vs Values with setState:

```jsx
// Direct value
setCount(count + 1);

// Updater function (use when next state depends on previous)
setCount((prevCount) => prevCount + 1);
```

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

Example:

```jsx
import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Run once after component mounts
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/students")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []); // Empty dependency array

  // Run when userId changes
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("User viewed the page");
    }, 3000);

    // Cleanup function (optional)
    return () => clearTimeout(timer);
  }, []); // Runs once

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### 8.3 useRef

Use for values that persist across renders without causing re-renders.

Common uses:

- focusing an input
- storing mutable values (for example interval IDs)

Example:

```jsx
import { useRef } from "react";

function TextInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

// Storing a mutable value
function Stopwatch() {
  const intervalRef = useRef(null);

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      // timer code
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
```

Ref Rules:

1. Refs are mutable; changing `.current` does NOT trigger re-render.
2. Do not overuse refs; prefer state when possible.
3. Refs are useful for uncontrolled components (DOM access).

### 8.4 useMemo and useCallback

- useMemo memoizes a computed value.
- useCallback memoizes a function reference.

Use when performance optimization is needed, especially with expensive calculations or preventing unnecessary child re-renders.

Example (useMemo):

```jsx
import { useMemo, useState } from "react";

function ExpensiveList({ items }) {
  const [count, setCount] = useState(0);

  // Recompute only when items array changes
  const sorted = useMemo(() => {
    console.log("Sorting items...");
    return items.sort((a, b) => a - b);
  }, [items]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ul>
        {sorted.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

Example (useCallback):

```jsx
import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // Callback is stable across renders; prevents child re-render
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // No dependencies

  return <Child onClick={handleClick} />;
}
```

Performance Rules:

1. Start without useMemo/useCallback; add only if profiler shows slowness.
2. useMemo and useCallback have a cost; only use when justified.
3. Always include correct dependency arrays.

### 8.5 Rules of Hooks

1. Call hooks only at the top level of React function components or custom hooks.
2. Do not call hooks inside loops, conditions, or nested functions.
3. Keep call order consistent between renders.

## 9. Events in React

Common handlers:

- onClick
- onChange
- onSubmit
- onFocus, onBlur
- onKeyDown, onKeyUp

Example:

```jsx
import { useState } from "react";

function FormExample() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Submitted:", email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("User pressed Enter");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Event Rules:

1. React events are synthetic; they wrap browser events.
2. Event handler names use camelCase.
3. Handler receives SyntheticEvent; use `e.preventDefault()` or `e.stopPropagation()` when needed.
4. Do not use `return false` in React (use `preventDefault()` instead).
5. Bind functions or use arrow functions if you need `this` context (rarely needed with hooks).

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
