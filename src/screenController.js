import { removeTodo } from "./todo.js";
import { projectArr, removeProject } from "./project.js";

export const displayAllTodos = (parentProj) => {
  const todoContainer = document.querySelector(".todo-container");

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
        if (todo.hasOwnProperty(property) && property !== "id") {
          let div = document.createElement("div");
          div.textContent = todo[property];
          todoCard.append(div);
        }
      }
      const removeTodoBtn = document.createElement("button");
      removeTodoBtn.textContent = "Remove todo";
      removeTodoBtn.classList.add("remove-todo-btn");
      removeTodoBtn.addEventListener("click", () => {
        removeTodo(todo.id);
        displayAllTodos();
      });
      todoCard.append(removeTodoBtn);
    };
    appendItemsToTodoCard(todo);
    todoContainer.append(todoCard);
  };
  if (parentProj) {
    for (let todo of parentProj.todoArr) {
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

    const appendItemsToProjCard = (proj) => {
      let titleDiv = document.createElement("div");
      titleDiv.textContent = proj.title;
      projectCard.append(titleDiv);

      let descDiv = document.createElement("div");
      descDiv.textContent = proj.description;
      projectCard.append(descDiv);

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
    console.log(project);
    displayProject(project);
  }
};
