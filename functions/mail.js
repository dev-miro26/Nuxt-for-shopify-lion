const client = require('@sendgrid/mail')
const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL } = process.env

exports.handler = async function (event) {
  const { email, message, name, phone, token } = JSON.parse(event.body)
  client.setApiKey(SENDGRID_API_KEY)

  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `New message from ${name} (${email})`,
    text: phone,
    html: message
  }

  try {
    if (token) {
      await client.send(data)
      return {
        statusCode: 200,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          /* Required for cookies, authorization headers with HTTPS */
          'Access-Control-Allow-Credentials': true
        },
        body: 'Message sent'
      }
    } else {
      return {
        statusCode: 400,
        headers: {
          /* Required for CORS support to work */
          'Access-Control-Allow-Origin': '*',
          /* Required for cookies, authorization headers with HTTPS */
          'Access-Control-Allow-Credentials': true
        },
        body: 'Recaptcha not detected'
      }
    }
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
