
const storage = {};

const create = (id, data) => {
  storage[id] = data;
};

const read = (id) => {
  return storage[id];
};

const update = (id, data) => {
  if (storage[id]) {
    storage[id] = data;
    return true;
  }
  return false;
};

const remove = (id) => {
  if (storage[id]) {
    delete storage[id];
    return true;
  }
  return false;
};

const getAll = () => {
  return Object.values(storage);
};

module.exports = { create, read, update, remove, getAll };
