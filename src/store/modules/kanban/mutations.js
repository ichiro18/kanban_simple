export default {
  createBoard(state, payload) {
    state.list.board.push(payload);
  },
  selectBoard(state, payload) {
    state.current.board = payload;
  },
};
