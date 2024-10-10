<script>
  import logo from "$lib/images/pb-logo.jpg";

  import { Resend } from 'resend';
  import { categories, cards } from './cards.js'

  const resend = new Resend('re_caxSRCyD_53aJRtXz68CKmATZdtcXwehk');

  let name = ""
  let email = ""
  let how_paying = "etransfer"
  let phone_number = ""
  let need_passphrase = false
  let pickup_location = ""

  let submitted = false

  let errors = []
  let shopping_cards = cards

  let purchased_cards = [];

  function addPurchasedCard(id, name, value, quantity) {
    let purchased_card = {
      id: id,
      name: name,
      value: value,
      quantity: quantity,
    };

    purchased_cards = [...purchased_cards, purchased_card];
  }

  function updatePurchasedCard(id, name, value, quantity) {
    if (quantity > 0) {
      let found_card_index = purchased_cards.findIndex((pc) => pc.id === id);

      if (found_card_index >= 0) {
        purchased_cards[found_card_index] = {
          id: id,
          name: name,
          value: value,
          quantity: quantity,
        };
        totalCost();
      } else {
        addPurchasedCard(id, name, value, quantity);
      }
    } else if (quantity <= 0) {
      let found_card_index = purchased_cards.findIndex((pc) => pc.id === id);
      if (found_card_index >= 0) {
        purchased_cards.splice(found_card_index, 1);
        purchased_cards = purchased_cards;
      }
    }
  }

  function calculateSubtotal(card) {
    let amount = card.value.replace(/[^0-9.-]+/g, "");
    return parseInt(amount, 10) * parseInt(card.quantity, 10);
  }

  function totalCost() {
    console.log(purchased_cards);
    let total = 0;
    purchased_cards.forEach((pc) => {
      let amount = pc.value.replace(/[^0-9.-]+/g, "");
      let subtotal = parseInt(amount, 10) * parseInt(pc.quantity, 10);
      console.log(subtotal);
      total += subtotal;
    });

    return total;
  }

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  function validateForm() {
    errors = []
    if (name.length < 3) {
      errors.push("Please enter a name of at least 3 characters")
    }
    if (email.length == 0 || !validateEmail(email)) {
      errors.push("Please enter a valid email")
    }
    if (phone_number.length <  10) {
      errors.push("Please enter a full 10-digit phone number with area code")
    }
    if (pickup_location.length == 0) {
      errors.push("Please select your pickup time and location")
    }
    if (purchased_cards.length == 0) {
      errors.push("Please select at least one shopping card")
    }
  }

  function submitOrder() {

    validateForm()

    if (errors.length > 0) {
      return false
    }

    submitted = true

    let order_html = `<p>The following order was placed for Shopping Cards.</p><br>\
      <p>Details of Purchaser</p>
      <p>Name: ${name}</p>\
      <p>Email: ${email}</p>\
      <p>Phone Number: ${phone_number}</p><br>\
      <p>How Are they Paying: ${how_paying}</p><br>\
      <p>Pickup Location: ${pickup_location}</p><br>`

    if (how_paying == 'etransfer') {
      order_html += `<p>Do they need the passphrase? ${need_passphrase}</p>`
    }

    order_html += `<br><p>Shopping Cards</p><br>`

    for (const purchased_card of purchased_cards) {
      order_html += `<p> - {purchased_card.name}: {purchased_card.value} x {purchased_card.quantity}</p>`
    }

    order_html += `<br><p>TOTAL COST: ${totalCost()}</p>`

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'derekbarber@gmail.com',
      subject: 'Precious Blood Parish - Shopping Card Order Received',
      html: order_html
    });

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'derekbarber@gmail.com',
      subject: 'Precious Blood Parish - Shopping Card Order Confirmation',
      html: '<p>Thank you for placing an order for Shopping Cards. We have received your order successfully.</p>'
    });
  }


</script>

<div class="flex">
  <img src={logo} alt="Precious Blood Parish Logo" class="w-16 h-16" />
  <div class="ml-3">
    <h1 class="text-xl text-red-800 font-bold">Precious Blood Parish</h1>
    <h1 class="text-3xl text-red-800 font-bold">Shopping Card Order Form</h1>
  </div>
