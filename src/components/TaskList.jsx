import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "@/redux/taskSlice";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import TaskForm from "./TaskForm"; 

const priorityColors = {
  HIGH: "text-red-500",
  MEDIUM: "text-yellow-500",
  LOW: "text-green-500",
};

export default function TaskList({ tasks }) {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!Array.isArray(tasks)) {
    return <div>No tasks available</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm
                     border border-gray-200 dark:border-gray-700 cursor-pointer
                     hover:border-blue-500 transition-colors"
          onClick={() => handleTaskClick(task)}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {format(new Date(task.dueDate), "PPp")}
              </div>
              <span
                className={`text-sm font-medium ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); 
                  dispatch(toggleTask(task.id));
                }}
              >
                {task.completed ? (
                  <XCircle className="h-4 w-4 text-red-500" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening
                  dispatch(deleteTask(task.id));
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Task Modal */}
      <TaskForm
        task={selectedTask}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </div>
  );
}
