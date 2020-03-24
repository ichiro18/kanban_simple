export default {
  current: (state) => state.current,
  isAuth: (state) => !!state.current.name,
};
