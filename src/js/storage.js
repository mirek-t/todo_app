export const loadFromLocalStorage = (state) => {
  const tasks = localStorage.getItem("tasks");
  if (tasks !== null) {
    state.push(...JSON.parse(tasks));
  }
};

export const saveToLocalStorage = (data) => {
  localStorage.setItem("tasks", JSON.stringify(data));
};
