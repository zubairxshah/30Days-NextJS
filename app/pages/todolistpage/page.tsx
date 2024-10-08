import React from "react";
import TodoList from "@/app/components/todo-list";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <TodoList />
    </main>
  );
}