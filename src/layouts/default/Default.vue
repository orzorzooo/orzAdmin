<template>
  <v-app>
    <!-- <default-bar /> -->

    <default-view />
    <v-snackbar
      v-model="global.show"
      multi-line
      color="red"
      timeout="1500"
      class="text-center"
    >
      {{ global.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { globalStore } from "@/stores/global";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
const global = globalStore();
</script>
