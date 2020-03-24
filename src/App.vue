<template>
  <div class="page">
    <header class="nav-bar">
      <a class="nav-bar__brand">
        <img
          src="./assets/images/logo.png"
          alt="Kanban logo"
          class="image logo"
        />
      </a>
      <div class="nav-bar__content">
        <h1 class="title">{{ title }}</h1>
        <the-user @click="signUp" />
      </div>
    </header>
    <main class="content" v-if="isAuth">
      <the-board />
    </main>
    <div class="jumbotron" v-else>
      <h3 class="jumbotron__title">Warning</h3>
      <p class="jumbotron__message">
        You are not authorized.
        <br />
        Please, <a class="link" @click="signUp">sign up</a>
      </p>
    </div>
    <slot name="modal"></slot>

    <the-sign-up
      v-if="signUpModal.show"
      type="content"
      :on-close-call-back="signUpModal.onClose"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheUser from "@project_src/components/TheUser.vue";
import TheSignUp from "@project_src/components/dialogs/TheSignUp.vue";
import TheBoard from "@project_src/components/todo/TheBoard.vue";

export default {
  name: "App",
  components: {
    TheBoard,
    TheSignUp,
    TheUser,
  },
  data() {
    return {
      signUpModal: {
        show: false,
        onClose: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
    title() {
      return "Kanban";
    },
  },
  methods: {
    signUp() {
      this.signUpModal.show = true;
      this.signUpModal.onClose = () => {
        this.signUpModal.show = false;
      };
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/config/variables";
@import "./assets/styles/config/mixins";

.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 100vh;

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    @include box_shadow(1);
    user-select: none;
    color: $text-invert-color;

    &__brand {
      display: flex;
      width: 150px;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: white;

      .image,
      .logo {
        max-width: 100%;
        height: auto;
        max-height: 50px;
      }
    }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1 0;
      height: 100%;
      padding: 0 30px;
      @include gradient(
        90deg,
        rgba(120, 149, 243, 1) 0%,
        rgba(111, 165, 246, 1) 75%,
        rgba(106, 174, 247, 1) 100%
      );

      .title {
        font-size: 1.5rem;
        font-weight: normal;
      }

      &--end {
        justify-content: flex-end;
      }
    }
  }

  .jumbotron {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0;
    width: 100%;
    height: 100%;
    text-align: center;

    &__title {
      margin: 0.5rem 0;
    }

    &__message {
      line-height: 1.5;
      text-align: center;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    overflow: auto;
    box-sizing: border-box;
    font-family: $font-family-sans-serif;
    position: relative;
  }
}
</style>
