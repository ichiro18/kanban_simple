<template>
  <div class="user">
    <template v-if="isAuth">
      <div class="user__details">
        <span class="user__name">{{ current.name }}</span>
        <span class="user__post" v-if="current.post">{{ current.post }}</span>
      </div>
      <div class="user__avatar" />
    </template>
    <span v-else class="action">Sign Up</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheUser",
  computed: {
    ...mapGetters("user", ["current", "isAuth"]),
  },
};
</script>

<style lang="scss">
@import "../assets/styles/config/variables";

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0 15px;
  user-select: none;

  &__details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__name {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  &__post {
    font-size: 0.75rem;
    line-height: 1.3;
    opacity: 0.8;
  }

  &__avatar {
    width: 3rem;
    height: 3rem;
    margin-left: 1.5rem;
    background-color: $background-secondary-color;
    background-image: url("../assets/images/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    border-radius: 50%;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(black, 0.15);
  }
}
</style>
