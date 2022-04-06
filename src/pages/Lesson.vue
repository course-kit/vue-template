<script setup>
import LessonUnauthorized from '../components/LessonUnauthorized.vue'
import LessonForbidden from '../components/LessonForbidden.vue'
import LessonContent from '../components/LessonContent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { fetchCourseLessonAndUser } from '../ck'
const { courseId, lessonId }  = route.params
const { course, lesson, lessonStatus, user } = await fetchCourseLessonAndUser({ courseId, lessonId })
const { title } = lesson
</script>

<template>
  <div class="Lesson page">
    <header>
      <p>
        <router-link :to="'/courses/' + course.id">Back to {{ course.title }}</router-link>
      </p>
      <h1>{{ title }}</h1>
    </header>
    <div>
      <LessonUnauthorized v-if="lessonStatus === 401" :courseId="courseId" :user="user" />
      <LessonForbidden v-else-if="lessonStatus === 403" :courseId="courseId" />
      <LessonContent v-else :course="course" :lesson="lesson" />
    </div>
  </div>
</template>
