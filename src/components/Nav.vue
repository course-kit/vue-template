<script setup>
import { fetchUser } from '../ck'
const { user } = fetchUser()
</script>

<template>
  <nav class="Nav">
    <button v-if="user.isAuthenticated" class="button auth" @click="user.logoutRedirect">
      Log out
    </button>
    <button v-else class="button auth" @click="user.loginRedirect">
      Log in
    </button>
  </nav>
</template>

<style>
.Nav {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
}
</style>
