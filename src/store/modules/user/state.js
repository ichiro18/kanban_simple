import { Structure } from "@project_src/common/const/structures";

export default {
  current: JSON.parse(localStorage.getItem("user")) || { ...Structure.USER },
};
