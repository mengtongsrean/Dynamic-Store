<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="row justify-content-center">
                <ProductCard
                    v-for="(product, index) in inventory.slice(0,10)"
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
import Footer from '@/components/Footer.vue'
export default {
  props: ['inventory', 'addToCart'],
  components: {
    ProductCard,
    Footer
  }
}
</script>
