<template>
    <div class="container my-5">
      <h1 class="text-center mb-4">Favourite Items</h1>
      <div v-if="!isAuthenticated" class="text-center">
        <p>You need to <router-link to="/login-page">login</router-link> or <router-link to="/register-page">register</router-link> to view your favourite items.</p>
      </div>
      <div v-else>
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-if="!loading && favoriteItems.length === 0" class="text-center">
          <p>No favourite items found.</p>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-4" v-for="item in favoriteItems" :key="item.productId">
              <div class="card">
                <img :src="getImagePath(item.imagePath)" class="card-img-top" :alt="item.name" />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">{{ item.brand }}</p>
                  <p class="card-text">${{ item.price }}</p>
                  <button class="btn btn-primary" @click="addToCart(item)">
                    <i class="bi bi-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js';
  
  export default {
    data() {
      return {
        favoriteItems: [],
        loading: true,
        isAuthenticated: !!localStorage.getItem('token'),
      };
    },
    methods: {
        getImagePath(imagePath) {
            if (imagePath) {
                return require(`@/assets/images/product-images/${imagePath}`);
            }
                // Fallback image if imagePath is undefined
            return require('@/assets/images/product-images/default.jpg');
    },
      async fetchFavorites() {
        if (!this.isAuthenticated) return;
        try {
          const response = await axiosInstance.get('/users/get-favourite-items', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.favoriteItems = response.data || [];
        } catch (error) {
          console.error('Failed to load favourite items', error);
        } finally {
          this.loading = false;
        }
      },
      addToCart(item) {
        // Placeholder for add to cart functionality
        alert(`Add ${item.name} to cart functionality not implemented yet.`);
      }
    },
    async created() {
      await this.fetchFavorites();
    }
  };
  </script>
  
<style scoped>
  .container {
    max-width: 1000px;
  }
  
  .card {
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img-top {
    width: 100%;
    height: auto;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-text {
    margin: 0.5rem 0;
  }
  
  .btn {
    margin-top: 0.5rem;
  }
  
  .text-center {
    text-align: center;
  }
</style>
  