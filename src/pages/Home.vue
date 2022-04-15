<script setup>
import { fetchCourseSummaries, fetchUser } from '../ck'
import CourseSummary from '../components/CourseSummary.vue'
await fetchUser()
const { courses } = await fetchCourseSummaries()
</script>

<template>
  <div class="Home page">
    <header>
      <h1>CourseKit Vue Template</h1>
    </header>
    <CourseSummary v-for="course in courses" :key="course.id" :course="course" />
  </div>
</template>
