import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "@/redux/taskSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

export default function TaskForm({ task, open, onOpenChange }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "MEDIUM",
  });

  useEffect(() => {
    if (task && open) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
      });
    } else if (!open) {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
      });
    }
  }, [task, open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast("Title is required");
      return;
    }

    if (!formData.dueDate) {
      toast("Due date is required");
      return;
    }

    const taskData = {
      ...formData,
      id: task?.id || Date.now(),
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    try {
      if (task) {
        dispatch(updateTask(taskData));
        toast("Task updated successfully");
      } else {
        dispatch(addTask(taskData));
        toast("Task added successfully");
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding/updating task:", error);
      toast("Error adding/updating task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH">High Priority</SelectItem>
                <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                <SelectItem value="LOW">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            {task ? "Update Task" : "Add Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
