export class Todo {
  constructor(parentProj, title, description, dueDate, priority) {
    this._parentProj = parentProj;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this.id = crypto.randomUUID();
  }

  properties() {
    return {
      title: this._title,
      description: this._description,
      dueDate: this._dueDate,
      priority: this._priority,
    };
  }
}

export const addTodo = (parentProj, todo) => {
  parentProj.todoArr.push(todo);
};

export const removeTodo = (parentProj, id) => {
    const index = parentProj.todoArr.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todoArr.splice(index, 1);
  }
};