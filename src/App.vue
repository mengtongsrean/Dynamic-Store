<template>
    <div id="app">
        <NavBar />
        <router-view :inventory="inventory" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue' // Import the NavBar component
import axiosInstance from './axios.js' // Import the axios instance

export default {
    components: {
        NavBar // Register NavBar component
    },
    data() {
        return {
            inventory: [] // Initialize inventory as an empty array
        };
    },
    methods: {
        // Method to fetch products from the server
        async fetchProducts() {
            try {
                const response = await axiosInstance.get('/products'); // Make GET request to fetch products
                this.inventory = response.data; // Assign fetched data to inventory
            } catch (error) {
                console.error('Error getting products:', error); // Log error if request fails
            }
        }
    },
    async created() {
        await this.fetchProducts(); // Fetch products when the component is created
    }
};
</script>
