"use strict";
const list = document.getElementById("list");
const addItem = document.querySelector(".add-item");
class Todo {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
    this.id = Date.now();
    this.isDone = false;
  }
}

class DOM {
  constructor() {
    
    addItem.addEventListener("submit", app.addToDo.bind(app));

    
    list.addEventListener("click", this.updateList.bind(this));

  
  }

  getUserInput(form) {
    const text = form.querySelector("#user-input").value;
    const priority = form.querySelector(".priority").value;

    return [text, priority];
  }

  renderListElement(activity) {
    const markup = `
      <li data-id="${activity.id}" class="todo-item ${activity.priority} ${
      activity.isDone ? "done" : ""
    }">
        <span>${activity.title}</span>
        <div class="edit">
          <button class="btn btn-delete"><i class="fas fa-trash-alt"></i></button>
        </div>
      </li>`;

    list.insertAdjacentHTML("afterbegin", markup);
  }

  updateList(e) {
    if (e.target.classList.contains("todo-item")) {
      
      e.target.classList.toggle("done");

      const task = app.toDoList.find(
        (todo) => todo.id === +e.target.dataset.id
      );

      task.isDone = !task.isDone;

      storage.setLocalStorage();
    }

    if (e.target.classList.contains("btn-delete")) {
      
      const itemID = +e.target.closest(".todo-item").dataset.id;
      
      e.target.closest(".todo-item").classList.toggle("delete");
      
      app.removeToDo(itemID);
    }
  }

}

class App {
  constructor() {
    this.toDoList = [];
  }

  addToDo(e) {
    e.preventDefault();

    const [text, priority] = dom.getUserInput(e.target);

    const todo = new Todo(text, priority);

    this.toDoList.push(todo);

    dom.renderListElement(todo);

    e.target.reset();

    storage.setLocalStorage();
  }

  removeToDo(id) {
    const index = this.toDoList.findIndex((item) => item.id == id);

    this.toDoList.splice(index, 1);

    storage.setLocalStorage();
  }

  emptyList() {
    app.toDoList.length = 0;
  }
}

class Storage {
  constructor() {
    this.getLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(app.toDoList));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todo-list"));

    if (!data) return;

    app.toDoList = data;
    app.toDoList.forEach((item) => dom.renderListElement(item));
  }

  clearStorage() {
    localStorage.removeItem("todo-list");
  }
}

const app = new App();
const dom = new DOM();
const storage = new Storage();