</div>

<div class="bg-amber-50 mt-4">
  <div class="mx-auto max-w-7xl px-6 py-4">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Did you know?
    </h2>
    <div class="mt-10 flex items-center gap-x-6 lg:mt-4 lg:flex-shrink-0">
      200 families spending $150/week through this program instead of their
      credit card can raise over $75,000/year for Precious Blood Parish.
    </div>
  </div>
  <div class="mx-auto max-w-7xl px-6 py-4">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      How does this work?
    </h2>
    <ul class="list-disc list-inside mt-4 ml-2">
      <li class="py-2">
        <span class="font-bold text-lg mr-2">STEP 1: </span>
        Fill out the form below, selecting the gift cards you want along with the
        quantity of cards.
      </li>
      <li class="py-2 text-lg mr-2">
        <span class="font-bold">STEP 2: </span>
        You will receive an email confirmation with your order details. At this point
        you may send an e-Transfer to pay for your cards.
      </li>
      <li class="py-2 text-lg mr-2">
        <span class="font-bold">STEP 3: </span>
        Once your order is fufilled, you will receive a second email with pick-up
        details.
      </li>
      <li class="py-2 text-lg mr-2">
        <span class="font-bold">STEP 4: </span>
        Pick-up your cards and go shopping!
      </li>
    </ul>
  </div>
</div>

