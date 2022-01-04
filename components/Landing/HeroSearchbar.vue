<template>
	<v-parallax height="260" dark :src="gradient">
		<v-container>
			<v-row align="center" justify="center">
				<v-col class="text-center" cols="12">
					<h2 class="text-h4 font-weight-thin mb-3">
						Browse Tools and Metrics
					</h2>
					<h3 class="text-subtitle-2 hidden-sm-and-down">
						Essential scientific information, GitHub statistics, and metrics
						about individual tools, databases and services for bioinformatics
						and the life sciences.
					</h3>
				</v-col>
				<v-col cols="12" sm="10">
					<v-row align="center" class="mb-10">
						<v-text-field
							v-model="input"
							label="Search for Tools"
							outlined
							clearable
							dark
							hide-details=""
							@keyup.enter="handleSubmit"
						></v-text-field>
						<v-btn x-large outlined dark class="ml-2" @click="handleSubmit">
							Go
						</v-btn>
					</v-row>
				</v-col>
			</v-row>
			<a
				class="scroll-down"
				aria-label="Scroll to feature overview"
				@click="$vuetify.goTo('#feature-teaser')"
			/>
		</v-container>
	</v-parallax>
</template>

<script>
import gradient from '~/static/images/gradient_parallax.jpg';

export default {
	name: 'HeroSearchbar',
	data: () => ({
		gradient,
		input: '',
	}),
	methods: {
		handleSubmit() {
			this.$router.push({
				path: 'tools',
				query: { search: this.input },
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.scroll-down {
	height: 50px;
	width: 30px;
	border: 2px solid white;
	position: absolute;
	left: 50%;
	bottom: 10px;
	border-radius: 50px;
	cursor: pointer;
}
.scroll-down::before,
.scroll-down::after {
	content: '';
	position: absolute;
	top: 20%;
	left: 50%;
	height: 10px;
	width: 10px;
	transform: translate(-50%, -100%) rotate(45deg);
	border: 2px solid white;
	border-top: transparent;
	border-left: transparent;
	animation: scroll-down 1s ease-in-out infinite;
}
.scroll-down::before {
	top: 30%;
	animation-delay: 0.3s;
	/* animation: scroll-down 1s ease-in-out infinite; */
}

@keyframes scroll-down {
	0% {
		/* top:20%; */
		opacity: 0;
	}
	30% {
		opacity: 1;
	}
	60% {
		opacity: 1;
	}
	100% {
		top: 90%;
		opacity: 0;
	}
}
</style>
