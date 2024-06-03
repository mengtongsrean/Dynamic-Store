<template>
  <section style="background-color: #eee;">
    <div class="container py-4">
      <h1 class="text-center mb-4">Product Page</h1>

      <!-- Search and Filter Section -->
      <div class="row mb-4">
        <div class="col-md-12 mb-2">
          <input type="text" class="form-control" placeholder="Search by name" v-model="searchQuery" />
        </div>
        <div class="col-md-4 mb-2">
          <select class="form-control" v-model="selectedType">
            <option value="">All Types</option>
            <option value="Football Boots">Football Boots</option>
            <option value="Football Shirt">Football Shirt</option>
          </select>
        </div>
        <div class="col-md-4 mb-2">
          <select class="form-control" v-model="selectedBrand">
            <option value="">All Brands</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
        <div class="col-md-4 mb-2">
          <select class="form-control" v-model="selectedPrice">
            <option value="">All Prices</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="!loading && paginatedProducts.length === 0" class="text-center">
        <p>No products found.</p>
      </div>
      <div v-else>
        <div class="row">
          <ProductCard
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :index="index"
            :product="product">
          </ProductCard>
        </div>
        <nav aria-label="Page navigation" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            </li>
            <li class="page-item" v-for="page in visiblePages" :key="page" :class="{ active: currentPage === page }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import Footer from '@/components/Footer.vue'

export default {
  props: ['inventory'], // Inventory prop passed from parent component
  components: {
    ProductCard,
    Footer,
  },
  data() {
    return {
      loading: true, // Loading state for showing spinner
      searchQuery: '', // Search query for filtering products
      selectedType: '', // Selected product type for filtering
      selectedBrand: '', // Selected brand for filtering
      selectedPrice: '', // Selected price order for sorting
      currentPage: 1, // Current page number for pagination
      itemsPerPage: 9, // Number of items to display per page
    }
  },
  computed: {
    filteredProducts() {
      let products = this.inventory;

      // Filter by search query
      if (this.searchQuery) {
        products = products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }

      // Filter by product type
      if (this.selectedType) {
        products = products.filter(product => product.type === this.selectedType);
      }

      // Filter by brand
      if (this.selectedBrand) {
        products = products.filter(product => product.brand === this.selectedBrand);
      }

      // Sort by price
      if (this.selectedPrice) {
        products = products.sort((a, b) => {
          if (this.selectedPrice === 'low') {
            return a.price - b.price;
          } else if (this.selectedPrice === 'high') {
            return b.price - a.price;
          }
          return 0;
        });
      }

      return products;
    },
    paginatedProducts() {
      // Paginate the filtered products
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      // Calculate total number of pages
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    visiblePages() {
      // Calculate visible page numbers for pagination
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    changePage(page) {
      // Change the current page
      this.currentPage = page;
    }
  },
  mounted() {
    this.loading = false; // Set loading to false once component is mounted
  }
}
</script>

<style scoped src="@/assets/styles/products.css"></style>
