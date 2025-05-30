<script setup>
import { RouterLink, RouterView } from "vue-router";
import AuthComponent from "./views/AuthComponent.vue";
import IndexComponent from "./views/IndexComponent.vue";
import MessageComponent from "./views/MessageComponent.vue";
import MyProfileComponent from "./views/MyProfileComponent.vue";
import UserProfileComponent from "./views/UserProfileComponent.vue";
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/auth">Login & Register</RouterLink>
        <RouterLink to="/index">Index</RouterLink>
        <RouterLink to="/messages">Messages</RouterLink>
        <RouterLink to="/myprofile">My Profile</RouterLink>
        <RouterLink to="/userprofile">User Profile</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<script>
export default {
  methods: {
    clickMe() {
      alert(0);
    },
  },
};
</script>

<style scoped></style>
