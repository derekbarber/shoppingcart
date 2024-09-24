import { render } from 'svelte-email';
import UserEmail from '$lib/emails/UserEmail.svelte';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


const emailHtml = render({
	component: Hello,
	props: {
		name: 'Svelte'
	}
});

const options = {
	Source: 'you@example.com',
	Destination: {
		ToAddresses: ['user@gmail.com']
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

const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();

export async function GET() {
	new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();
}