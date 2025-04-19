<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  cpf: "",
  password: "",
  is_passenger: false,
});
const accountId = ref("");
const status = ref("");
const message = ref("");

function fillForm() {
  form.value.name = "John Doe";
  form.value.email = `john.doe${Math.random()}@example.com`;
  form.value.cpf = "87748248800";
  form.value.password = "password123";
  form.value.is_passenger = true;
}

async function signup() {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.value),
  });

  const output = await response.json();
  if (output.accountId) {
    accountId.value = output.accountId;
    status.value = "User created successfully!";
  } else {
    message.value = output.message;
    status.value = "Error creating user";
  }
}
</script>

<template>
  <div>
    <input
      data-testid="form-name"
      type="text"
      placeholder="Enter your name"
      v-model="form.name"
    />
    <input
      data-testid="form-email"
      type="email"
      placeholder="Enter your email"
      v-model="form.email"
    />
    <input
      data-testid="form-cpf"
      type="text"
      placeholder="Enter your CPF"
      v-model="form.cpf"
    />
    <input
      data-testid="form-password"
      type="password"
      placeholder="Enter your password"
      v-model="form.password"
    />
    <label for="is_passenger">
      <input
        data-testid="form-is-passenger"
        type="checkbox"
        v-model="form.is_passenger"
      />
      Passenger
    </label>
    <button data-testid="btn-signup" @click="signup">Sign Up</button>
    <button @click="fillForm">Fill</button>
    <p data-testid="status">{{ status }}</p>
    <p data-testid="message">{{ message }}</p>
  </div>
</template>

<style>
button,
input {
  display: block;
}
</style>
