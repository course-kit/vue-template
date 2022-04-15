<script setup>
import { ChevronDoubleRightIcon } from '@heroicons/vue/solid'
const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})
const nextLessonPath = `/courses/${props.course.id}/lessons/${props.course.nextLessonId ? props.course.nextLessonId : props.course.lessons[0].id}`
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
    <button
      v-else
      @click="user.enrollRedirect(course.id)"
      class="button primary icon"
    >Enroll now</button>
  </div>
</template>
