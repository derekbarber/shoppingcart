import { Resend } from 'resend';

const resend = new Resend('re_caxSRCyD_53aJRtXz68CKmATZdtcXwehk');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

  const data = await request.json();
  //console.log(data);

  let order_html = `<p style="font-size: 16px;"><strong>The following order was placed for Shopping Cards</strong></p>\
    <p style="font-size: 15px;">Details of Purchase:</p>
    <p style="font-size: 14px; line-height: 1.5; margin-left: 10px;"><strong>Name:</strong> ${data.name}<br>\
      <strong>Email:</strong> ${data.email}<br>\
      <strong>Phone Number:</strong> ${data.phone_number}<br>\
      <strong>How Are they Paying:</strong> ${data.how_paying}<br>\
      <strong>Pickup Location:</strong> ${data.pickup_location}</p>`

  if (data.memo.length > 0) {
    order_html += `<p style="font-size: 14px; line-height: 1.5; margin-left: 10px;"><strong>Memo:</strong> ${data.memo}</p>`
  }

  if (data.how_paying == 'etransfer' && data.need_passphrase) {
    order_html += `<p style="font-size: 15px;"><strong>Do they need the passphrase?</strong> <span style="color: red; font-weight: 600;">YES</span></p>`
  } else if (data.how_paying == 'etransfer') {
    order_html += `<p style="font-size: 15px;">Do they need the passphrase?</strong> <span style="color: blue; font-weight: 600;">NO</span></p>`
  }

  order_html += `<p style="font-size: 15px;"><strong>Shopping Cards Requested:</strong></p>`
  order_html += `<ul>`
  for (const purchased_card of data.purchased_cards) {
    order_html += `<li style="font-size: 14px;"><strong>${purchased_card.name}:</strong> ${purchased_card.value} x ${purchased_card.quantity}</li>`
  }
  order_html += `</ul>`

  order_html += `<p style="font-size: 15px;"><strong>TOTAL COST: $${data.total_cost}</strong></p>`

  const { result1, error1 } = await resend.emails.send({
    from: 'cards@pbcards.ca',
    //to: ['ecoatta@telus.net', 'derekbarber@gmail.com'],
    replyTo: data.email,
    to: ['derekbarber@gmail.com'],
    subject: 'Precious Blood Parish - Shopping Card Order Received',
    html: order_html
  });

  if (error1) {
    console.error({ error1 });
  }

  console.log({ result1 });

  let confirmation_html = `<p style="font-size: 16px;"><strong>Thank you for placing an order for Shopping Cards. We have received your order successfully.</strong></p>`
  confirmation_html += `<p style="font-size: 15px;"><strong>You Requested the following Shopping Cards</strong></p>`
  confirmation_html += `<ul>`
  for (const purchased_card of data.purchased_cards) {
    confirmation_html += `<li style="font-size: 14px;">${purchased_card.name}: ${purchased_card.value} x ${purchased_card.quantity}</li>`
  }
  confirmation_html += `</ul>`

  confirmation_html += `<p style="font-size: 15px;"><strong>TOTAL COST: $${data.total_cost}</strong></p>`

  if (data.how_paying == 'etransfer' && data.need_passphrase) {
    confirmation_html += `<p style="font-size: 14px;">As you specified payment via e-transfer, you can send the e-transfer to email address <strong>ecoatta@telus.net</strong>. `
    confirmation_html += `Also, as you have requested the passphrase Earl Coatta will contact you shortly at your email or phone number and share that with you. To help facilitate order processing `
    confirmation_html += `it is important that you only use the given passphase and not make up your own.</p>`
  } else if (data.how_paying == 'etransfer') {
    confirmation_html += `<p style="font-size: 14px;">As you specified payment via e-transfer, you can send the e-transfer to email address <strong>ecoatta@telus.net</strong>. `
    confirmation_html += `Please ensure you use the exact passphrase you were given to help facilitate order processing.</p>`
  } else {
    confirmation_html += `<p style="font-size: 14px;">Please bring your payment for the cards when you come to pick them up at your specified time.</p>`
  }

  confirmation_html += `<p style="font-size: 14px;"><strong>Your Pickup Location and Time:</strong> ${data.pickup_location}</p>`

  confirmation_html += `<p style="font-size: 15px;"><strong>If you do not hear from us, please assume your order will be ready for pickup at your specified location and time.</strong></p>`

  confirmation_html += `<p style="font-size: 14px;">Don't hesitate to reach out to Earl Coatta at ecoatta@telus.net if you have any questions or concerns.</p>`
  confirmation_html += `<p style="font-size: 14px;">Thank you for supporting Precious Blood Parish!</p>`

  const { result2, error2 } = await resend.emails.send({
    from: 'cards@pbcards.ca',
    to: data.email,
    replyTo: 'ecoatta@telus.net',
    subject: 'Precious Blood Parish - Shopping Card Order Confirmation',
    html: confirmation_html
  });

  if (error2) {
    console.error({ error2 });
  }

  console.log({ result2 });

  return new Response(JSON.stringify({ message: "Success" }), { status: 200 })
};