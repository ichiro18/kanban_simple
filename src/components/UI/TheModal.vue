<template slot="modal">
  <transition name="modal">
    <div class="modal__overlay">
      <div class="modal__wrapper">
        <div class="modal__content">
          <div v-if="hasHeader" class="modal__header">
            <slot name="modal__header"></slot>
          </div>
          <div class="modal__body">
            <slot></slot>
          </div>
          <b v-if="hasFooter" class="modal__footer">
            <slot name="modal__footer"></slot>
          </b>
        </div>
        <div class="close__button" @click="no">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TheModal",
  props: {
    type: {
      type: String,
      default: "content",
      validator: (value) => {
        return ["content", "confirm"].includes(value);
      },
    },
    onYesCallBack: {
      type: [Function, Object],
      default: undefined,
    },
    onNoCallBack: {
      type: [Function, Object],
      default: undefined,
    },
    onCloseCallBack: {
      type: [Function, Object],
      default: undefined,
    },
    closeAfterCallBack: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasHeader() {
      return !!this.$slots.modal__header;
    },
    hasFooter() {
      return !!this.$slots.modal__footer;
    },
    hasYesCallback() {
      return !!this.$props.onYesCallBack;
    },
    hasNoCallback() {
      return !!this.$props.onNoCallBack;
    },
    hasCloseCallback() {
      return !!this.$props.onCloseCallBack;
    },
  },
  mounted() {
    window.addEventListener("keyup", this.onKeyUp, false);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.onKeyUp, false);
  },
  methods: {
    yes() {
      if (this.hasYesCallback) {
        const cb = this.$props.onYesCallBack;
        if (typeof cb === "function") {
          cb();
        }
      }
      if (this.closeAfterCallBack) {
        this.close();
      }
    },
    no() {
      if (this.hasNoCallback) {
        const cb = this.$props.onNoCallBack;
        if (typeof cb === "function") {
          cb();
        }
      }
      if (this.closeAfterCallBack) {
        this.close();
      }
    },
    close() {
      if (this.hasCloseCallback) {
        const cb = this.$props.onCloseCallBack;
        if (typeof cb === "function") {
          cb();
        }
      }
    },
    onKeyUp(event) {
      if (event.which === 27 || event.keyCode === 27) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/config/variables";

.modal__overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .modal__wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    min-width: 30%;
    max-width: 70%;
    min-height: 30%;
    max-height: 70%;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);

    .modal__content {
      display: flex;
      flex-direction: column;
      flex: 1 0;

      .modal__header {
        display: flex;
        flex: 0 1;
        align-items: center;
        box-sizing: border-box;
        padding: 18px;
        border-bottom: 1px solid $text-secondary-color;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.2px;
      }

      .modal__body {
        display: flex;
        flex: 1 0;
        padding: 13px 18px;
        color: $text-primary-color;
        font-family: "Open Sans", serif;
        font-size: 15px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: -0.2px;
      }

      .modal__footer {
        margin-top: auto;
        padding: 13px 18px;
        color: $text-secondary-color;
        font-family: "Open Sans", serif;
        font-size: 13px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: -0.2px;
      }
    }

    .modal__buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      padding: 18px;

      .button + .button {
        margin-left: 8px;
      }
    }

    .close__button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 18px;
      right: 18px;
      width: 24px;
      height: 24px;

      .close__icon {
        width: 18px;
        height: 18px;
        color: $text-secondary-color;
      }

      &:hover {
        cursor: pointer;
        color: $primary-color;
      }
    }
  }
}
</style>
