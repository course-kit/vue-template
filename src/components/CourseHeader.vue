<script setup>
import { ChevronDoubleRightIcon } from '@heroicons/vue/solid'
import EnrollFree from './EnrollFree.vue'
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
const nextLessonPath = `/courses/${props.course.id}/lessons/${props.course.nextLessonId}`
const isFirstLesson = props.course.lessons[0].id === props.course.nextLessonId
</script>

<template>
  <div>
    <div v-if="course.enrolled">
      <div v-html="course.html" />
      <router-link class="button primary icon" :to="nextLessonPath">
        <span>{{ isFirstLesson ? 'Get started' : 'Continue' }}</span>
        <ChevronDoubleRightIcon />
      </router-link>
    </div>
    <EnrollFree v-else
      :courseId="course.id"
      text="Enroll now"
      classes="button primary icon"
    />
  </div>
</template>
