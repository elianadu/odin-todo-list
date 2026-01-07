import { removeTodo } from "./todo.js";
import { projectArr, removeProject } from "./project.js";
import { format, parseISO } from "date-fns";

// Module-level state
let currentProject = null;
let isTodoEditMode = false;
let todoToBeEdited = null;

let isProjEditMode = false;
let projToBeEdited = null;

// State getters and setters
export const getCurrentProject = () => currentProject;
export const setCurrentProject = (proj) => {
  currentProject = proj;
};
export const getIsTodoEditMode = () => isTodoEditMode;
export const setTodoEditMode = (state) => {
  isTodoEditMode = state;
};
export const getTodoToBeEdited = () => todoToBeEdited;
export const setTodoToBeEdited = (todo) => {
  todoToBeEdited = todo;
};

export const getIsProjEditMode = () => isProjEditMode;
export const setProjEditMode = (state) => {
  isProjEditMode = state;
};
export const getProjToBeEdited = () => projToBeEdited;
export const setProjToBeEdited = (todo) => {
  projToBeEdited = todo;
};

export const displayAllTodos = () => {
  const todoContainer = document.querySelector(".todo-container");
  const newTodoDialog = document.querySelector(".new-todo-dialog");
  const newTodoBtn = document.querySelector(".new-todo-btn");

  if (!currentProject && projectArr.length > 0) {
    currentProject = projectArr[0];
  } else if (!currentProject) {
    newTodoBtn.classList.add("hidden");
  }
  if (currentProject && newTodoBtn.classList.contains("hidden")) {
    newTodoBtn.classList.remove("hidden");
  }

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
      let contentDiv = document.createElement("div");
      contentDiv.classList.add("content-div");

      let titleDiv = document.createElement("div");
      titleDiv.textContent = todo.properties().title;
      contentDiv.append(titleDiv);

      let dueDateDiv = document.createElement("div");
      const dateString = todo.properties().dueDate;
      if (dateString) {
        let date = parseISO(dateString);
        dueDateDiv.textContent = format(date, "MMM dd, yyyy");
      } else {
        dueDateDiv.textContent = "";
      }

      contentDiv.append(dueDateDiv);
      todoCard.append(contentDiv);

      todoCard.classList.add(`priority-${todo.properties().priority}`);

      let btnDiv = document.createElement("div");
      btnDiv.classList.add("button-div");

      const removeTodoBtn = document.createElement("button");
      const removeTodoIcon = document.createElement("span");
      removeTodoIcon.className = "material-symbols-outlined";
      removeTodoIcon.textContent = "delete";
      removeTodoBtn.append(removeTodoIcon);
      removeTodoBtn.classList.add("remove-todo-btn");
      removeTodoBtn.classList.add("icon");
      removeTodoBtn.addEventListener("click", () => {
        removeTodo(getCurrentProject(), todo.id);
        displayAllTodos();
      });
      btnDiv.append(removeTodoBtn);

      const editTodoBtn = document.createElement("button");
      const editTodoIcon = document.createElement("span");
      editTodoIcon.className = "material-symbols-outlined";
      editTodoIcon.textContent = "edit";
      editTodoBtn.append(editTodoIcon);
      editTodoBtn.classList.add("edit-todo-btn");
      editTodoBtn.classList.add("icon");
      editTodoBtn.addEventListener("click", () => {
        newTodoDialog.showModal();
        setTodoEditMode(true);
        setTodoToBeEdited(todo);
        document.querySelector("#todo-title").value =
          todoToBeEdited.properties().title;
        document.querySelector("#todo-desc").value =
          todoToBeEdited.properties().description;
        document.querySelector("#dueDate").value =
          todoToBeEdited.properties().dueDate;
        document.querySelector("#priority").value =
          todoToBeEdited.properties().priority;
      });
      btnDiv.append(editTodoBtn);
      todoCard.append(btnDiv);
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
  const newProjDialog = document.querySelector(".new-proj-dialog");

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
      projectCard.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") {
          setCurrentProject(proj);
        }
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

      let btnDiv = document.createElement("div");
      btnDiv.classList.add("button-div");

      const removeProjBtn = document.createElement("button");
      const removeProjIcon = document.createElement("span");
      removeProjIcon.className = "material-symbols-outlined";
      removeProjIcon.textContent = "delete";
      removeProjBtn.append(removeProjIcon);
      removeProjBtn.classList.add("remove-proj-btn");
      removeProjBtn.classList.add("icon");
      removeProjBtn.addEventListener("click", () => {
        if (proj.id === currentProject.id) {
          const index = projectArr.findIndex((p) => p.id === proj.id);
          removeProject(proj.id);
          if (projectArr.length === 0) {
            setCurrentProject(null);
            /* } else if (index === 0) {
            currentProject = projectArr[index]; */
          } else {
            setCurrentProject(projectArr[0]);
          }
        } else {
          removeProject(proj.id);
        }
        displayAllProjects();
        displayAllTodos();
      });
      btnDiv.append(removeProjBtn);

      const editProjBtn = document.createElement("button");
      const editProjIcon = document.createElement("span");
      editProjIcon.className = "material-symbols-outlined";
      editProjIcon.textContent = "edit";
      editProjBtn.append(editProjIcon);
      editProjBtn.classList.add("edit-proj-btn");
      editProjBtn.classList.add("icon");
      editProjBtn.addEventListener("click", () => {
        newProjDialog.showModal();
        setProjEditMode(true);
        setProjToBeEdited(proj);
        document.querySelector("#proj-title").value =
          projToBeEdited.properties().title;
        document.querySelector("#proj-desc").value =
          projToBeEdited.properties().description;
      });
      btnDiv.append(editProjBtn);
      projectCard.append(btnDiv);
    };

    appendItemsToProjCard(proj);
    projectContainer.append(projectCard);
  };

  for (let project of projectArr) {
    displayProject(project);
  }
};
