import { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const tasks = useSelector((state) => state.task.tasks);
  const filter = useSelector((state) => state.task.filter);
  //console.log("task ", tasks);

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      !filter.priority || task.priority === filter.priority;
    const matchesSearch =
      !filter.search ||
      task.title.toLowerCase().includes(filter.search.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const sections = [
    {
      title: "Upcoming Tasks",
      tasks: filteredTasks.filter(
        (task) => !task.completed && new Date(task.dueDate) > new Date()
      ),
      className: "border-blue-500",
    },
    {
      title: "Overdue Tasks",
      tasks: filteredTasks.filter(
        (task) => !task.completed && new Date(task.dueDate) < new Date()
      ),
      className: "border-red-500",
    },
    {
      title: "Completed Tasks",
      tasks: filteredTasks.filter((task) => task.completed),
      className: "border-green-500",
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <SearchBar />
          <Button
            onClick={() => setIsAddingTask(true)}
            className="whitespace-nowrap"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(({ title, tasks, className }) => (
          <Card key={title} className={`p-4 border-t-4 ${className}`}>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {Array.isArray(tasks) ? (
              <TaskList tasks={tasks} />
            ) : (
              <div>No tasks available</div>
            )}
          </Card>
        ))}
      </div>

      <TaskForm open={isAddingTask} onOpenChange={setIsAddingTask} />
    </div>
  );
}
