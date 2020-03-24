export class Structure {
  static get USER() {
    return {
      name: "",
      birthday: "",
      post: "",
    };
  }

  static get BOARD() {
    return {
      id: "",
      name: "",
      columns: [],
    };
  }

  static get COLUMN() {
    return {
      id: "",
      name: "",
      tasks: [],
    };
  }
}
