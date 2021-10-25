import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";
import getNextId from "./helpers.js";
import { createInterface, createTask } from "./generateHTML.js";

const state = [];

const reloadAllTasks = (tasks, commit = true) => {
  document.querySelectorAll(".task").forEach((t) => t.remove());
  calculateLeftItems(state);
  tasks.forEach((task) => {
    const html = createTask(task, tasks, changeStatus, removeTask);
    document.querySelector(".tasks__list").appendChild(html);
  });
  if (commit) {
    saveToLocalStorage(tasks);
  }
};

const changeStatus = (id, data) => {
  data.forEach((task) => {
    if (task.id === id) {
      task.status = !task.status;
    }
  });

  reloadAllTasks(data);
};

const removeTask = (id, data) => {
  const task = data.filter((t) => t.id === id)[0];
  const task_id = data.indexOf(task);
  data.splice(task_id, 1);

  reloadAllTasks(data);
};

function calculateLeftItems(data) {
  const notCompleted = data.filter((task) => task.status);
  document.querySelector(
    "#counterTasks"
  ).innerText = `${notCompleted.length} items left`;
}

const handleInput = (evt) => {
  evt.preventDefault();

  if (evt.key === "Enter") {
    state.push({
      title: evt.target.value,
      status: true,
      id: getNextId(state),
    });

    reloadAllTasks(state);

    evt.target.value = "";
  }
};

loadFromLocalStorage(state);

document.body.appendChild(
  createInterface(state, handleInput, changeStatus, removeTask, reloadAllTasks)
);
