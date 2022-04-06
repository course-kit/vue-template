<script setup>
import LessonSummary from '../components/LessonSummary.vue'
import CourseHeader from '../components/CourseHeader.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { fetchCourse } from '../ck'
const courseId = route.params.courseId
const { course } = await fetchCourse({ courseId })
const { title, lessons } = course
</script>

<template>
  <div class="Course page">
    <header>
      <p>
        <router-link :to="{ name: 'home' }">Back to courses</router-link>
      </p>
      <h1>{{ title }}</h1>
      <CourseHeader :course="course" />
    </header>
    <div>
      <LessonSummary
        v-for="(lesson, index) in lessons"
        :courseId="courseId"
        :lesson="lesson"
        :num="index + 1"
        :key="index"
      />
    </div>
  </div>
</template>
