<template>
  <div class="register-container card shadow my-5">
    <h1 class="text-center text-primary">Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
        />
        <div v-if="errors.username" class="text-danger">
          {{ errors.username }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
        />
        <div v-if="errors.password" class="text-danger">
          {{ errors.password }}
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          class="form-control"
        />
        <div v-if="errors.confirmPassword" class="text-danger">
          {{ errors.confirmPassword }}
        </div>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="phone" class="form-control" />
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role" class="form-control">
          <option>Customer</option>
          <option>Admin</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
    <p class="text-center mt-3">
      Already have an account?
      <router-link to="/login-page">Login here</router-link>.
    </p>
  </div>
</template>

<script>
import axiosInstance from "@/axios.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "Customer",
      errors: {}, // Object to store form validation errors
    };
  },
  methods: {
    // Function to validate email format
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    },
    // Function to validate password format
    validatePassword(password) {
      const pwdPattern = /(?=.*[\$%\^&\*]).{8,}/;
      return pwdPattern.test(password);
    },
    // Function to validate phone number format
    validatePhone(phone) {
      const phonePattern = /^04\d{8}$/;
      return phonePattern.test(phone);
    },
    // Function to validate the entire form
    validateForm() {
      this.errors = {}; // Clear previous errors

      const namePattern = /^[A-Za-z]+$/;

      // Validate username
      if (!this.username || !this.username.match(namePattern)) {
        this.errors.username =
          "Username must contain only letters and is required.";
      }
      // Validate email
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = "Must be in email format and is required.";
      }
      // Validate password
      if (!this.password || !this.validatePassword(this.password)) {
        this.errors.password =
          "Password must be at least 8 characters and include at least one special character ($, %, ^, &, *).";
      }
      // Confirm password match
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match.";
      }
      // Validate phone number
      if (!this.phone || !this.validatePhone(this.phone)) {
        this.errors.phone =
          "Mobile number must be 10 digits and start with 04.";
      }

      return Object.keys(this.errors).length === 0; // Return true if no errors
    },
    // Function to handle form submission
    async register() {
      if (!this.validateForm()) {
        return; // If form is invalid, return early
      }

      try {
        const response = await axiosInstance.post("/users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          phone: this.phone,
          role: this.role,
        });

        if (response.data.token && response.data.user) {
          localStorage.setItem("token", response.data.token); // Store JWT token in local storage
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in local storage
          Swal.fire("Success", "Registration successful", "success"); // Show success message
          this.$router.push("/"); // Redirect to home page
        } else {
          this.errors.general = "Unexpected response from server."; // Handle unexpected response
        }
      } catch (error) {
        // Handle registration error
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errors.general = error.response.data.message;
        } else {
          this.errors.general = "Registration failed.";
        }
        console.error("Error during registration:", error);
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/registerpage.css"></style>
frontend/src/axios.js
