# Task Management Application

A modern, responsive task management application built with React, Redux, and Tailwind CSS. The application offers a clean interface for managing daily tasks with features like priority setting, due dates, and task filtering.

## Features

### Core Functionality
- **Task Creation & Management**
  - Create new tasks with title, description, due date, time, and priority
  - Edit existing tasks
  - Delete tasks
  - Mark tasks as completed
  - Set priority levels (High, Medium, Low)

### User Interface
- **Dashboard View**
  - Upcoming tasks section
  - Overdue tasks section
  - Completed tasks section
  - Priority-based task categorization

### Search & Filter
- Real-time task search functionality
- Filter tasks by:
  - Priority level
  - Completion status

### Data Persistence
- Local storage integration for persistent task data
- Automatic state saving

## Tech Stack

- **Frontend Framework**: React + Vite
- **State Management**: Redux
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abani-kumar/elite-fit-assignment.git
cd elite-fit-assignment
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

### Environment Variables
No environment variables are required as the application uses local storage.


## Usage

1. **Creating a Task**
   - Click the "Add Task" button
   - Fill in the task details (title, description, due date, priority)
   - Click "Save" to create the task

2. **Editing Tasks**
   - Click any task to edit it
   - Modify the task details
   - Save changes

3. **Managing Tasks**
   - Mark tasks as complete using the tick mark
   - Delete tasks using the delete icon
   - Filter tasks using the priority dropdown
   - Search tasks using the search bar

