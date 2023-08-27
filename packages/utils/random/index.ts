export const getRandomId = () => {
  return 'id-' + window.performance.now().toString().replace('.', '');
};
