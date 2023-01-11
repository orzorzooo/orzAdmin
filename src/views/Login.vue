<template>
  <v-sheet class="bg-deep-purple pa-12 d-flex align-center" height="100%">
    <v-container>
      <h1 class="display-1">Wellcome</h1>
      <h1 class="display-1">{{ companyName }}</h1>
      <v-row>
        <v-col>
          <v-card class="mx-auto px-6 py-8">
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
        <v-col></v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script setup>
import { ref, onMounted } from "vue";
const companyName = ref("your company name");
const form = ref(false);
const loading = ref(false);
const email = ref("");
const password = ref("");

const onSubmit = () => {
  if (!form) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
};
const required = (v) => {
  return !!v || "Field is required";
};
</script>
