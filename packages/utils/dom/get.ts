export const getViewPort = () => {
  const d = document;
  const w = window;
  const b = d.body;

  return {
    width: w.innerWidth || document.documentElement.clientWidth || b.clientWidth,
    height: w.innerHeight || document.documentElement.clientWidth || b.clientHeight,
  };
};
