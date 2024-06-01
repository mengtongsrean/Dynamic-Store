<template>
  <div class="col-md-8 col-lg-6 col-xl-4">
    <div class="card text-black">
      <div class="img-container">
        <img :src="getImagePath(product.imagePath)" :alt="product.name" class="card-img-top" />
        <button class="like-btn" @click="addToFavorites(product)">
          <i class="bi bi-heart"></i>
        </button>
      </div>
      <div class="card-body">
        <div class="text-center">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="text-muted">{{product.brand}}</p>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <p class="text-muted">Review</p>
          <div class="text-muted"><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i></div>
        </div>
        <div class="d-flex justify-content-between">
          <div>Price</div>
          <div>${{product.price}}</div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <input type="number" placeholder="Qty" style="text-align:center; border-radius:10px; border:1px solid" class="form-control w-25" v-model.number="quantity">
          <button class="btn-add-to-cart" type="button" @click="addToCart(product.name, quantity, product.imagePath)">
            <i class="bi bi-cart"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios.js';

export default {
  props: ['product', 'addToCart'],
  data () {
    return {
      quantity: 0,
    }
  },
  methods: {
    getImagePath(imagePath) {
      return require(`@/assets/images/product-images/${imagePath}`);
    },
    async addToFavorites(product) {
      if (!localStorage.getItem('token')) {
        alert('You need to log in to add favorites');
        return;
      }
      try {
        const response = await axiosInstance.post('/users/add-favourite-items', {
          productId: product._id,
          name: product.name,
          price: product.price,
          imagePath: product.imagePath,
          brand: product.brand,
          type: product.type,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Product added to favorites');
      } catch (error) {
        console.error('Failed to add to favorites', error);
        alert('Failed to add to favorites');
      }
    }
  }
}
</script>

<style src="@/assets/styles/productcard.css"></style>
