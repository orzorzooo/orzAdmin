import { defineStore } from "pinia";
import { get, post } from "@/api/request";

// 這種作法，我是不是可以在一隻檔案裡掛超多 store 方法
export const userStore = defineStore("user", {
  // other options...
  state: () => ({
    counter: 0,
    info: null,
  }),
  actions: {
    async setToken(payload) {
      localStorage.setItem(
        `${import.meta.env.VITE_TOKEN_ID}`,
        payload.access_token
      );
      localStorage.setItem(
        `${import.meta.env.VITE_TOKEN_ID}_refresh`,
        payload.refresh_token
      );
      console.log("set token:", payload);
    },
    removeToken() {
      localStorage.removeItem(`${import.meta.env.VITE_TOKEN_ID}`);
      localStorage.removeItem(`${import.meta.env.VITE_TOKEN_ID}_refresh`);
    },
    async getMe() {
      try {
        const data = await get({ type: "users", collection: "me" });
        if (!data) throw Error();
        this.info = data;
        console.log("user", data);
        return true;
      } catch (error) {
        console.log("cant get me");
        return false;
      }
    },
  },
});
