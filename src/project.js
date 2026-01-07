import { Todo } from "./todo.js";

export const projectArr = [];

export class Project {
  constructor(title, description) {
    this._title = title;
    this._description = description;
    this.id = crypto.randomUUID();
    this._todoArr = [];
  }

  get todoArr() {
    return this._todoArr;
  }

  setProperties(title, description) {
    this._title = title;
    this._description = description;
  }

  properties() {
    return {
      title: this._title,
      description: this._description,
    };
  }
}

export const addProject = (proj) => {
    projectArr.push(proj);
  }

export const removeProject = (id) =>{
    const index = projectArr.findIndex((proj) => proj.id === id);
    if (index > -1) {
      projectArr.splice(index, 1);
    }
  }

// Save projects to localStorage
export const saveToLocalStorage = () => {
  const projectsData = projectArr.map(proj => ({
    id: proj.id,
    title: proj._title,
    description: proj._description,
    todos: proj.todoArr.map(todo => ({
      id: todo.id,
      title: todo._title,
      description: todo._description,
      dueDate: todo._dueDate,
      priority: todo._priority
    }))
  }));
  localStorage.setItem('projects', JSON.stringify(projectsData));
};

// Load projects from localStorage
export const loadFromLocalStorage = () => {
  const data = localStorage.getItem('projects');
  if (!data) return; // No data saved yet
  
  const projectsData = JSON.parse(data);
  
  // Clear current array
  projectArr.length = 0;
  
  // Recreate Project and Todo objects with their methods
  projectsData.forEach(projData => {
    const proj = new Project(projData.title, projData.description);
    proj.id = projData.id; // Restore original ID
    
    projData.todos.forEach(todoData => {
      const todo = new Todo(
        proj,
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      todo.id = todoData.id; // Restore original ID
      proj.todoArr.push(todo);
    });
    
    projectArr.push(proj);
  });
};