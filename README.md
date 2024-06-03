# Dynamic-Store

## Front - End

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Install sweetAlert2

```
npm install sweetalert2
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Back - End

### project setup
```
npm install
```
### start the server
```
npm run serve
```
### Install Moment.js for time formatting

```
npm install moment

```
### Insert Data to MongoDB via Mongos
If you don't have `mongos` installed, you can install it via Homebrew (for macOS):

```
brew install mongos 
```

### Connect to MongoDB using `mongosh`
Use the following command to connect to your MongoDB cluster:
```
mongosh "mongodb+srv://atlascluster.9bxn7gs.mongodb.net/" --apiVersion 1 --username mengtong
```
### MongoDB password
mengtong1234


### Additional Notes
- Ensure that your MongoDB server is running before starting the back-end server.
- Replace the placeholder values in the configuration files with your actual values (e.g., database connection strings, JWT secret keys).

### Environment Variables
For deployment, ensure to replace any environment variables used in your application directly in the code or through your deployment service's environment variable settings.

## Deployment
For deploying the application, ensure that all environment variables are correctly set up and the build process is followed for both front-end and back-end.

```
npm run build
```


### Files Structure
```
football-store-app
├─ backend
│  ├─ app.js
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ productController.js
│  │  └─ userController.js
│  ├─ middleware
│  │  └─ auth.js
│  ├─ models
│  │  ├─ productModel.js
│  │  └─ userModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ productRoutes.js
│  │  └─ userRoutes.js
│  └─ server.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ add-to-cart.svg
│  │  │  ├─ add-to-fav.svg
│  │  │  ├─ brand-no-bg.svg
│  │  │  ├─ brand.svg
│  │  │  └─ favorite-svgrepo-com.svg
│  │  ├─ images
│  │  │  ├─ product-images
│  │  │  │  ├─ default.jpg
│  │  │  │  ├─ image1.jpg
│  │  │  │  ├─ image10.jpg
│  │  │  │  ├─ image2.jpg
│  │  │  │  ├─ image3.jpg
│  │  │  │  ├─ image4.jpg
│  │  │  │  ├─ image5.jpg
│  │  │  │  ├─ image6.jpg
│  │  │  │  ├─ image7.jpg
│  │  │  │  ├─ image8.jpg
│  │  │  │  └─ image9.jpg
│  │  │  ├─ profile.png
│  │  │  ├─ slide1.jpg
│  │  │  ├─ slide2.jpg
│  │  │  ├─ slide3.jpg
│  │  │  ├─ slide4.jpg
│  │  │  ├─ slide5.jpg
│  │  │  └─ slide6.jpg
│  │  └─ styles
│  │     ├─ addproduct.css
│  │     ├─ addtocartbutton.css
│  │     ├─ cartpage.css
│  │     ├─ favouritespage.css
│  │     ├─ footer.css
│  │     ├─ homepage.css
│  │     ├─ loginpage.css
│  │     ├─ navbar.css
│  │     ├─ pastorders.css
│  │     ├─ productcard.css
│  │     ├─ products.css
│  │     ├─ profile.css
│  │     └─ registerpage.css
│  ├─ axios.js
│  ├─ components
│  │  ├─ AddToCartButton.vue
│  │  ├─ Footer.vue
│  │  ├─ NavBar.vue
│  │  └─ ProductCard.vue
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  └─ views
│     ├─ AddProduct.vue
│     ├─ CartPage.vue
│     ├─ FavouritesPage.vue
│     ├─ HomePage.vue
│     ├─ LoginPage.vue
│     ├─ PastOrders.vue
│     ├─ Products.vue
│     ├─ Profile.vue
│     └─ RegisterPage.vue
└─ vue.config.js

```

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact
For any inquiries, please contact mengtongsrean17@gmail.com.