<script setup>
import { fetchCourseSummaries, fetchUser } from '../ck'
import CourseSummary from '../components/CourseSummary.vue'
const { user } = await fetchUser()
const { courses } = await fetchCourseSummaries()
</script>

<template>
  <div className="Home page">
    <header>
      <h1>CourseKit Vue Template</h1>
    </header>
    <CourseSummary v-for="course in courses" :course="course" :key="course.id" />
  </div>
</template>
