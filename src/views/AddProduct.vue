<template>
    <div class="container my-5">
        <!-- Page Title -->
        <h2 class="text-center mb-4">Add New Product</h2>
        <!-- Add Product Form -->
        <form @submit.prevent="validateAndSubmit">
            <!-- Product Name Input -->
            <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" v-model="name">
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            </div>
            <!-- Product Price Input -->
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" class="form-control" id="price" v-model="price">
                <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
            </div>
            <!-- Product Brand Input -->
            <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="brand" v-model="brand">
                <div v-if="errors.brand" class="text-danger">{{ errors.brand }}</div>
            </div>
            <!-- Product Image Path Input -->
            <div class="mb-3">
                <label for="imagePath" class="form-label">Image Path</label>
                <input type="text" class="form-control" id="imagePath" v-model="imagePath">
                <div v-if="errors.imagePath" class="text-danger">{{ errors.imagePath }}</div>
            </div>
            <!-- Product Type Select -->
            <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <select class="form-control" id="type" v-model="type">
                    <option value="">Select Type</option>
                    <option value="Football Boots">Football Boots</option>
                    <option value="Football Shirt">Football Shirt</option>
                </select>
                <div v-if="errors.type" class="text-danger">{{ errors.type }}</div>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary w-100">Add Product</button>
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/axios.js'; // Importing axios instance for API calls
import Swal from 'sweetalert2'; // Importing SweetAlert for alerts

export default {
    data() {
        return {
            name: '', // Product name
            price: '', // Product price
            brand: '', // Product brand
            imagePath: '', // Product image path
            type: '', // Product type
            errors: {} // Form validation errors
        };
    },
    methods: {
        // Method to validate form fields and submit the form
        validateAndSubmit() {
            this.errors = {};

            // Validate product name
            if (!this.name) {
                this.errors.name = 'Product name is required';
            }

            // Validate product price
            if (!this.price || isNaN(this.price) || parseFloat(this.price) <= 0) {
                this.errors.price = 'Price must be a positive number';
            }

            // Validate product brand
            if (!this.brand) {
                this.errors.brand = 'Brand is required';
            }
            // Validate product type
            if (!this.type) {
                this.errors.type = 'Type is required';
            }

            // Check if there are no validation errors
            if (Object.keys(this.errors).length === 0) {
                this.addProduct();
            }
        },
        // Method to add a new product
        async addProduct() {
            try {
                await axiosInstance.post('/products/add-product', {
                    name: this.name,
                    price: parseFloat(this.price),
                    brand: this.brand,
                    imagePath: this.imagePath,
                    type: this.type
                });
                // Show success message
                Swal.fire('Success', 'Product added successfully', 'success');
                // Reset form fields
                this.name = '';
                this.price = '';
                this.brand = '';
                this.imagePath = '';
                this.type = '';
            } catch (error) {
                console.error('Failed to add product', error);
                // Show error message
                Swal.fire('Error', 'Failed to add product', 'error');
            }
        }
    }
};
</script>

<style scoped src="@/assets/styles/addproduct.css"></style>
