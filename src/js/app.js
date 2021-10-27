import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";
import getNextId from "./helpers.js";
import { createInterface, createTask } from "./generateHTML.js";
import {
  getState,
  add as addToState,
  remove as removeFromState,
  changeStatus as changeStatusState,
  calculateNotCompletedTasks,
} from "./state.js";

export const reloadAllTasks = (tasks = getState(), commit = true) => {
  document.querySelectorAll(".task").forEach((t) => t.remove());
  calculateLeftItems();
  tasks.forEach((task) => {
    const html = createTask(task, changeStatus, removeTask);
    document.querySelector(".tasks__list").appendChild(html);
  });
  if (commit) {
    saveToLocalStorage();
  }
};

const changeStatus = (id) => {
  changeStatusState(id);
  reloadAllTasks();
};

const removeTask = (id) => {
  removeFromState(id);
  reloadAllTasks();
};

function calculateLeftItems() {
  document.querySelector(
    "#counterTasks"
  ).innerText = `${calculateNotCompletedTasks()} items left`;
}

const handleInput = (evt) => {
  evt.preventDefault();

  if (evt.key === "Enter") {
    addToState({
      title: evt.target.value,
      status: true,
      id: getNextId(),
    });

    reloadAllTasks();

    evt.target.value = "";
  }
};

loadFromLocalStorage();

document.body.appendChild(
  createInterface(handleInput, changeStatus, removeTask, reloadAllTasks)
);
