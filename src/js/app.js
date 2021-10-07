const inputRef = document.querySelector("#task");
const taskCloneRef = document.querySelector(".clone");
const allTaskRef = document.querySelector(".tasks__list");

const changeStatus = (statusRef) => {
  statusRef.classList.toggle("task__status--completed");
};

const removeTask = (task) => {
  task.remove();
};

inputRef.addEventListener("keyup", (evt) => {
  evt.preventDefault();

  if (evt.key === "Enter") {
    console.log(evt.target.value);

    const taskClone = taskCloneRef.cloneNode(true);

    const taskTitle = taskClone.querySelector(".task__title");
    taskTitle.innerText = evt.target.value;

    const taskStatus = taskClone.querySelector(".task__status");
    taskStatus.addEventListener("click", () => changeStatus(taskStatus));

    const taskRemove = taskClone.querySelector(".task__removeIcon");
    taskRemove.addEventListener("click", () => removeTask(taskClone));

    allTaskRef.appendChild(taskClone);
    taskClone.classList.remove("hidden");
    taskClone.classList.remove("clone");

    evt.target.value = "";
  }
});

const activeBtn = document.querySelector("#activeTasks");
activeBtn.addEventListener("click", () => showOnlyActive());

const showOnlyActive = () => {
  showAll();
  const completedTasks = allTaskRef.querySelectorAll(
    ".task__status--completed"
  );
  completedTasks.forEach((task) => {
    task.parentElement.classList.add("hidden");
  });
};

const allBtn = document.querySelector("#allTasks");
allBtn.addEventListener("click", () => {
  showAll();
});

const showAll = () => {
  const allTasks = allTaskRef.querySelectorAll(".tasks__item");
  allTasks.forEach((task) => {
    task.classList.remove("hidden");
  });
};

const completedBtn = document.querySelector("#completedTasks");
completedBtn.addEventListener("click", () => showOnlyCompleted());

const showOnlyCompleted = () => {
  showAll();
  const notCompleted = allTaskRef.querySelectorAll(
    ".task__status:not(.task__status--completed)"
  );
  notCompleted.forEach((task) => {
    task.parentElement.classList.add("hidden");
  });
};
