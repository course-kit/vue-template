<script setup>
import { useRouter, useRoute } from 'vue-router'
import { vueVimeoPlayer } from 'vue-vimeo-player'
import { ChevronDoubleRightIcon } from '@heroicons/vue/solid'
import { fetchLesson, fetchCourse } from "../ck"
const router = useRouter()
const route = useRoute()
const { courseId, lessonId }  = route.params
const { lesson } = await fetchLesson({ courseId, lessonId })
async function completeAndContinue() {
  const success = await lesson.markComplete()
  const { course } = await fetchCourse({ courseId })
  if (success) {
    const nextLessonId = course.nextLessonId
    if (nextLessonId) {
      router.push(`/courses/${course.id}/lessons/${nextLessonId}`)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }
}
</script>

<template>
  <div className="Content">
    <vue-vimeo-player v-if="lesson.meta.vimeoId" :video-id="lesson.meta.vimeoId" :options="{ responsive: true }" />
    <div class="markdown" v-html="lesson.html" />
    <button class="button primary icon" @click="completeAndContinue">
      <span>Complete and continue</span>
      <ChevronDoubleRightIcon />
    </button>
  </div>
</template>

<style>
.Lesson .Content .markdown {
  padding: 2rem 0 1.5rem;
}

.Lesson .Content p {
  font-size: var(--font-size-sm);
  color: var(--color-subtle-dark);
  margin: 0;
}
</style>
