import { removeTodo } from "./todo.js";
import { projectArr, removeProject } from "./project.js";

// Module-level state
let currentProject = null;
let isTodoEditMode = false;
let todoToBeEdited = null;

// State getters and setters
export const getCurrentProject = () => currentProject;
export const setCurrentProject = (proj) => { currentProject = proj; };
export const getIsTodoEditMode = () => isTodoEditMode;
export const setTodoEditMode = (state) => { isTodoEditMode = state; };
export const getTodoToBeEdited = () => todoToBeEdited;
export const setTodoToBeEdited = (todo) => { todoToBeEdited = todo; };

export const displayAllTodos = () => {
  const todoContainer = document.querySelector(".todo-container");
  const newTodoDialog = document.querySelector(".new-todo-dialog");

  while (
    todoContainer.hasChildNodes() &&
    todoContainer.firstChild.nodeName !== "BUTTON"
  ) {
    todoContainer.removeChild(todoContainer.firstChild);
  }

  const displayTodo = (todo) => {
    let todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    const appendItemsToTodoCard = (todo) => {
      for (let property in todo) {
        if (todo.hasOwnProperty(property) && property !== "id" && property !== "_parentProj") {
          let div = document.createElement("div");
          div.textContent = todo[property];
          todoCard.append(div);
        }
      }

      const removeTodoBtn = document.createElement("button");
      removeTodoBtn.textContent = "Remove todo";
      removeTodoBtn.classList.add("remove-todo-btn");
      removeTodoBtn.addEventListener("click", () => {
        removeTodo(getCurrentProject(), todo.id);
        displayAllTodos();
      });
      todoCard.append(removeTodoBtn);

      const editTodoBtn = document.createElement("button");
      editTodoBtn.textContent = "Edit todo";
      editTodoBtn.classList.add("edit-todo-btn");
      editTodoBtn.addEventListener("click", () => {
        newTodoDialog.showModal();
        setTodoEditMode(true);
        setTodoToBeEdited(todo);
        document.querySelector("#todo-title").value = todoToBeEdited.properties().title;
        document.querySelector("#todo-desc").value = todoToBeEdited.properties().description;
        document.querySelector("#dueDate").value = todoToBeEdited.properties().dueDate;
        document.querySelector("#priority").value = todoToBeEdited.properties().priority;
      });
      todoCard.append(editTodoBtn);
    };

    appendItemsToTodoCard(todo);
    todoContainer.append(todoCard);
  };

  if (getCurrentProject()) {
    for (let todo of getCurrentProject().todoArr) {
      displayTodo(todo);
    }
  }
};

export const displayAllProjects = () => {
  const projectContainer = document.querySelector(".project-container");

  while (
    projectContainer.hasChildNodes() &&
    projectContainer.firstChild.nodeName !== "BUTTON"
  ) {
    projectContainer.removeChild(projectContainer.firstChild);
  }

  const displayProject = (proj) => {
    let projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    if (projectCard === document.querySelector(".selected-project")) {
      projectCard.classList.remove("selected-project");
    }
    if (getCurrentProject() && proj.id === getCurrentProject().id) {
      projectCard.classList.add("selected-project");
    } else {
      projectCard.addEventListener("click", () => {
        setCurrentProject(proj);
        displayAllTodos();
        displayAllProjects();
      });
    }

    const appendItemsToProjCard = (proj) => {
      for (let property in proj) {
        if (
          proj.hasOwnProperty(property) &&
          property !== "id" &&
          property !== "_todoArr"
        ) {
          let div = document.createElement("div");
          div.textContent = proj[property];
          projectCard.append(div);
        }
      }

      const removeProjBtn = document.createElement("button");
      removeProjBtn.textContent = "Remove project";
      removeProjBtn.classList.add("remove-proj-btn");
      removeProjBtn.addEventListener("click", () => {
        removeProject(proj.id);
        displayAllProjects();
        displayAllTodos();
      });
      projectCard.append(removeProjBtn);
    };

    appendItemsToProjCard(proj);
    projectContainer.append(projectCard);
  };

  for (let project of projectArr) {
    displayProject(project);
  }
};