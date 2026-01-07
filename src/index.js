import "./styles.css";
import { Todo, addTodo } from "./todo.js";
import { Project, addProject } from "./project.js";
import { displayAllTodos, displayAllProjects } from "./screenController.js";
import {
  getCurrentProject,
  setCurrentProject,
  getIsTodoEditMode,
  setTodoEditMode,
  getTodoToBeEdited,
  setTodoToBeEdited,
} from "./screenController.js";
import {
  getIsProjEditMode,
  setProjEditMode,
  getProjToBeEdited,
  setProjToBeEdited,
} from "./screenController.js";

let myProject1 = new Project("Demo Project", "Project description");
let myTodo01 = new Todo(myProject1, "Title", "Description", "2026-04-20", 1);
let myTodo02 = new Todo(myProject1, "Title 2", "Description 2", "2026-06-07", 2);
let myTodo03 = new Todo(myProject1, "Title 3", "Description 3", "2026-06-09", 3);


addTodo(myProject1, myTodo01);
addTodo(myProject1, myTodo02);
addTodo(myProject1, myTodo03);
addProject(myProject1);

function ScreenController() {
  // creating new Project
  const newTodoDialog = document.querySelector(".new-todo-dialog");
  const newTodoBtn = document.querySelector(".new-todo-btn");
  const confirmTodoBtn = document.querySelector(".confirm-todo-btn");

  newTodoBtn.addEventListener("click", () => {
    newTodoDialog.showModal();
  });

  const cancelTodoBtn = document.querySelector('.cancel-todo-btn');
  cancelTodoBtn.addEventListener("click", () => {

    document.querySelector("#todo-title").value = "";
    document.querySelector("#todo-desc").value = "";
    document.querySelector("#dueDate").value = "";
    document.querySelector("#priority").value = "";

    setTodoEditMode(false);
    setTodoToBeEdited(null);
  });

  confirmTodoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#todo-title").value;
    const desc = document.querySelector("#todo-desc").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    if (getIsTodoEditMode()) {
      getTodoToBeEdited().setProperties(title, desc, dueDate, priority);
      setTodoEditMode(false);
    } else {
      addTodo(
        getCurrentProject(),
        new Todo(getCurrentProject(), title, desc, dueDate, priority)
      );
    }
    newTodoDialog.close();

    // clear todo form values
    const clearTodoDialog = (() => {
      document.querySelector("#todo-title").value = "";
      document.querySelector("#todo-desc").value = "";
      document.querySelector("#dueDate").value = "";
      document.querySelector("#priority").value = "";
      displayAllTodos();
    })();
  });

  // creating new Project
  const newProjDialog = document.querySelector(".new-proj-dialog");
  const newProjBtn = document.querySelector(".new-project-btn");
  const confirmProjBtn = document.querySelector(".confirm-proj-btn");

  newProjBtn.addEventListener("click", () => {
    newProjDialog.showModal();
  });

  const cancelProjBtn = document.querySelector('.cancel-proj-btn');
  cancelProjBtn.addEventListener("click", () => {
   
    document.querySelector("#proj-title").value = "";
    document.querySelector("#proj-desc").value = "";
    
    setProjEditMode(false);
    setProjToBeEdited(null);
  });

  confirmProjBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#proj-title").value;
    const desc = document.querySelector("#proj-desc").value;

    if (getIsProjEditMode()) {
      getProjToBeEdited().setProperties(title, desc);
      setProjEditMode(false);
    } else {
      let proj = new Project(title, desc);
      addProject(proj);
      setCurrentProject(proj);
    }
    newProjDialog.close();

    // clear todo form values
    const clearProjDialog = (() => {
      document.querySelector("#proj-title").value = "";
      document.querySelector("#proj-desc").value = "";
      displayAllProjects();
      displayAllTodos();
    })();
  });

  displayAllTodos();
  displayAllProjects();
}

ScreenController();
