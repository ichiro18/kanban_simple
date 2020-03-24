<template>
  <the-modal type="content" :on-close-call-back="onCloseCallBack">
    <span class="title" slot="modal__header">Sign Up</span>
    <form class="form form-sign-up" @submit.prevent="onSubmit">
      <div class="form__field">
        <input
          v-model="user.name"
          type="text"
          class="input-field"
          placeholder="Name"
        />
      </div>
      <div class="form__field">
        <date-picker
          v-model="user.birthday"
          placeholder="Birthday"
          :disabled-date="notAfterToday"
          format="DD.MM.YYYY"
          @close="onBlur"
        />
      </div>
      <div class="form__field">
        <input
          v-model="user.post"
          type="text"
          class="input-field"
          placeholder="Post"
        />
      </div>
      <div class="form__footer">
        <button type="submit" class="button button--primary">Submit</button>
        <button type="reset" class="button button--danger">Cancel</button>
      </div>
    </form>
  </the-modal>
</template>

<script>
import DatePicker from "vue2-datepicker";
import axios from "axios";
import "vue2-datepicker/locale/ru";
import TheModal from "@project_src/components/UI/TheModal.vue";
import { Structure } from "@project_src/common/const/structures";

const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  name: "TheSignUp",
  components: {
    TheModal,
    DatePicker,
  },
  data() {
    return {
      user: { ...Structure.USER },
      toastOptions: {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 5000,
      },
    };
  },
  props: {
    onCloseCallBack: {
      type: [Function, Object],
      default: undefined,
    },
  },
  methods: {
    notAfterToday(date) {
      return date > today;
    },
    reset() {
      this.user = { ...Structure.USER };
      this.onCloseCallBack();
    },
    onSubmit() {
      if (this.user) {
        this.$store.dispatch("user/update", this.user);
        this.reset();
      }
    },
    onBlur() {
      if (this.user.birthday) {
        const date = new Date(this.user.birthday);
        console.log(date);
        axios
          .get(`//numbersapi.com/${date.getMonth()}/${date.getDay()}/date`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$toasted.success(res.data, this.toastOptions);
            } else {
              this.$toasted.error(res.statusText, this.toastOptions);
            }
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/config/variables";

.form {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  margin: 0 auto;

  &__field {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 1rem;
    text-align: left;
    margin-bottom: 1.5rem;
    font-family: $font-family-sans-serif;

    .input-field {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 34px;
      padding: 6px 10px;
      font-size: 14px;
      line-height: 1.4;
      color: #555;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

      &::placeholder {
        color: $text-secondary-color;
      }

      &:hover,
      &:focus {
        border-color: #409aff;
      }

      &:focus::placeholder,
      &:active::placeholder {
        color: transparent;
      }

      &:disabled {
        border-color: darken($text-secondary-color, 10%);
        background-color: $text-secondary-color;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-around;
  }
}
</style>
