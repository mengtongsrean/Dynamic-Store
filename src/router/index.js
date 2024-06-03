import { createRouter, createWebHistory } from 'vue-router'
import Products from '@/views/Products.vue'
import PastOrders from '@/views/PastOrders.vue'
import LoginPage from '@/views/LoginPage.vue'
import CartPage from '@/views/CartPage.vue'
import Profile from '@/views/Profile.vue'
import HomePage from '@/views/HomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import FavouritesPage from '@/views/FavouritesPage.vue'
import AddProduct from '@/views/AddProduct.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/past-orders',
    name: 'PastOrders',
    component: PastOrders
  },
  {
    path: '/cart-page',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login-page',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register-page',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/favourites',
    name: 'FavouritesPage',
    component: FavouritesPage
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
