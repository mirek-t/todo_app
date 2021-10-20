import {
  inputRef,
  filterBtnRef,
  allTasksRef,
  counterRef,
  taskCloneRef,
} from "./refs.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";
import getNextId from "./helpers.js";
import { addFiltersListener } from "./filters.js";

const state = [];

const createHTMLTask = (task) => {
  const taskClone = taskCloneRef.cloneNode(true);

  const taskStatus = taskClone.querySelector(".task__status");
  const taskTitle = taskClone.querySelector(".task__title");
  const taskRemove = taskClone.querySelector(".task__removeIcon");

  if (task.status === false) {
    taskStatus.classList.add("task__status--completed");
  }

  taskStatus.addEventListener("click", () => changeStatus(task.id, state));
  taskRemove.addEventListener("click", () => removeTask(task.id, state));

  taskTitle.innerText = task.title;

  taskClone.classList.remove("hidden");
  taskClone.classList.remove("clone");

  return taskClone;
};

const reloadAllTasks = (tasks, commit = true) => {
  allTasksRef.querySelectorAll(".task").forEach((t) => t.remove());

  calculateLeftItems(state);
  tasks.forEach((task) => {
    const html = createHTMLTask(task);
    allTasksRef.appendChild(html);
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
  counterRef.innerText = `${notCompleted.length} items left`;
}

inputRef.addEventListener("keyup", (evt) => {
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
});

loadFromLocalStorage(state);
reloadAllTasks(state);
addFiltersListener(state, reloadAllTasks);
