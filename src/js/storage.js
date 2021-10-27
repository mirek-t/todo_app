import { add as addToState, getState } from "./state.js";

export const loadFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks !== null) {
    JSON.parse(tasks).forEach((task) => {
      addToState(task);
    });
  }
};

export const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(getState()));
};
