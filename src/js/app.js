import {
  inputRef,
  filterBtnRef,
  allTasksRef,
  counterRef,
  taskCloneRef,
} from "./refs.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";
import getNextId from "./helpers.js";
import {
  addFiltersListener,
  filterTasks,
  removeFilterActive,
} from "./filters.js";
import { createTag } from "./generateHTML.js";

const state = [];

const reloadAllTasks = (tasks, commit = true) => {
  document.querySelectorAll(".task").forEach((t) => t.remove());
  // calculateLeftItems(state);
  tasks.forEach((task) => {
    const html = createTask(task);
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
  counterRef.innerText = `${notCompleted.length} items left`;
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

function createTask({ title, status, id }) {
  const li = createTag({
    tagName: "li",
    clsName: ["tasks__item", "task"],
  });

  const statusTag = createTag({
    tagName: "span",
    clsName: status
      ? ["task__status"]
      : ["task__status", "task__status--completed"],
    evt: { type: "click", cb: () => changeStatus(id, state) },
  });

  li.appendChild(statusTag);

  const titleTag = createTag({
    tagName: "span",
    clsName: ["task__title"],
    text: title,
  });

  li.appendChild(titleTag);

  const removeTag = createTag({
    tagName: "span",
    clsName: ["task__removeIcon"],
    evt: { type: "click", cb: () => removeTask(id, state) },
  });

  li.appendChild(removeTag);

  return li;
}

const createFilterNav = () => {
  const nav = createTag({
    tagName: "nav",
    clsName: ["tasks__filter", "filter"],
  });

  const counter = createTag({
    tagName: "span",
    clsName: ["filter__counter"],
    idName: "counterTasks",
  });

  nav.appendChild(counter);

  ["all", "active", "completed"].forEach((item, id) => {
    nav.appendChild(
      createTag({
        tagName: "a",
        clsName:
          id === 0 ? ["filter__btn", "filter__btn--active"] : ["filter__btn"],
        idName: `${item}Tasks`,
        text: item,
        evt: {
          type: "click",
          cb: (evt) => filterTasks(evt, state, reloadAllTasks),
        },
      })
    );
  });

  return nav;
};

const createInterface = () => {
  const wrapper = createTag({
    clsName: ["tasks"],
  });

  const label = createTag({
    tagName: "label",
    clsName: ["tasks__lbl"],
    attrs: [{ name: "for", value: "task" }],
    text: "Todos",
  });

  wrapper.appendChild(label);
  const input = createTag({
    tagName: "input",
    clsName: ["tasks__input"],
    idName: "task",
    attrs: [{ name: "type", value: "text" }],
    evt: { type: "keyup", cb: handleInput },
  });

  wrapper.appendChild(input);

  const list = createTag({
    tagName: "ul",
    clsName: ["tasks__list"],
  });

  state.forEach((task) => {
    list.appendChild(createTask(task));
  });

  wrapper.appendChild(list);
  wrapper.appendChild(createFilterNav());

  return wrapper;
};

document.body.appendChild(createInterface());
