const fetch = require('node-fetch')

const courses = [
  // Photography for beginners
  {
    courseId: process.env.COURSE_1_ID,
    enrollmentUrl: process.env.COURSE_1_ENROLLMENT_URL,
  },
  // Advanced photography
  {
    courseId: process.env.COURSE_2_ID,
    enrollmentUrl: process.env.COURSE_2_ENROLLMENT_URL,
  },
]

async function enrollUser(enrollmentUrl, email) {
  await fetch(enrollmentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}

exports.handler = async ({ body, headers }) => {
  try {
    const { email, courseId } = JSON.parse(body)
    const { enrollmentUrl } = courses.find((course) => course.courseId === courseId)
    await enrollUser(enrollmentUrl, email)

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Enrollment failed with ${err}`)
    return {
      statusCode: 400,
      body: `Function error: ${err.message}`,
    }
  }
}
