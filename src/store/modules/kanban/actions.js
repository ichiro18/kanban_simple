import { Structure } from "@project_src/common/const/structures";

export default {
  createBoard({ commit, state, dispatch }, payload) {
    return new Promise((resolve) => {
      const board = { ...Structure.BOARD };
      if (payload.name) {
        board.name = payload.name;
      }
      if (payload.columns) {
        board.columns = payload.columns;
      }
      board.id = payload.id;
      commit("createBoard", board);
      localStorage.setItem("board-list", JSON.stringify(state.list.board));

      // * select created
      dispatch("selectBoard", board.id);

      resolve(board);
    });
  },
  selectBoard({ commit, state }, payload) {
    const board = state.list.board.find((item) => item.id === payload);
    if (board) {
      commit("selectBoard", board.id);
      localStorage.setItem("board", JSON.stringify(state.current.board));
    }
  },
};
