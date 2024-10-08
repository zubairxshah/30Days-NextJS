import React from "react";
import ExpenseTracker from "@/app/components/expense-tracker";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ExpenseTracker />
    </div>
  );
}