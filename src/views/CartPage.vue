<template>
    <!-- Cart Section -->
    <section class="bg-light py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <!-- Header with Title and Back to Products Button -->
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h2 class="fw-bold text-primary">Your Cart</h2>
                                <router-link to="/" class="btn btn-outline-primary">
                                    <i class="bi bi-arrow-left"></i> Back to Products
                                </router-link>
                            </div>
                            <hr>
                            <!-- Loading Spinner -->
                            <div v-if="loading" class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <!-- No Items Message -->
                            <div v-if="!loading && cartItems.length === 0" class="text-center">
                                <p class="text-muted">No items in your cart.</p>
                            </div>
                            <!-- Cart Items -->
                            <div v-else>
                                <div v-for="item in cartItems" :key="item.productId"
                                    class="row mb-4 align-items-center">
                                    <!-- Product Image -->
                                    <div class="col-3">
                                        <img :src="getImagePath(item.imagePath)" class="img-fluid rounded"
                                            :alt="item.name">
                                    </div>
                                    <!-- Product Name and Brand -->
                                    <div class="col-3">
                                        <h5 class="text-muted">{{ item.name }}</h5>
                                        <p class="text-muted">{{ item.brand }}</p>
                                    </div>
                                    <!-- Quantity Input -->
                                    <div class="col-2 text-center">
                                        <h6 class="text-muted">Quantity</h6>
                                        <input type="number" class="form-control text-center"
                                            v-model.number="item.quantity" @change="updateQuantity(item)" min="1">
                                    </div>
                                    <!-- Product Price -->
                                    <div class="col-2 text-center">
                                        <h6 class="text-muted">Price</h6>
                                        <p class="mb-0">${{ item.price }}</p>
                                    </div>
                                    <!-- Total Price -->
                                    <div class="col-2 text-center">
                                        <h6 class="text-muted">Total</h6>
                                        <p class="mb-0">${{ item.price * item.quantity }}</p>
                                    </div>
                                    <!-- Remove Button -->
                                    <div class="col-12 col-md-1 text-end">
                                        <button class="btn btn-danger btn-sm" @click="removeFromCart(item.productId)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <!-- Cart Summary -->
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="text-muted">{{ cartItems.length }} items</h5>
                                <h5 class="text-muted">Total: ${{ calculateTotal() }}</h5>
                            </div>
                            <!-- Proceed to Checkout Button -->
                            <div class="d-flex justify-content-end mt-4">
                                <button class="btn btn-primary btn-lg" @click="processOrder">Proceed to
                                    Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2'; // Importing SweetAlert for alerts
import axiosInstance from '@/axios.js'; // Importing axios instance for API calls

export default {
    data() {
        return {
            cartItems: [], // Array to hold cart items
            loading: true, // Loading state
            isAuthenticated: !!localStorage.getItem('token'), // Check if the user is authenticated
        };
    },
    methods: {
        // Method to get the image path
        getImagePath(imagePath) {
            if (imagePath) {
                return require(`@/assets/images/product-images/${imagePath}`);
            }
            // Fallback image if imagePath is undefined
            return require('@/assets/images/product-images/default.jpg');
        },
        // Method to fetch cart items
        async fetchCartItems() {
            if (!this.isAuthenticated) return;
            try {
                const response = await axiosInstance.get('/users/get-cart-items', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.cartItems = response.data || [];
            } catch (error) {
                console.error('Failed to load cart items', error);
            } finally {
                this.loading = false;
            }
        },
        // Method to remove an item from the cart
        async removeFromCart(productId) {
            try {
                await axiosInstance.delete(`/users/remove-cart-item/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.cartItems = this.cartItems.filter(item => item.productId !== productId);
                Swal.fire('Removed', 'Product removed from cart', 'success');
            } catch (error) {
                console.error('Failed to remove from cart', error);
                Swal.fire('Error', 'Failed to remove from cart', 'error');
            }
        },
        // Method to update the quantity of a cart item
        async updateQuantity(item) {
            try {
                await axiosInstance.put(`/users/update-cart-item/${item.productId}`, {
                    quantity: item.quantity
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                Swal.fire('Updated', 'Product quantity updated', 'success');
            } catch (error) {
                console.error('Failed to update quantity', error);
                Swal.fire('Error', 'Failed to update quantity', 'error');
            }
        },
        // Method to process the order
        async processOrder() {
            if (this.cartItems.length === 0) {
                Swal.fire('Error', 'Your cart is empty', 'error');
                return;
            }
            try {
                const response = await axiosInstance.post('/users/process-order', {
                    cartItems: this.cartItems
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.cartItems = []; // Clear the cart in the frontend
                Swal.fire('Success', 'Order processed successfully', 'success');
            } catch (error) {
                console.error('Failed to process order', error);
                Swal.fire('Error', 'Failed to process order', 'error');
            }
        },
        // Method to calculate the total price of the cart items
        calculateTotal() {
            return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    },
    async created() {
        await this.fetchCartItems(); // Fetch cart items when the component is created
    }
};
</script>

<style scoped src="@/assets/styles/cartpage.css"></style>
