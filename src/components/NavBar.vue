<template>
    <!-- Navbar Component -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <!-- Brand Logo -->
            <router-link class="navbar-brand" to="/">
                <img class="brand-logo" src="@/assets/icons/brand-no-bg.svg" alt="Dynamic-logo">
            </router-link>
            <!-- Navbar Toggler for mobile view -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Navbar Links -->
            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- Home Link -->
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                    <!-- Products Link -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Products</router-link>
                    </li>
                    <!-- Add Product Link for Admin only -->
                    <li class="nav-item" v-if="isAdmin">
                        <router-link class="nav-link" to="/add-product">Add Product</router-link>
                    </li>
                    <!-- Links for regular users -->
                    <li class="nav-item" v-if="!isAdmin">
                        <router-link class="nav-link" to="/past-orders">Past Orders</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAdmin">
                        <router-link class="nav-link" to="/favourites">Favourites</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAdmin">
                        <router-link class="nav-link" to="/cart-page">Cart</router-link>
                    </li>
                </ul>
                <!-- User Profile and Authentication Links -->
                <div class="d-flex align-items-center ms-auto">
                    <!-- Welcome message for authenticated users -->
                    <div v-if="isAuthenticated" class="nav-item" style="margin-right:20px;">Welcome, <span
                            class="font-italic" style="color:red">{{ user.username }}!</span></div>
                    <!-- Dropdown Menu for Profile, Login, Register, Logout -->
                    <div class="dropdown">
                        <button class="nav-link dropdown-toggle" id="navbarDropdownMenuAvatar" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <img src="@/assets/images/profile.png" class="rounded-circle" height="35"
                                alt="Profile Picture" loading="lazy">
                        </button>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuAvatar">
                            <router-link class="dropdown-item" to="/profile">My profile</router-link>
                            <router-link class="dropdown-item" v-if="!isAuthenticated"
                                to="/login-page">Login</router-link>
                            <router-link class="dropdown-item" v-if="!isAuthenticated"
                                to="/register-page">Register</router-link>
                            <router-link class="dropdown-item" v-if="isAuthenticated" @click.prevent="logout"
                                to="#">Logout</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('token'), // Check if the user is authenticated
            user: JSON.parse(localStorage.getItem('user')) || {} // Get user data from local storage
        };
    },
    computed: {
        isAdmin() {
            return this.user.role === 'Admin'; // Check if the user is an admin
        }
    },
    methods: {
        logout() {
            // Remove user data from local storage and navigate to login page
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isAuthenticated = false;
            this.user = {};
            this.$router.push('/login-page');
        }
    },
    watch: {
        // Watch for route changes to update authentication status and user data
        '$route'() {
            this.isAuthenticated = !!localStorage.getItem('token');
            this.user = JSON.parse(localStorage.getItem('user')) || {};
        }
    }
};
</script>

<style src="@/assets/styles/navbar.css"></style>
