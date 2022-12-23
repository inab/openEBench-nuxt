<template>
	<v-app class="grey lighten-5">
		<v-main>
			<v-container>
				<v-card class="rounded-xl" :elevation="5">
					<v-row align="center">
						<v-col align-self="center" align="left" cols="4" offset="1">
							<div>
								<h1 class="text-h2 font-weight-black">
									{{ error.statusCode }}
								</h1>
								<h2 class="text-h5 mt-5 font-weight-black">Whoops!</h2>
								<p v-if="error.statusCode === 404" class="mt-3">
									{{ pageNotFound }}
								</p>
								<p v-else class="mt-3">
									{{ otherError }}
								</p>
								<v-btn class="mt-5" color="primary" to="/">
									Go back home
								</v-btn>
							</div>
						</v-col>
						<v-col cols="7">
							<v-img
								:src="errorSvg"
								alt="sad human"
								max-width="800"
								max-height="800"
								contain
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import errorSvg from '~/static/images/illustrations/404.svg';

export default {
	name: 'EmptyLayout',
	layout: 'empty',
	props: {
		error: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			errorSvg,
			otherError: 'An error occurred',
			pageNotFound: 'Sorry to say, but it looks like this page does not exist.',
		};
	},
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title,
		};
	},
};
</script>
