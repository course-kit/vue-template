const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const fetch = require('node-fetch')

const courses = [
  // Photography for beginners
  {
    priceId: process.env.COURSE_1_PRICE_ID,
    enrollmentUrl: process.env.COURSE_1_ENROLLMENT_URL,
  },
  // Advanced photography
  {
    priceId: process.env.COURSE_2_PRICE_ID,
    enrollmentUrl: process.env.COURSE_2_ENROLLMENT_URL,
  },
]

async function getPriceIdFromEvent(eventObject) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(eventObject.id, {
    expand: ['line_items'],
  })
  return checkoutSession.line_items.data[0].price.id
}

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
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (stripeEvent.type === 'checkout.session.completed') {
      const priceId = await getPriceIdFromEvent(stripeEvent.data.object)
      const { enrollmentUrl } = courses.find((course) => course.priceId === priceId)
      const { email } = stripeEvent.data.object.customer_details
      await enrollUser(enrollmentUrl, email)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}
