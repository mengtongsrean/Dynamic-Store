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
                                    <button class="btn btn-danger" @click="logout">Logout</button>
                                </div>
                            </div>
                            <div class="col-md-4 gradient-custom text-center text-white profile-image-section">
                                <img src="@/assets/images/profile.png" alt="user-profile"
                                    class="img-fluid my-5 profile-image" />
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
            user: JSON.parse(localStorage.getItem('user')) || {} // Retrieve user data from local storage
        };
    },
    methods: {
        editProfile() {
            // Navigate to edit profile page
            this.$router.push('/edit-profile');
        },
        logout() {
            // Remove token and user data from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login page
            this.$router.push('/login-page');
        }
    }
};
</script>

<style scoped src="@/assets/styles/profile.css"></style>
