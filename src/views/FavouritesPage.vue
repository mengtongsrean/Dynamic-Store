<template>
    <div class="container my-5">
        <!-- Page Title -->
        <h1 class="text-center mb-4">Favourite Items</h1>
        <!-- Message for unauthenticated users -->
        <div v-if="!isAuthenticated" class="text-center">
            <p>You need to <router-link to="/login-page">login</router-link> or <router-link
                    to="/register-page">register</router-link> to view your favourite items.</p>
        </div>
        <div v-else>
            <!-- Loading Spinner -->
            <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <!-- No Items Message -->
            <div v-if="!loading && displayedItems.length === 0" class="text-center">
                <p>No favourite items found.</p>
            </div>
            <!-- Favourite Items List -->
            <div v-else>
                <div class="row">
                    <div class="col-12 mb-4" v-for="item in displayedItems" :key="item.productId">
                        <div class="card">
                            <div class="row g-0">
                                <!-- Product Image -->
                                <div class="col-md-4">
                                    <img :src="getImagePath(item.imagePath)" class="img-fluid rounded-start"
                                        :alt="item.name" />
                                </div>
                                <!-- Product Details -->
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-center mt-2 mb-4">{{ item.name }}</h5>
                                        <div class="d-flex justify-content-around mb-2">
                                            <div class="card-text">Brand:</div>
                                            <p class="card-text">{{ item.brand }}</p>
                                        </div>
                                        <div class="d-flex justify-content-around mb-3">
                                            <div class="card-text">Price:</div>
                                            <p class="card-text">${{ item.price }}</p>
                                        </div>
                                        <div class="d-flex justify-content-around mb-2">
                                            <AddToCartButton :product="item" :isAuthenticated="isAuthenticated" />
                                        </div>
                                        <!-- Remove Button -->
                                        <button class="btn btn-danger" @click="removeFromFavorites(item.productId)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Load More Button -->
                <div class="text-center mt-4">
                    <button class="btn btn-secondary" v-if="displayedItems.length < favoriteItems.length"
                        @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'; // Importing SweetAlert for alerts
import axiosInstance from '@/axios.js'; // Importing axios instance for API calls
import AddToCartButton from '@/components/AddToCartButton.vue'; // Importing AddToCartButton component

export default {
    data() {
        return {
            favoriteItems: [], // Array to hold favorite items
            displayedItems: [], // Array to hold items to be displayed
            loading: true, // Loading state
            isAuthenticated: !!localStorage.getItem('token'), // Check if the user is authenticated
            itemsPerPage: 5, // Number of items to display per page
            currentPage: 1, // Current page number
        };
    },
    components: {
        AddToCartButton, // Registering AddToCartButton component
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
        // Method to fetch favorite items
        async fetchFavorites() {
            if (!this.isAuthenticated) return;
            try {
                const response = await axiosInstance.get('/users/get-favourite-items', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.favoriteItems = response.data.reverse(); // Reverse to display new items at the top
                this.updateDisplayedItems();
            } catch (error) {
                console.error('Failed to load favourite items', error);
            } finally {
                this.loading = false;
            }
        },
        // Method to remove an item from favorites
        async removeFromFavorites(productId) {
            try {
                await axiosInstance.delete(`/users/remove-favourite-item/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Update the favoriteItems array
                this.favoriteItems = this.favoriteItems.filter(item => item.productId !== productId);
                // Update the displayedItems array
                this.updateDisplayedItems();
                Swal.fire('Removed', 'Product removed from favorites', 'success');
            } catch (error) {
                console.error('Failed to remove from favorites', error);
                Swal.fire('Error', 'Failed to remove from favorites', 'error');
            }
        },
        // Method to update the displayed items
        updateDisplayedItems() {
            const start = 0;
            const end = this.currentPage * this.itemsPerPage;
            this.displayedItems = this.favoriteItems.slice(start, end);
        },
        // Method to load more items
        loadMore() {
            this.currentPage += 1;
            this.updateDisplayedItems();
        }
    },
    async created() {
        await this.fetchFavorites(); // Fetch favorite items when the component is created
    }
};
</script>

<style scoped src="@/assets/styles/favouritespage.css"></style>
