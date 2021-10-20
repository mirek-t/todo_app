const getNextId = (data) => {
  if (data.length === 0) {
    return 1;
  }

  return data[data.length - 1].id + 1;
};

export default getNextId;
