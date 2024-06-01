<!-- <template>
  <section class="h-100" style="background-color: #eee;">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
  
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Past Orders</h3>
            <div>
              <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                    class="fas fa-angle-down mt-1"></i></a></p>
            </div>
          </div>
  
          <div class="card rounded-3 mb-4">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">Basic T-shirt</p>
                  <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button class="btn btn-link px-2">
                    <i class="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" />
  
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">$499.00</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card rounded-3 mb-4">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">Basic T-shirt</p>
                  <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" />
  
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">$499.00</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card rounded-3 mb-4">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">Basic T-shirt</p>
                  <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" />
  
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">$499.00</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card rounded-3 mb-4">
            <div class="card-body p-4">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">Basic T-shirt</p>
                  <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" />
  
                  <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">$499.00</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <router-link to="/cart-page" class="text-primary"><i class="bi bi-bag-check-fill"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>
<script>
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer
  }
}
</script> -->

<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Past Orders</h1>
    <div v-if="!isAuthenticated" class="text-center">
      <p>You need to <router-link to="/login-page">login</router-link> or <router-link to="/register-page">register</router-link> to view your past orders.</p>
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
                <td><img :src="getImagePath(product.imagePath)" alt="Product Image" class="img-thumbnail" style="max-width: 100px;"></td>
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
import axiosInstance from '@/axios.js';

export default {
  data() {
    return {
      previousOrders: [],
      loading: true,
      error: null,
      isAuthenticated: !!localStorage.getItem('token')
    };
  },
  methods: {
    getImagePath(imagePath) {
      return require(`@/assets/images/product-images/${imagePath}`);
    }
  },
  async created() {
    if (this.isAuthenticated) {
      try {
        const response = await axiosInstance.get('/users/previous-orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.previousOrders = response.data || [];
      } catch (error) {
        this.error = 'Failed to load past orders.';
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }
};
</script>

<style scoped src="@/assets/styles/pastorders.css"></style>

