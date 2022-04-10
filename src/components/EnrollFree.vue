<script setup>
import { VueFinalModal } from 'vue-final-modal'
import {
  XIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/solid'
import { ref } from "vue";
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
  loading.value = true
  try {
    const { status } = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, courseId: props.courseId }),
    })
    submitted.value = true
    if (status !== 200) {
      error.value = true
    } else {
      email.value = false
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
      classes="modal-container"
      content-class="modal-content"
    >
      <div class="close">
        <XIcon @click="show = false" />
      </div>
      <div>
        <p>Please enter your email address to enroll in this course.</p>
        <div class="form">
          <input
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
      <div v-if="submitted && !error" className="alert success">
        <CheckCircleIcon />
        <span>
          Success! Please check your email to activate your course.
        </span>
      </div>
      <div v-if="submitted && error" className="alert error">
        <ExclamationCircleIcon />
        <span>Submission failed. Please try again later.</span>
      </div>
    </vue-final-modal>
  </span>
</template>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 2rem;
  border: 1px solid var(--color-subtle-medium);
  border-radius: 0.25rem;
  background: var(--color-back);
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

:deep(.modal-content .alert) {
  margin: 2rem 0 1rem;
  padding: 2rem;
  border-radius: var(--border-radius);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

:deep(.modal-content .alert.success) {
  background: var(--color-correct-light);
  color: var(--color-correct-dark);
}

:deep(.modal-content .alert.error) {
  background: var(--color-incorrect-light);
  color: var(--color-incorrect-dark);
}

:deep(.modal-content .alert svg) {
  height: 20px;
  width: 20px;
  flex-shrink: 0;
}


:deep(.modal-content p) {
  margin: 2rem 0;
  font-size: var(--font-size-xs);
  color: var(--color-front);
  text-align: center;
}

:deep(.modal-content .close) {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

:deep(.modal-content .close svg) {
  height: 20px;
  width: 20px;
  color: var(--color-subtle-dark);
  position: absolute;
  cursor: pointer;
}

:deep(.modal-content .form) {
  display: flex;
  flex-direction: column;
}

:deep(.modal-content input[type=text]) {
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: var(--font-size-xs);
  color: var(--color-front);
  line-height: 1;
  border: 1px solid var(--color-subtle-medium);
  border-radius: var(--border-radius);
}

:deep(.modal-content button) {
  line-height: 1.4;
}

:deep(.modal-content button .loading) {
  width: 6px;
  height: 6px;
  border: 4px solid transparent;
  border-top-color: var(--color-back);
  border-radius: 50%;
  animation: spinner 1s ease infinite;
  display: inline-block;
  margin-left: 0.5rem;
}

:deep(.modal-content input[type=text]:focus) {
  outline: var(--color-theme)
}

</style>
