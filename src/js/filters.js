import { filterBtnRef } from "./refs.js";

export const removeFilterActive = () => {
  filterBtnRef.forEach((btn) => {
    btn.classList.remove("filter__btn--active");
  });
};

export const filterTasks = (evt, state, reloadAllTasks) => {
  let tasks = [];
  removeFilterActive();
  evt.target.classList.add("filter__btn--active");

  switch (evt.target.id) {
    case "completedTasks":
      tasks = state.filter((task) => !task.status);
      break;
    case "activeTasks":
      tasks = state.filter((task) => task.status);
      break;
    default:
      tasks = state;
  }

  reloadAllTasks(tasks, false);
};

export const addFiltersListener = (state, reloadAllTasks) => {
  filterBtnRef.forEach((fl) => {
    fl.addEventListener("click", (evt) => {
      filterTasks(evt, state, reloadAllTasks);
    });
  });
};
