import { render } from 'svelte-email';
import Welcome from '$lib/emails/Welcome.svelte';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
});


const emailHtml = render({
	template: Welcome,
	props: {
		firstName: 'John'
	}
});

const options = {
	Source: 'info@pbcards.ca',
	Destination: {
		ToAddresses: ['derekbarber@gmail.com']
	},
	Message: {
		Body: {
			Html: {
				Charset: 'UTF-8',
				Data: emailHtml
			}
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'hello world'
		}
	}
};

//const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();

export async function GET() {
	new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();
}