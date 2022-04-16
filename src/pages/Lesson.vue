<script setup>
import LessonUnauthorized from '../components/LessonUnauthorized.vue'
import LessonForbidden from '../components/LessonForbidden.vue'
import LessonContent from '../components/LessonContent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { fetchCourseLessonAndUser } from '../ck'
const { courseId, lessonId }  = route.params
const { lesson, course, lessonStatus, user } = await fetchCourseLessonAndUser({ courseId, lessonId })
</script>

<template>
  <div class="Lesson page">
    <header>
      <p>
        <router-link :to="'/courses/' + course.id">Back to {{ course.title }}</router-link>
      </p>
      <h1>{{ lesson.title }}</h1>
    </header>
    <div>
      <LessonUnauthorized v-if="lessonStatus === 401" :course-id="courseId" :user="user" />
      <LessonForbidden v-else-if="lessonStatus === 403" :course-id="courseId" :user="user" />
      <LessonContent v-else />
    </div>
  </div>
</template>
