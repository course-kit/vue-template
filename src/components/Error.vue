<script setup>

</script>

<template>
  <div class="Error">
    <div>
      <h1>500 Error</h1>
      <p>
        If you're the developer of this school, ensure that your CourseKit
        account is active and correctly connected.
      </p>
      <a href="https://dashboard.coursekit.dev">Go to CourseKit dashboard</a>
    </div>
  </div>
</template>

<style>


.Error {
  display: flex;
  justify-content: center;
}

.Error > div {
  border: 1px solid var(--color-subtle-medium);
  border-radius: var(--border-radius);
  padding: 3rem 2em;
  width: 66%;
  font-size: var(--font-size-sm);
  text-align: center;
  color: var(--color-front)
}

.Error h1 {
  margin-top: 0
}

.Error p {
  color: var(--color-subtle-dark);
}
</style>
