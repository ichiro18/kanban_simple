<template>
  <the-modal type="content" :on-close-call-back="onCloseCallBack">
    <span class="title" slot="modal__header">Create board</span>
    <form class="form form-sign-up" @submit.prevent="onSubmit">
      <div class="form__field">
        <input
          v-model="board.name"
          type="text"
          class="input-field"
          placeholder="Name"
        />
      </div>
      <div class="form__footer">
        <button type="submit" class="button button--primary">Submit</button>
        <button type="reset" class="button button--danger" @click="reset">
          Cancel
        </button>
      </div>
    </form>
  </the-modal>
</template>

<script>
import TheModal from "@project_src/components/UI/TheModal.vue";
import { Structure } from "@project_src/common/const/structures";

export default {
  name: "TheBoardForm",
  components: {
    TheModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    onCloseCallBack: {
      type: [Function, Object],
      default: undefined,
    },
  },
  data() {
    return {
      board: {
        ...Structure.BOARD,
        id: this.id,
      },
    };
  },
  methods: {
    reset() {
      this.board = {
        ...Structure.BOARD,
        id: this.id,
      };
      this.onCloseCallBack();
    },
    onSubmit() {
      if (this.board.name) {
        this.$store.dispatch("kanban/createBoard", this.board).then(() => {
          this.reset();
        });
      }
    },
  },
};
</script>
