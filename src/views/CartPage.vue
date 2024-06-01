<template>
    <section style="background-color:#eee;">
        <div class="container-fluid py-4">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col">
              <div class="card">
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-center mb-5">
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                        </div>
                        <hr class="my-4">
                        <h6 class="text-center" v-if="!Object.keys(cart).length"><em>No items in cart!</em></h6>
                        <div class="row mb-4 d-flex justify-content-between align-items-center" v-for="(quantity, key, i) in cart" :key="i">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                              :src="getImagePath(key)"
                              class="img-fluid rounded-4" alt="Cotton T-shirt">
                          </div>
                          <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                            <h6 class="text-muted">Type</h6>
                            <h6 class="text-black mb-0">{{ key }}</h6>
                          </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                                <h6 class="text-muted">Quantity</h6>
                                <h6 class="mb-0">{{ quantity }}</h6>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                                <h6 class="text-muted">Price</h6>
                                <h6 class="mb-0">$ {{ getPrice(key).toFixed(2) }}</h6>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 text-center">
                                <h6 class="text-muted">Total</h6>
                                <h6 class="mb-0">$ {{ (getPrice(key) * quantity).toFixed(2) }}</h6>
                            </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
      
                        <hr class="my-4">
                        <div class="d-flex justify-content-between pt-3">
                            <h6 class="mb-0" style="color:black;">
                                <router-link to="/">
                                    <i class="bi bi-arrow-left"></i>Back to Products
                                </router-link>
                            </h6>
                            <h6 class="mb-0 text-muted">{{ totalquantity }} items</h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4 bg-grey">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr class="my-4">
      
                        <div class="d-flex justify-content-between mb-5">
                          <h5>TOTAL PRICE</h5>
                          <h5>${{ calculateTotal() }}</h5>
                        </div>
                        <button type="button" class="btn btn-dark btn-block btn-lg">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
<script>
export default {
  props: ['toggle', 'cart', 'inventory', 'removeitem' ,'totalquantity'],
  methods: {
    getPrice(name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.price
    },

    getImagePath(name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return require(`../assets/images/product-images/${product.imagePath}`);
    },

    calculateTotal() {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]))
      }, 0)
      return total.toFixed(2)
    }
  }
}
</script>
<style>
.bg-grey {
    background-color: #eae8e8;
}
</style>
