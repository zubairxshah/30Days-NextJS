import React from "react";
import PomodoroTimer from "@/app/components/pomodoro-timer-";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PomodoroTimer />
    </div>
  );
}