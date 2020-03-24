export default {
  current: {
    board: JSON.parse(localStorage.getItem("board")) || "",
    column: JSON.parse(localStorage.getItem("column")) || "",
    task: JSON.parse(localStorage.getItem("task")) || "",
  },
  list: {
    board: JSON.parse(localStorage.getItem("board-list")) || [],
    column: JSON.parse(localStorage.getItem("column-list")) || [],
    task: JSON.parse(localStorage.getItem("task-list")) || [],
  },
};
