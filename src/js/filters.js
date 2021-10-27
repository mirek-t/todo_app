import { getCompletedTasks, getNotCompletedTasks, getState } from "./state.js";

const removeFilterActive = (navRef) => {
  navRef.querySelectorAll(".filter__btn").forEach((btn) => {
    btn.classList.remove("filter__btn--active");
  });
};

export const filterTasks = (evt, navRef, reloadAllTasks) => {
  removeFilterActive(navRef);
  evt.target.classList.add("filter__btn--active");

  const state = getState();
  switch (evt.target.id) {
    case "completedTasks":
      reloadAllTasks(getCompletedTasks(), false);
      break;
    case "activeTasks":
      reloadAllTasks(getNotCompletedTasks(), false);

      break;
    default:
      reloadAllTasks(getState(), false);
  }
};
