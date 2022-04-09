<script setup>
import { ref, watch } from 'vue'
import LessonUnauthorized from '../components/LessonUnauthorized.vue'
import LessonForbidden from '../components/LessonForbidden.vue'
import LessonContent from '../components/LessonContent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { fetchCourseLessonAndUser } from '../ck'
const { courseId, lessonId }  = route.params
const lessonStatus = ref(null)
const course = ref(null)
const lesson = ref(null)
const user = ref(null)
const title = ref('')
const loadData = async ({ courseId, lessonId }) => {
  if (courseId && lessonId) {
    const response = await fetchCourseLessonAndUser({ courseId, lessonId })
    lessonStatus.value = response.lessonStatus
    lesson.value = response.lesson
    course.value = response.course
    user.value = response.user
    title.value = lesson.value.title
  }
}
await loadData({ courseId, lessonId })
watch(() => route.params, await loadData,)
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
      <LessonUnauthorized v-if="lessonStatus === 401" :course-id="courseId" :user="user" />
      <LessonForbidden v-else-if="lessonStatus === 403" :course-id="courseId" />
      <LessonContent v-else :course="course" :lesson="lesson" />
    </div>
  </div>
</template>
