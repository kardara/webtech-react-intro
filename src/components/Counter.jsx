import { useState } from "react";
import Button from "./Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((current) => current + 1);
  };

  const handleDecrement = () => {
    setCount((current) => current - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 p-6">
      <section className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-xl font-semibold">Counter Demo</h1>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Current value
        </label>
        <input
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-center text-lg"
          type="number"
          value={count}
          readOnly
        />

        <div className="grid grid-cols-3 gap-2">
          <Button
            title="-1"
            onClick={handleDecrement}
            bgColor="bg-slate-200 hover:bg-slate-300"
          />
          <Button
            title="Reset"
            onClick={handleReset}
            bgColor="bg-amber-200 hover:bg-amber-300"
          />
          <Button
            title="+1"
            onClick={handleIncrement}
            bgColor="bg-emerald-200 hover:bg-emerald-300"
          />
        </div>
      </section>
    </div>
  );
}
