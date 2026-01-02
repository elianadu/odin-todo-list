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