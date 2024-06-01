<template>
  <section id="hero" class="hero d-flex align-items-center section-bg">
    <div class="container">
      <div class="row justify-content-between gy-5">
        <div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
          <h2>Dynamic Store</h2>
          <p>We are football store, Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
          <div>
            <router-link to="/products" class="check-products">See Products</router-link>
          </div>
        </div>
        <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
          <!-- <img src="@/assets/images/jersey1.jpg" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300"> -->
          <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="@/assets/images/slide1.jpg" class="d-block w-100 img-fluid" alt="slide-image1">
              </div>
              <div class="carousel-item">
                <img src="@/assets/images/slide2.jpg" class="d-block w-100 img-fluid" alt="slide-image2">
              </div>
              <div class="carousel-item">
                <img src="@/assets/images/slide3.jpg" class="d-block w-100 img-fluid" alt="slide-image3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section><!-- End Hero Section -->

  <section style="background-color:eee">
    <div class="container py-5">
      <div class="row">
        <h2 class="text-center pb-5">Recommended Products</h2>
      </div>
      <div class="row justify-content-center">
        <ProductCard
        v-for="(product, index) in inventory.slice(0,3)"
        :key="product.id"
        :index="index"
        :product="product"
        :addToCart="addToCart">
      </ProductCard>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import Footer from '@/components/Footer.vue';
export default {
  props: ['inventory', 'addToCart'],
  components: {
    ProductCard,
    Footer
  }
}
</script>

<style src="@/assets/styles/homepage.css">
</style>