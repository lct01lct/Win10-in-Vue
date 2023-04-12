const d = document;
const w = window;
const b = d.body;

export const getViewPort = () => {
  return {
    width: b.clientWidth,
    height: b.clientHeight,
  };
};
