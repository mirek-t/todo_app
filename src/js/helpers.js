import { getState } from "./state.js";

const getNextId = () => {
  const state = getState();
  if (state.length === 0) {
    return 1;
  }

  return state[state.length - 1].id + 1;
};

export default getNextId;
