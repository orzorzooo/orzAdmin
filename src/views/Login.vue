<template>
  <v-sheet class="bg-deep-purple pa-12 d-flex align-center" height="100%">
    <v-container>
      <h1 class="display-1">Wellcome</h1>
      <h1 class="display-1">{{ companyName }}</h1>

      <v-row>
        <v-col>
          <v-card class="mx-auto px-6 py-8" width="100%" cols="12" md="6">
            <v-form v-model="form" @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="Email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                :readonly="loading"
                :rules="[required]"
                clearable
                label="Password"
                placeholder="Enter your password"
              ></v-text-field>

              <br />

              <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                variant="elevated"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="6"></v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "@/stores/user";
import { get, post } from "@/api/request";
import { useRoute, useRouter } from "vue-router";

const companyName = ref("your company name");
const form = ref(false);
const loading = ref(false);
const email = ref("");
const password = ref("");
const user = userStore();

const router = useRouter();
const route = useRoute();

async function onSubmit() {
  if (!form) return;
  const loginStatus = await login();
  if (!loginStatus) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}

async function login() {
  try {
    const res = await post({
      data: {
        email: email.value,
        password: password.value,
      },
      type: "auth",
      collection: "login",
    });
    if (!res) throw Error();
    await user.setToken(res);
    const setUserInfo = await user.getMe();
    if (!setUserInfo) return;
    router.push({ name: "UserIndex" });
  } catch (error) {
    user.removeToken();
    return false;
  }
}

const required = (v) => {
  return !!v || "Field is required";
};
</script>
