<template>
    <!-- Login Container -->
    <div class="login-container my-5">
        <div class="card shadow p-4">
            <!-- Page Title -->
            <h1 class="text-center mb-4">Login</h1>
            <!-- Login Form -->
            <form @submit.prevent="login">
                <div class="form-group mb-3">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" class="form-control">
                </div>
                <div class="form-group mb-4">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <!-- Error Messages -->
            <ul v-if="errors.length" class="text-danger mt-3">
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            <!-- Register Link -->
            <p class="mt-4 text-center">
                Don't have an account? <router-link to="/register-page">Register here</router-link>.
            </p>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios.js'; // Importing axios instance for API calls

export default {
    data() {
        return {
            email: '', // Email input
            password: '', // Password input
            errors: [], // Array to hold validation errors
        };
    },
    methods: {
        // Method to validate email format
        validateEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        },

        // Method to validate form inputs
        validateForm() {
            this.errors = [];

            if (!this.email || !this.validateEmail(this.email)) {
                this.errors.push("Must be in email format and is required.");
            }
            if (!this.password) {
                this.errors.push("Password is required.");
            }

            return this.errors.length === 0;
        },
        // Method to handle login
        async login() {
            if (!this.validateForm()) {
                return;
            }

            try {
                const response = await axiosInstance.post('/users/login', {
                    email: this.email,
                    password: this.password,
                });
                if (response.data.token && response.data.user) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.$router.push('/');
                } else {
                    this.errors.push('Unexpected response from server.');
                }
            } catch (error) {
                this.errors.push('Invalid email or password');
                console.error('Error during login:', error);
            }
        },
    },
};
</script>

<style scoped src="@/assets/styles/loginpage.css"></style>
