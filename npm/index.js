// src/core/index.ts
function createSetterFn(set, key) {
  function setterFn(newState) {
    set((oldState) => ({
      ...oldState,
      [key]: typeof newState === "function" ? newState(oldState[key]) : newState
    }));
  }
  return setterFn;
}
export {
  createSetterFn
};
//# sourceMappingURL=index.js.map