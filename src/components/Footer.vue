<script setup>
</script>

<template>
  <footer class="Footer">
    <div>
      <ul>
        <li>
          <a href="https://coursekit.dev">Created with CourseKit</a>
        </li>
        <li>
          <a href="https://github.com/course-kit/vue-template">
            Source code
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style>
.Footer {
  background: var(--color-subtle-light);
  width: 100%;
  padding: 3rem 0;
  margin-top: 5.5rem;
  display: flex;
  justify-content: center;
}

.Footer ul {
  padding: 0;
  padding-top: 2rem;
  color: var(--color-subtle-dark);
  margin: 0;
}

.Footer li {
  display: inline;
}

.Footer li:not(:last-child) {
  margin-right: 1rem;
}

.Footer li:not(:last-child):after {
  content: "\B7";
  margin-left: 1rem;
}
</style>
