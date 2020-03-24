<template>
  <div class="board">
    <div class="board__selector">
      <div class="selector__header">
        <span class="header__title" v-if="board.name" @click="openSelector">{{
          board.name
        }}</span>
        <span class="header__title" v-else @click.self="createBoard">
          <i class="far fa-plus-square board__icon"></i>Create board
        </span>

        <div class="indicator" v-if="list.length" @click="toggleSelector">
          <i class="fas" :class="indicatorClasses"></i>
        </div>
      </div>
      <ul
        class="selector__list"
        v-if="selectorOpen"
        v-click-outside="closeSelector"
      >
        <li
          v-for="(item, key) in list"
          :key="key"
          class="board__item"
          @click="selectBoard(item.id)"
        >
          {{ item.name }}
        </li>
        <li class="board__item" v-if="list.length" @click="createBoard">
          <i class="far fa-plus-square board__icon"></i>Create board
        </li>
      </ul>
    </div>
    <div class="board__content">
      <the-column :columns="board.columns" @updateColumn="updateColumn" />
    </div>
    <the-board-form
      v-if="createModal.show"
      :id="`board_${this.list.length}`"
      :on-close-call-back="createModal.closeCallback"
    />
  </div>
</template>

<script>
import { Structure } from "@project_src/common/const/structures";
import TheBoardForm from "@project_src/components/dialogs/TheBoardForm.vue";
import TheColumn from "@project_src/components/todo/TheColumn.vue";

export default {
  name: "TheBoard",
  components: {
    TheColumn,
    TheBoardForm,
  },
  data() {
    return {
      board: { ...Structure.BOARD },
      createModal: {
        show: false,
        closeCallback: "",
      },
      selectorOpen: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters["kanban/boardsList"];
    },
    current() {
      return this.$store.getters["kanban/board"];
    },
    indicatorClasses() {
      return this.selectorOpen ? "fa-caret-up" : "fa-caret-down";
    },
  },
  watch: {
    current() {
      this.parse();
    },
  },
  mounted() {
    this.parse();
  },
  methods: {
    parse() {
      const board = this.list.find((item) => item.id === this.current);
      if (board) {
        this.board = { ...board };
        this.board.columns = [
          {
            name: "vue.draggable",
            order: 1,
          },
          {
            name: "draggable",
            order: 2,
          },
          {
            name: "component",
            order: 3,
          },
        ];
      }
    },
    // * Selector
    openSelector() {
      if (this.list.length) {
        this.selectorOpen = true;
      }
    },
    closeSelector() {
      this.selectorOpen = false;
    },
    toggleSelector() {
      this.selectorOpen = !this.selectorOpen;
    },
    // * Board
    createBoard() {
      this.createModal.show = true;
      this.createModal.closeCallback = () => {
        this.createModal.show = false;
      };
    },
    selectBoard(id) {
      const board = this.list.find((item) => item.id === id);
      if (board) {
        this.$store.dispatch("kanban/selectBoard", board.id);
        this.closeSelector();
      }
    },
    // * Column
    updateColumn(event) {
      console.log("updateColumn");
      console.log(event);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/config/variables";
@import "../../assets/styles/config/mixins";

.board {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;

  &__selector {
    display: flex;
    align-items: center;
    position: relative;

    .selector {
      &__header {
        display: flex;
        justify-content: space-between;
        min-width: 150px;
        font-size: 1.5rem;
        color: $text-primary-color;
        cursor: pointer;

        .header__title {
          .board__icon {
            margin-right: 0.5rem;
          }
        }

        .indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.5rem;
          height: 1.5rem;
          margin-left: 15px;
          border-radius: 50%;
          background-color: white;
          color: $text-secondary-color;
          @include box_shadow(1);
        }
      }

      &__list {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: inherit;
        min-width: 150px;
        top: 1rem;
        list-style: none;
        background-color: white;
        padding: 0;
        @include box_shadow(1);

        .board__item {
          display: flex;
          align-items: center;
          padding: 5px 10px;

          .board__icon {
            margin-right: 0.5rem;
          }

          &:hover {
            cursor: pointer;
            background-color: darken($background-primary-color, 10%);
          }
        }
      }
    }
  }
}
</style>
