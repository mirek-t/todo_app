const removeFilterActive = (navRef) => {
  navRef.querySelectorAll(".filter__btn").forEach((btn) => {
    btn.classList.remove("filter__btn--active");
  });
};

export const filterTasks = (evt, state, navRef, reloadAllTasks) => {
  let tasks = [];
  removeFilterActive(navRef);
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
