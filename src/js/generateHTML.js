import { filterTasks } from "./filters.js";

const createTag = ({
  tagName = "div",
  clsName: className,
  idName,
  text,
  attrs,
  evt,
}) => {
  const node = document.createElement(tagName);

  if (text !== undefined) {
    const nodeText = document.createTextNode(text);
    node.appendChild(nodeText);
  }

  if (className !== undefined) {
    className.forEach((cls) => {
      node.classList.add(cls);
    });
  }

  if (idName !== undefined) {
    node.id = idName;
  }

  if (attrs !== undefined) {
    attrs.forEach(({ name, value }) => {
      node.setAttribute(name, value);
    });
  }

  if (evt !== undefined) {
    const { type, cb } = evt;
    node.addEventListener(type, cb);
  }

  return node;
};

export function createTask(
  { title, status, id },
  state,
  changeStatus,
  removeTask
) {
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

const createFilterNav = (state, reloadAllTasks) => {
  const nav = createTag({
    tagName: "nav",
    clsName: ["tasks__filter", "filter"],
  });

  const counter = createTag({
    tagName: "span",
    clsName: ["filter__counter"],
    idName: "counterTasks",
    text: `${state.filter((item) => item.status).length} items left`,
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
          cb: (evt) => filterTasks(evt, state, nav, reloadAllTasks),
        },
      })
    );
  });

  return nav;
};

export const createInterface = (
  state,
  handleInput,
  changeStatus,
  removeTask,
  reloadAllTasks
) => {
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
    list.appendChild(createTask(task, state, changeStatus, removeTask));
  });

  wrapper.appendChild(list);
  wrapper.appendChild(createFilterNav(state, reloadAllTasks));

  return wrapper;
};
