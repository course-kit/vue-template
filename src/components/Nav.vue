<script setup>
import { fetchUser } from '../ck'
const { user } = await fetchUser()
const isAuthenticated = user.isAuthenticated()
</script>

<template>
  <nav class="Nav">
    <button v-if="isAuthenticated" class="button auth" @click="user.logoutRedirect">
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
