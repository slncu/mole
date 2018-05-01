export const merge = (newList, oldList, key) =>
  Object.values([...oldList, ...newList].reduce((a, b) => {
    a[b[key]] = b;
    return a;
  }, {}));