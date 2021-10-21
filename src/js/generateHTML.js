export const createTag = ({
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

// const config = {
//   tagName: "input",
//   clsName: ["asd", "aew", "qwe"],
//   idName: "div", //trailing comma
//   text: "ala ma douna",
//   attrs: [{ name: "type", value: "text" }],
//   evt: {
//     type: "click",
//     cb: () => console.log("it works"),
//   },
// };
