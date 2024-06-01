

<!-- <template>
  <div class="profile-container">
    <div class="profile-card card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2>{{ user.username }}'s Profile</h2>
      </div>
      <div class="card-body">
        <div class="profile-info">
          <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture rounded-circle shadow-sm">
          <div class="profile-details">
            <h3>{{ user.name }}</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
            <p><strong>Role:</strong> {{ user.role }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-secondary" @click="editProfile">Edit Profile</button>
        <button class="btn btn-danger" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}
    };
  },
  methods: {
    editProfile() {
      // Navigate to edit profile page
      this.$router.push('/edit-profile');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.profile-details {
  flex-grow: 1;
}

.profile-details h3 {
  margin-top: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 1.5rem;
}

.card-footer {
  padding: 10px;
}

.btn {
  margin-left: 10px;
}
</style> -->


<template>
  <main class="profile-main">
    <div class="container py-2">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 mb-4">
          <div class="card profile-card shadow-sm">
            <div class="row g-0">
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h6>Profile Information</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <p class="text-muted">{{ user.email }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone</h6>
                      <p class="text-muted"> {{ user.phone }}</p>
                    </div>
                  </div>
                  <h6>Favorite brands</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Recent</h6>
                      <p class="text-muted">Nike</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Most Viewed</h6>
                      <p class="text-muted">Adidas</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-start">
                    <button class="btn btn-secondary" @click="editProfile">Edit Profile</button>
                    <button class="btn btn-danger" @click="logout">Logout</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 gradient-custom text-center text-white profile-image-section">
                <img src="@/assets/images/profile.jpeg" alt="user-profile" class="img-fluid my-5 profile-image" />
                <h5>{{ user.username }}</h5>
                <p>{{ user.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {}
    };
  },
  methods: {
    editProfile() {
      // Navigate to edit profile page
      this.$router.push('/edit-profile');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login-page');
    }
  }
};
</script>

<style scoped src="@/assets/styles/profile.css">
</style>
