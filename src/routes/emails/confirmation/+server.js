import { Resend } from 'resend';

const resend = new Resend('re_caxSRCyD_53aJRtXz68CKmATZdtcXwehk');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

  //console.log("REQUEST!!!!")
  //console.log(event.request)

  const data = await request.json();

	console.log(data);

  let order_html = `<p><strong>The following order was placed for Shopping Cards</strong></p>\
    <p>Details of Purchase:</p>
    <p><strong>Name:</strong> ${data.name}<br>\
      <strong>Email:</strong> ${data.email}<br>\
      <strong>Phone Number:</strong> ${data.phone_number}<br>\
      <strong>How Are they Paying:</strong> ${data.how_paying}<br>\
      <strong>Pickup Location:</strong> ${data.pickup_location}</p>`

  if (data.how_paying == 'etransfer' && data.need_passphrase) {
    order_html += `<p><strong>Do they need the passphrase?</strong> YES</p>`
  } else if (data.how_paying == 'etransfer') {
    order_html += `<p>Do they need the passphrase?</strong> NO</p>`
  }

  order_html += `<p><strong>Shopping Cards Requested:</strong></p>`
  order_html += `<ul>`
  for (const purchased_card of data.purchased_cards) {
    order_html += `<li><strong>${purchased_card.name}:</strong> ${purchased_card.value} x ${purchased_card.quantity}</li>`
  }
  order_html += `</ul>`

  order_html += `<p><strong>TOTAL COST: $${data.total_cost}</strong></p>`

  const { result1, error1 } = resend.emails.send({
    from: 'cards@pbcards.ca',
    to: 'derekbarber@gmail.com',
    //to: ['ecoatta@telus.net', 'derekbarber@gmail.com'],
    subject: 'Precious Blood Parish - Shopping Card Order Received',
    html: order_html
  });

  if (error1) {
    console.error({ error1 });
  }

  console.log({ result1 });

  let confirmation_html = `<p><strong>Thank you for placing an order for Shopping Cards. We have received your order successfully.</strong></p>`
  confirmation_html += `<p><strong>You Requested the following Shopping Cards</strong></p>`
  confirmation_html += `<ul>`
  for (const purchased_card of data.purchased_cards) {
    confirmation_html += `<li>${purchased_card.name}: ${purchased_card.value} x ${purchased_card.quantity}</li>`
  }
  confirmation_html += `</ul>`

  if (data.how_paying == 'etransfer') {
    confirmation_html += `<p>As you specified payment via e-transfer, we would appreciate if you would send the e-transfer before coming to pick up your cards at your specified time.</p>`
  } else {
    confirmation_html += `<p>Please bring your payment for the cards when you come to pick up at your specified time.</p>`
  }

  confirmation_html += `<strong>Your Pickup Location and Time:</strong> ${data.pickup_location}</p>`

  confirmation_html += `<p><strong>If you do not hear from us, please assume your order will be ready for pickup at your specified location and time.</strong></p>`

  confirmation_html += `<p>Don't hesitate to reach out to Earl Coatte at ecoatta@telus.net if you have any questions or concerns.</p>`
  confirmation_html += `<p>Thank you</p>`

  const { result2, error2 } = resend.emails.send({
    from: 'cards@pbcards.ca',
    to: data.email,
    subject: 'Precious Blood Parish - Shopping Card Order Confirmation',
    html: confirmation_html
  });

  if (error2) {
    console.error({ error2 });
  }

  console.log({ result2 });

  return new Response(JSON.stringify({ message: "Success" }), { status: 200 })
};