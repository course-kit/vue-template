<template>
  <div class="spinner" />
</template>

<style>
.spinner {
  display: flex;
  justify-content: center;
  margin: 10rem auto;
  width: 20px;
  height: 20px;
  border: 4px solid transparent;
  border-top-color: var(--color-front);
  border-radius: 50%;
  animation: spinner 1s ease infinite;
}

</style>
