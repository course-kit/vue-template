<script setup>
import { VueFinalModal } from 'vue-final-modal'
import {ref} from "vue";
const props = defineProps({
  classes: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  }
})
const show = ref(false)
const loading = ref(false)
const submitted = ref(false)
const error = ref(false)
const email = ref('')

async function handleSubmit(event) {
  const url = '/.netlify/functions/enroll'
  loading.value.vallue = true
  try {
    const { status } = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, courseId: props.courseId }),
    })
    submitted.value = true
    if (status !== 200) {
      error.value = true
    }
  } catch (err) {
    submitted.value = true
    error.value = true
    console.log(err)
  }
  loading.value = false
  event.preventDefault()
}
</script>

<template>
  <span>
    <span :class="classes" @click="show = true">
      {{ text }}
    </span>
    <vue-final-modal
      v-model="show"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
      <div>
        <p>Please enter your email address to enroll in this course.</p>
        <div class="form">
          <input
            value="email"
            type="text"
            name="email"
            placeholder="Your email"
            autoFocus
            @change="email = $event.target.value"
          />
          <button class="button primary" @click="handleSubmit">
            <span>Submit</span>
            <span :class="{ 'loading' : loading }" />
          </button>
        </div>
      </div>
    </vue-final-modal>
  </span>
</template>
