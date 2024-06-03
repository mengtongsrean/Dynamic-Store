<template>
    <div class="container my-5">
        <h1 class="text-center mb-4">Past Orders</h1>
        <div v-if="!isAuthenticated" class="text-center">
            <p>You need to <router-link to="/login-page">login</router-link> or <router-link
                    to="/register-page">register</router-link> to view your past orders.</p>
        </div>
        <div v-else>
            <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-if="!loading && previousOrders.length === 0" class="text-center">
                <p>No past orders found.</p>
            </div>
            <div v-else>
                <div class="order-card" v-for="order in previousOrders" :key="order.orderId">
                    <h2 class="order-id">Order ID: {{ order.orderId }}</h2>
                    <p><strong>Order Date:</strong> {{ order.orderDate }}</p>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in order.products" :key="product.productId">
                                <td><img :src="getImagePath(product.imagePath)" alt="Product Image"
                                        class="img-thumbnail" style="max-width: 100px;"></td>
                                <td>{{ product.name }}</td>
                                <td>${{ product.price.toFixed(2) }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>${{ (product.price * product.quantity).toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="text-end"><strong>Order Total:</strong> ${{ order.total.toFixed(2) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios.js'; // Importing axios instance for API calls

export default {
    data() {
        return {
            previousOrders: [], // Array to hold previous orders
            loading: true, // Loading state
            error: null, // Error state
            isAuthenticated: !!localStorage.getItem('token') // Check if the user is authenticated
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
        }
    },
    async created() {
        if (this.isAuthenticated) {
            try {
                const response = await axiosInstance.get('/users/previous-orders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Setting the authorization header with JWT token
                    }
                });
                this.previousOrders = response.data || []; // Assigning the fetched previous orders data to previousOrders array
            } catch (error) {
                this.error = 'Failed to load past orders.'; // Setting error message in case of failure
            } finally {
                this.loading = false; // Setting loading state to false after the data is fetched or failed
            }
        } else {
            this.loading = false; // Setting loading state to false if the user is not authenticated
        }
    }
};
</script>

<style scoped src="@/assets/styles/pastorders.css"></style>
