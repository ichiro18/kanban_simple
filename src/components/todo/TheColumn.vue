<template>
  <div class="column__list">
    <drag
      v-model="list"
      v-bind="dragOptions"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <transition-group
        type="transition"
        :name="!isDragging ? 'flip-list' : null"
      >
        <div v-for="element in list" :key="element.order" class="column__item">
          <div class="column__header">
            <div class="header__title">{{ element.name }}</div>
            <i class="far fa-trash-alt header__icon"></i>
          </div>
          <div class="column__body">
            content
          </div>
          <div class="column__footer">
            Create task
          </div>
        </div>
      </transition-group>
    </drag>
    <div class="column__item column__item--pseudo">
      Create column
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import drag from "vuedraggable";

export default {
  name: "TheColumn",
  components: {
    drag,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDragging: false,
      dragOptions: {
        animation: 0,
        group: "columns",
        disabled: false,
        ghostClass: "ghost",
        handle: ".column__header",
      },
      list: [],
    };
  },
  watch: {
    columns() {
      this.parse();
    },
  },
  mounted() {
    this.parse();
  },
  methods: {
    parse() {
      this.list = _.cloneDeep(this.columns);
    },
    onDragStart() {
      this.isDragging = true;
    },
    onDragEnd() {
      this.isDragging = false;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/config/variables";
@import "../../assets/styles/config/mixins";

.column__list {
  padding: 30px 0;
  display: flex;
  flex-direction: row;

  & > div > span {
    display: flex;
    flex-direction: row;
  }

  .column__item {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100%;
    padding-bottom: 30px;
    background-color: white;
    @include box_shadow(1);
    justify-content: flex-start;
    border-radius: 5px;

    & + .column__item {
      margin-left: 30px;
    }

    .column__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      box-sizing: border-box;
      border-top: 5px solid $primary-color;

      .header__title {
        font-size: 1.25rem;
        color: $text-primary-color;
        cursor: pointer;
      }

      .header__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $text-primary-color;

        &:hover {
          cursor: pointer;
          color: red;
        }
      }
    }

    .column__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.15rem;
      cursor: pointer;
    }

    &--pseudo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0;
      margin-left: 30px;
      background-color: transparent;
      border: 1px dashed $primary-color;
      box-shadow: none;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