{#if submitted}
<div class="mt-6 p-4 border rounded border-green-400 bg-green-50">
  <p class="text-lg font-bold">Thank you for submitted your shopping cart request, it has been sent successfully. Please see your email for a
    confirmation.
  </p>
</div>
{/if}
{:else if errors.length > 0}
  <div class="mt-6 p-4 border rounded border-red-400 bg-red-50">
    <p class="text-lg font-bold">Please fix the following issues with your form:</p>
    <ul class="list-disc p-2 ml-6">
    {#each errors as error}
      <li>{error}</li>
    {/each}
    </ul>
  </div>
  {/if}
<form class="mt-6">
  <div class="space-y-6">
    <div
      class="grid grid-cols-1 gap-x-8 gap-y-10 p-6 border border-gray-900/10 pb-8 md:grid-cols-3 rounded bg-white"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Your Details
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div
        class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
      >
        <div class="sm:col-span-4">
          <label
            for="website"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Full Name</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <input
                type="text"
                name="name"
                id="name"
                bind:value={name}
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              bind:value={email}
              autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="how_paying"
            class="block text-sm font-medium leading-6 text-gray-900"
            >How will be paying for the gift cards?</label
          >
          <div class="mt-2">
            <select
              id="how_paying"
              name="how_paying"
              bind:value={how_paying}
              autocomplete="etransfer"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="etransfer">Interact e-Transfer</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">
            For Cash and Cheque payment options, please bring with you when
            picking up your shopping cards. For e-Transfer, please e-transfer
            the funds before coming to pick up your cards.
          </p>
        </div>

        {#if how_paying === "etransfer"}
        <div class="col-span-full p-4 border border-gray-200 bg-gray-50">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">Interact e-Transfer Passphrase</legend>
          <div class="mt-6 space-y-6">
          <div class="flex items-center gap-x-3">
            <input id="need-password" bind:checked={need_passphrase} name="need-password" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
            <label for="need-password" class="block text-sm font-medium leading-6 text-gray-900">I need the passphrase for eTransfer, please call me.</label>
          </div>
          </div>

          <div class="mt-4">
            <label
              for="phone-number"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone Number</label
            >
            <div class="mt-2">
              <input
              id="phone-number"
              name="phone_number"
              type="text"
              bind:value={phone_number}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              We will call you at this number with the required passphrase for e-Transfer. Please do not send your e-Transfer
              until you receive the passphrase.
            </p>
          </div>
          </fieldset>
          </div>
        {/if}

        <div class="col-span-full">
          <label
            for="pickup-location"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Pick-up location & time</label
          >
          <div class="mt-2">
            <select
              id="pickup-location"
              name="pickup-location"
              bind:value={pickup_location}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">Choose Pickup Location and Time</option>
              <option value="Saturday 4:30pm Mass">Saturday 4:30pm Mass</option>
              <option value="Sunday 9am Mass">Sunday 9:00am Mass</option>
              <option value="Sunday 11am Mass">Sunday 11:00am Mass</option>
              <option value="Earl Coatta's House">Earl Coatta's House</option>
            </select>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">
            Please wait to recieve confirmation of your order before coming to
            pick-up shopping cards at your preferred time.
          </p>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-x-8 gap-y-10 shadow bg-white rounded p-6 border border-gray-900/10 pb-8 md:grid-cols-3"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Shopping Card Selection
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Choose the Shopping Cards for your order.
        </p>
      </div>

      <div
        class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 md:col-span-2"
      >
        {#each categories as category}
          <div class="sm:col-span-2">
            <p class="text-2xl font-bold text-blue-600 uppercase mb-2">
              {category.name}
            </p>

            <div class="grid grid-cols-1 gap-y-3">
              {#each shopping_cards.filter((e) => e.category === category.id) as shopping_card, i}
                <div class="relative flex gap-x-3">
                  <div class="flex h-6 items-center">
                    <input
                      bind:checked={shopping_card.selected}
                      id="shopping_card_{shopping_card.id}"
                      name="shopping_card_{shopping_card.name}"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label
                      for="shopping_card_{shopping_card.id}"
                      class="font-medium text-gray-900"
                    >
                      <span class="text-base">
                        {shopping_card.name}
                      </span>
                      <span class="text-gray-600">
                        ({shopping_card.cards.join(", ")})
                      </span>
                    </label>
                    {#if shopping_card.selected}
                      <div
                        class="border border-gray-50 rounded shadow-lg p-2 mb-4"
                      >
                        <p class="italic py-2 mb-1 text-sm">
                          Enter the number of cards you want
                        </p>
                        <div class="py-2 flex flex-wrap gap-x-3 gap-y-4">
                          {#each shopping_card.cards as card, cardIdx}
                            <div>
                              <span class="text-sm text-gray-700 mr-2"
                                >{card}</span
                              >
                              <input
                                on:change={(e) =>
                                  updatePurchasedCard(
                                    `${shopping_card.id}-${cardIdx}`,
                                    shopping_card.name,
                                    card,
                                    e.target.value
                                  )}
                                type="number"
                                name="{shopping_card.name}_{card}"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0"
                                min="0"
                                max="10"
                              />
                            </div>
                          {/each}
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-x-8 gap-y-10 bg-white-50 p-6 border border-gray-900/10 pb-8 md:grid-cols-3"
    >
      <div>
        <h2 class="text-lg font-semibold leading-7 text-gray-900">
          Order Summary
        </h2>
      </div>

      <div
        class="max-w-2xl space-y-10 md:col-span-2 bg-white shadow rounded py-8 px-6"
      >
        {#if purchased_cards.length > 0}
          <h3 class="text-xl font-semibold text-gray-800">
            Your Selected Cards
          </h3>
          <div class="w-full grid grid-cols-2 py-2 mt-6 gap-y-2">
            {#each purchased_cards as purchased_card}
              <div class="text-lg text-gray-600">
                <span class="text-gray-800 font-semibold"
                  >{purchased_card.name}</span
                >: {purchased_card.value}
                x {purchased_card.quantity}
              </div>
              <div class="text-xl font-bold text-right">
                ${calculateSubtotal(purchased_card)}
              </div>
            {/each}
          </div>
          {#key purchased_cards}
            <div
              class="flex justify-between border-t border-gray-300 py-2 mt-6"
            >
              <div class="text-lg font-bold">TOTAL AMOUNT</div>
              <div class="text-xl font-bold">
                ${totalCost()}
              </div>
            </div>
          {/key}
        {:else}
          <p class="text-lg italic">
            Your shopping card order will be summarized here as you select
            cards.
          </p>
        {/if}
      </div>
    </div>
  </div>




  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button
      type="submit"
      on:click={submitOrder}
      class="rounded-md bg-amber-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >SUBMIT ORDER</button
    >
  </div>
</form>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
