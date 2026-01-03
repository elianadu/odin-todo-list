import { removeTodo } from "./todo.js";
import { projectArr, removeProject } from "./project.js";

export let currentProject = null;
export let isTodoEditMode = false;
export let todoToBeEdited = null;

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
        removeTodo(currentProject, todo.id);
        displayAllTodos();
      });
      todoCard.append(removeTodoBtn);

      const editTodoBtn = document.createElement("button");
      editTodoBtn.textContent = "Edit todo";
      editTodoBtn.classList.add("edit-todo-btn");
      editTodoBtn.addEventListener("click", () => {
        newTodoDialog.showModal();
        isTodoEditMode = true;
        todoToBeEdited = todo;
        document.querySelector("#todo-title").value =
          todoToBeEdited.properties().title;
        document.querySelector("#todo-desc").value =
          todoToBeEdited.properties().description;
        document.querySelector("#dueDate").value =
          todoToBeEdited.properties().dueDate;
        document.querySelector("#priority").value =
          todoToBeEdited.properties().priority;
      });
      todoCard.append(editTodoBtn);
    };
    appendItemsToTodoCard(todo);
    todoContainer.append(todoCard);
  };
  if (currentProject) {
    for (let todo of currentProject.todoArr) {
      displayTodo(todo);
    }
  }

  const getCurrentProject = () => {
    return currentProject;
  }
  const getIsTodoEditMode = () => {
    return isTodoEditMode;
  }

  const setTodoEditMode = (state) => {
    isTodoEditMode = state;
  }

  const todoToBeEdited = () => {
    return todoToBeEdited;
  }

  return {
    getCurrentProject: getCurrentProject,
    getIsTodoEditMode: getIsTodoEditMode,
    setTodoEditMode: setTodoEditMode,
    todoToBeEdited: todoToBeEdited,
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
    if (currentProject && proj.id === currentProject.id) {
      projectCard.classList.add("selected-project");
    } else {
      projectCard.addEventListener("click", () => {
        currentProject = proj;
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
