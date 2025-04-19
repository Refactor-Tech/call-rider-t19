<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  cpf: "",
  password: "",
  is_passenger: false,
});

function fillForm() {
  form.value.name = "John Doe";
  form.value.email = `john.doe${Math.random()}@example.com`;
  form.value.cpf = "87748248800";
  form.value.password = "password123";
  form.value.is_passenger = true;
}

async function signup() {
  await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.value),
  });
}
</script>

<template>
  <div>
    <input type="text" placeholder="Enter your name" v-model="form.name" />
    <input type="email" placeholder="Enter your email" v-model="form.email" />
    <input type="text" placeholder="Enter your CPF" v-model="form.cpf" />
    <input
      type="password"
      placeholder="Enter your password"
      v-model="form.password"
    />
    <label for="is_passenger">
      <input type="checkbox" v-model="form.is_passenger" />
      Passenger
    </label>
    <button @click="signup">Sign Up</button>
    <button @click="fillForm">Fill</button>
  </div>
</template>

<style>
button,
input {
  display: block;
}
</style>
