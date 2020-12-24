const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aureroux13@gmail.com',
    subject: 'Thanks for joining us!',
    text: `Welcome ${name}, happy you are here`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aureroux13@gmail.com',
    subject: 'So sad to see you leave...',
    html: `
    <h1>Oh no</h1>
    <p>please ${name} don't go!</p>
    `
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}
