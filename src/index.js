import "./styles.css";
import { Todo, addTodo } from "./todo.js";
import { Project, addProject } from "./project.js";
import { displayAllTodos, displayAllProjects } from "./screenController.js";


let myTodo = new Todo("Title", "Description", "02/17/2025", 1);
let myTodo2 = new Todo("Title2", "Description2", "06/07/2026", 2);
let myProject = new Project("ProjTitle", "ProjDesc");
addTodo(myProject, myTodo);
addTodo(myProject, myTodo2);
addProject(myProject);

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
    addTodo(new Todo(title, desc, dueDate, prority));
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

  displayAllTodos(myProject);
  displayAllProjects();
}

ScreenController();
