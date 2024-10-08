"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dateTime: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  const addTask = (): void => {
    if (newTask.trim() !== "") {
      const now = new Date();
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          dateTime: now.toLocaleString(),
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditingTask = (id: number, text: string): void => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const updateTask = (): void => {
    if (editedTaskText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editedTaskText } : task
        )
      );
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800 dark:to-green-900 p-4 border-rounded-sm">
      <div className="w-full max-w-md bg-white dark:bg-white-800 shadow-sm rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
          Todo List
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <Button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Add
          </Button>
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="w-5 h-5"
                  />
                  {editingTaskId === task.id ? (
                    <Input
                      type="text"
                      value={editedTaskText}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditedTaskText(e.target.value)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          updateTask();
                        }
                      }}
                      className="flex-1 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    />
                  ) : (
                    <span
                      className={`flex-1 text-gray-800 dark:text-gray-200 ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {editingTaskId === task.id ? (
                    <Button
                      onClick={updateTask}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded-md text-sm transition duration-300 ease-in-out"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => startEditingTask(task.id, task.text)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md text-sm transition duration-300 ease-in-out"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md text-sm transition duration-300 ease-in-out"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {task.dateTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
