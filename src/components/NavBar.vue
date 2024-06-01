<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img class="brand-logo" src="@/assets/icons/brand-no-bg.svg" alt="Dynamic-logo">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/past-orders">Past Orders</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/favourites">Favourites</router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center ms-auto">
            <div class="dropdown">
              <button class="nav-link dropdown-toggle" id="navbarDropdownMenuAvatar" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="@/assets/images/profile.jpeg" class="rounded-circle" height="35" alt="Profile Picture" loading="lazy">
              </button>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuAvatar">
                <router-link class="dropdown-item" to="/profile">My profile</router-link>
                <router-link class="dropdown-item" v-if="!isAuthenticated" to="/login-page">Login</router-link>
                <router-link class="dropdown-item" v-if="!isAuthenticated" to="/register-page">Register</router-link>
                <router-link class="dropdown-item" v-if="isAuthenticated" @click.prevent="logout" to="#">Logout</router-link>
              </div>
            </div>
            <div style="margin-left:20px;border:none;background:none;">
              <router-link class="nav-link" to="/cart-page">
                <i class="bi bi-bag-check-fill"></i><span style="margin-left:5px">({{ totalQuantity }})</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: ['totalQuantity'],
    data() {
      return {
        isAuthenticated: !!localStorage.getItem('token')
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isAuthenticated = false;
        this.$router.push('/login-page');
      }
    },
    watch: {
      '$route'() {
        this.isAuthenticated = !!localStorage.getItem('token');
      }
    }
  };
  </script>
  
<style src="@/assets/styles/navbar.css"></style>

  