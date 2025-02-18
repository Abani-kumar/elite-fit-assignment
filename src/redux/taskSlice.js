import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: (() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  })(),
  filter: {
    search: "",
    priority: null,
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filter = {
        search: "",
        priority: null,
      };
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setFilter,
  clearFilters,
} = taskSlice.actions;

export default taskSlice.reducer;
