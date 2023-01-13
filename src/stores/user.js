import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  // other options...
  state: () => ({
    counter: 0,
    info: null,
  }),
});
