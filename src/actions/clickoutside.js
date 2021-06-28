export const clickOutside = (node, callbackFunction) => {
  function onClick(event) {
    if (!node.contains(event.target)) {
      callbackFunction();
    }
  }

  document.body.addEventListener('click', onClick);

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    },
  };
};
