<script setup>
defineProps({
  courseId: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="LessonNoAccess">
    <div>
      Please
      <span
        class="underline cursor-pointer"
        @click="user.enrollRedirect(courseId)"
      >enroll</span>
      to view this lesson.
    </div>
  </div>
</template>

<style>
.LessonNoAccess {
  display: flex;
  justify-content: center;
}

.LessonNoAccess > div {
  border: 1px solid var(--color-subtle-medium);
  border-radius: var(--border-radius);
  padding: 3rem 2em;
  width: 66%;
  font-size: var(--font-size-sm);
  text-align: center;
  color: var(--color-front)
}
</style>
