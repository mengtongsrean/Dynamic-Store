<!-- <template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="phone" required>
        </div>
        <div>
          <label for="role">Role:</label>
          <select id="role" v-model="role" required>
            <option>Customer</option>
            <option>Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p>
        Already have an account? <router-link to="/login-page">Login here</router-link>.
      </p>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js'

  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'Customer',
        error: '',
      };
    },
    methods: {
      async register() {
        try {
          const response = await axiosInstance.post('/users/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone,
            role: this.role,
          });
          // Save user data in localStorage or vuex store
          localStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/profile');
        } catch (error) {
          this.error = 'Registration failed';
        }
      },
    },
  };
  </script>
   -->

   <template>
    <div class="register-container my-5">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" class="form-control">
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control">
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="phone" class="form-control">
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="role" class="form-control">
            <option>Customer</option>
            <option>Admin</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <ul v-if="errors.length" class="text-danger">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <p>
        Already have an account? <router-link to="/login-page">Login here</router-link>.
      </p>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js'
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'Customer',
        errors: [],
      };
    },
    methods: {
      validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
      },
      validatePassword(password) {
        const pwdPattern = /(?=.*[\$%\^&\*]).{8,}/;
        return pwdPattern.test(password);
      },
      validatePhone(phone) {
        const phonePattern = /^04\d{8}$/;
        return phonePattern.test(phone);
      },
      validateForm() {
        this.errors = [];
  
        const namePattern = /^[A-Za-z]+$/;
  
        if (!this.username || !this.username.match(namePattern)) {
          this.errors.push("Username must contain only letters and is required.");
        }
        if (!this.email || !this.validateEmail(this.email)) {
          this.errors.push("Must be in email format and is required.");
        }
        if (!this.password || !this.validatePassword(this.password)) {
          this.errors.push("Password must be at least 8 characters and include at least one special character ($, %, ^, &, *).");
        }
        if (this.password !== this.confirmPassword) {
          this.errors.push("Passwords do not match.");
        }
        if (!this.phone || !this.validatePhone(this.phone)) {
          this.errors.push("Mobile number must be 10 digits and start with 04.");
        }
  
        return this.errors.length === 0;
      },
      async register() {
        if (!this.validateForm()) {
          return;
        }
  
        try {
          const response = await axiosInstance.post('/users/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone,
            role: this.role,
          });
  
          if (response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.$router.push('/');
          } else {
            this.errors.push('Unexpected response from server.');
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errors.push(error.response.data.message);
          } else {
            this.errors.push('Registration failed.');
          }
          console.error('Error during registration:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .text-danger {
    color: #dc3545;
  }
  </style>
  