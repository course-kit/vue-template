<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ChevronDoubleRightIcon } from '@heroicons/vue/solid'
const props = defineProps({
  lesson: {
    type: Object,
    required: true
  },
  course: {
    type: Object,
    required: true
  }
})
async function completeAndContinue() {
  const success = await props.lesson.markComplete()
  if (success) {
    const nextLessonId = props.course.nextLessonId
    router.push(`/courses/${props.course.id}/lessons/${nextLessonId}`)
  }
}
</script>

<template>
  <div className="Content">
    <Vimeo v-if="lesson.meta.vimeoId" :video="lesson.meta.vimeoId" responsive />
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
