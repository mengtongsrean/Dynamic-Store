<template>
  <!-- Quantity input field -->
  <input
    type="number"
    placeholder="Qty"
    style="text-align: center; border-radius: 10px; border: 1px solid"
    class="form-control w-25"
    v-model.number="quantity"
  />
  <!-- Add to Cart button -->
  <button class="btn-add-to-cart" type="button" @click="addToCart">
    <i class="bi bi-cart"></i>
    Add to Cart
  </button>
</template>

<script>
import Swal from "sweetalert2";
import axiosInstance from "@/axios.js";

export default {
  // Props to receive product data and authentication status
  props: {
    product: {
      type: Object,
      required: true,
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1, // Default quantity to 1
    };
  },
  methods: {
    // Method to handle adding the product to the cart
    async addToCart() {
      // Check if the user is authenticated
      if (!this.isAuthenticated) {
        // Show a warning if the user is not authenticated
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You need to log in to add items to the cart",
          footer:
            '<a href="/login-page">Login</a> or <a href="/register-page">Register</a>',
        });
        return;
      }
      try {
        // Make an API request to add the product to the cart
        await axiosInstance.post(
          "/users/add-to-cart",
          {
            productId: this.product._id,
            name: this.product.name,
            price: this.product.price,
            imagePath: this.product.imagePath,
            brand: this.product.brand,
            type: this.product.type,
            quantity: this.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Show a success message if the product is added to the cart
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${this.product.name} has been added to your cart.`,
        });
      } catch (error) {
        // Log the error and show an error message if the API request fails
        console.error("Failed to add to cart", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add to cart",
        });
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/addtocartbutton.css"></style>
frontend/src/axios.js
