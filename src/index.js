import "./styles.css";
import { Todo, addTodo } from "./todo.js";
import { Project, addProject } from "./project.js";
import {displayAllTodos, displayAllProjects } from "./screenController.js";
import {getCurrentProject, setCurrentProject, getIsTodoEditMode, setTodoEditMode, getTodoToBeEdited, setTodoToBeEdited
} from "./screenController.js";

let myProject1 = new Project("ProjTitle", "ProjDesc");
let myTodo01 = new Todo(myProject1, "Title", "Description", "2025-02-17", 1);
let myTodo02 = new Todo(myProject1, "Title2", "Description2", "06/07/2026", 2);

let myProject2 = new Project("ProjTitle2", "ProjDesc2");
let myTodo11 = new Todo(myProject2, "Title11", "Description11", new Date(2024, 2, 10), 1);
let myTodo12 = new Todo(myProject2, "Title12", "Description12", "06/07/2026", 2);

addTodo(myProject1, myTodo01);
addTodo(myProject1, myTodo02);
addProject(myProject1);

addTodo(myProject2, myTodo11);
addTodo(myProject2, myTodo12);
addProject(myProject2);

function ScreenController() {
  // creating new Project
  const newTodoDialog = document.querySelector(".new-todo-dialog");
  const newTodoBtn = document.querySelector(".new-todo-btn");
  const confirmTodoBtn = document.querySelector(".confirm-todo-btn");


  newTodoBtn.addEventListener("click", () => {
    newTodoDialog.showModal();
  });

  confirmTodoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#todo-title").value;
    const desc = document.querySelector("#todo-desc").value;
    const dueDate = document.querySelector("#dueDate").value;
    const prority = document.querySelector("#priority").value;
    if (getIsTodoEditMode()) {
      getTodoToBeEdited().setProperties(title, desc, dueDate, prority);
      setTodoEditMode(false);
    }
    else {
      addTodo(getCurrentProject(), new Todo(title, desc, dueDate, prority));
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


  confirmProjBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#proj-title").value;
    const desc = document.querySelector("#proj-desc").value;
    addProject(new Project(title, desc));
    newProjDialog.close();

    // clear todo form values
    const clearProjDialog = (() => {
      document.querySelector("#proj-title").value = "";
      document.querySelector("#proj-desc").value = "";
      displayAllProjects();
    })();
  });

  displayAllTodos();
  displayAllProjects();
}

ScreenController();
