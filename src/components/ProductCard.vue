<template>
  <!-- Product Card -->
  <div class="col-md-6 col-lg-4 mb-4">
    <div class="card">
      <div class="img-container">
        <!-- Product Image -->
        <img
          :src="getImagePath(product.imagePath)"
          :alt="product.name"
          class="card-img-top"
        />
        <!-- Add to Favorites Button -->
        <button class="like-btn" @click="addToFavorites(product)">
          <i class="bi bi-heart"></i>
        </button>
      </div>
      <div class="card-body text-center">
        <!-- Product Name -->
        <h5 class="card-title">{{ product.name }}</h5>
        <!-- Product Brand -->
        <p class="card-text text-muted">{{ product.brand }}</p>
        <!-- Product Review -->
        <div class="d-flex justify-content-between mt-2">
          <div class="text-muted">Review</div>
          <div class="text-muted">
            <i class="bi bi-star"></i><i class="bi bi-star"></i
            ><i class="bi bi-star"></i>
          </div>
        </div>
        <!-- Product Price -->
        <div class="d-flex justify-content-between mt-2">
          <div>Price</div>
          <p class="card-text">${{ product.price }}</p>
        </div>
        <!-- Add to Cart Button -->
        <div class="d-flex justify-content-between mt-3">
          <AddToCartButton
            :product="product"
            :isAuthenticated="isAuthenticated"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"; // Importing SweetAlert for alerts
import axiosInstance from "@/axios.js"; // Importing axios instance for API calls
import AddToCartButton from "@/components/AddToCartButton.vue"; // Importing AddToCartButton component

export default {
  // Props to receive product data and getImagePath method
  props: ["product", "getImagePath"],
  components: {
    AddToCartButton, // Registering AddToCartButton component
  },
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("token"), // Check if the user is authenticated
    };
  },
  methods: {
    // Method to get the image path
    getImagePath(imagePath) {
      if (imagePath) {
        return require(`@/assets/images/product-images/${imagePath}`);
      }
      // Fallback image if imagePath is undefined
      return require("@/assets/images/product-images/default.jpg");
    },

    // Method to add the product to favorites
    async addToFavorites(product) {
      // Check if the user is authenticated
      if (!this.isAuthenticated) {
        // Show a warning if the user is not authenticated
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You need to log in to add favorites",
          footer:
            '<a href="/login-page">Login</a> or <a href="/register-page">Register</a>',
        });
        return;
      }
      try {
        // Make an API request to add the product to favorites
        const response = await axiosInstance.post(
          "/users/add-favourite-items",
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            imagePath: product.imagePath,
            brand: product.brand,
            type: product.type,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Show a success message if the product is added to favorites
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Product added to favorites",
        });
      } catch (error) {
        // Log the error and show an error message if the API request fails
        console.error("Failed to add to favorites", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add to favorites",
        });
      }
    },
  },
};
</script>

<style src="@/assets/styles/productcard.css"></style>
frontend/src/axios.js
