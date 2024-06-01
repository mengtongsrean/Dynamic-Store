<template>
    <div id="app">
      <NavBar :totalQuantity="totalQuantity" />
      <router-view :inventory="inventory" :addToCart="addToCart" :cart="cart"  :removeitem="removeItem" :totalquantity="totalQuantity"/>
    </div>
  </template>
  
  <script>
import NavBar from '@/components/NavBar.vue'
import axiosInstance from './axios.js';
  
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        inventory: [],
        cart: {}
      };
    },
    async created() {
      const response = await axiosInstance.get('/products');
      this.inventory = response.data;
    },
    computed: {
      totalQuantity() {
        return Object.values(this.cart).reduce((acc, curr) => {
          return acc + curr;
        }, 0);
      }
    },
    methods: {
      addToCart(name, quantity) {
        if (!this.cart[name]) this.cart[name] = 0;
        this.cart[name] += quantity;
      },
      removeItem(name) {
        delete this.cart[name];
      }
    }
  };
  </script>
  
  