import { defineStore } from "pinia";

export const globalStore = defineStore("global", {
  state: () => ({
    title: "",
    text: "",
    show: false,
  }),
  actions: {
    dialog() {},
  },
});
