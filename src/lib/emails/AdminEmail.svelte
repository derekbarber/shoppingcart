<script>
	import { Button, Hr, Html, Text } from 'svelty-email';

	export let name = 'Admin';
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
	<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>