<template>
	<div class="main">
		<v-row>
			<v-col cols="9" class="mr-0 mt-0 mb-0 pb-0">
				<div @mouseover="expand = true">
					<v-card v-if="!expand" class="sec pa-1 rounded-lg" elevation="1">
						<v-row justify="end" class="mb-0 pb-0">
							<v-col cols="8" class="mt-1 pb-0 mr-1">
								<div class="circle" :style="opacity(findability)"></div>
							</v-col>
						</v-row>
						<v-row justify="end" class="mt-0 mb-0 pb-0">
							<v-col cols="8" class="justify-end pb-0 pt-2 mr-1">
								<div class="circle" :style="opacity(accessibility)"></div>
							</v-col>
						</v-row>
						<v-row justify="end" class="mt-0 mb-0 pb-0">
							<v-col cols="8" class="justify-end pb-0 pt-2 mr-1">
								<div class="circle" :style="opacity(interoperability)"></div>
							</v-col>
						</v-row>
						<v-row justify="end" class="mt-0 mb-0 pb-0">
							<v-col cols="8" class="justify-end pb-0 mb-1 pt-2 mr-1">
								<div class="circle" :style="opacity(reusability)"></div>
							</v-col>
						</v-row>
					</v-card>
				</div>
				<v-slide-x-transition>
					<div @mouseleave="expand = false">
						<v-card
							v-if="expand"
							v-click-outside="close"
							class="pa-1 rounded-lg fairexpandedchip"
							elevation="1"
						>
							<v-row justify="end" class="mb-0 pb-0">
								<v-col cols="12" class="pb-0 mr-1 d-flex align-center">
									<span class="fair-text pl-2 text-caption">Findability</span>
									<v-chip
										class="inner-chip text-caption"
										:style="opacity(findability)"
										><span :style="color(findability)">{{
											score(findability)
										}}</span></v-chip
									>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
									<span class="fair-text pl-2 text-caption">Accessibility</span>
									<v-chip
										class="inner-chip text-caption"
										:style="opacity(accessibility)"
										><span :style="color(accessibility)">{{
											score(accessibility)
										}}</span></v-chip
									>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
									<span class="fair-text pl-2 text-caption"
										>Interoperability</span
									>
									<v-chip
										class="inner-chip text-caption"
										:style="opacity(interoperability)"
										><span :style="color(interoperability)">{{
											score(interoperability)
										}}</span></v-chip
									>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
									<span class="fair-text pl-2 text-caption">Reusability</span>
									<v-chip
										class="inner-chip text-caption"
										:style="opacity(reusability)"
										><span :style="color(reusability)">{{
											score(reusability)
										}}</span></v-chip
									>
								</v-col>
							</v-row>
						</v-card>
					</div>
				</v-slide-x-transition>
			</v-col>
		</v-row>
	</div>
</template>
<script>
export default {
	name: 'BookMarkCard',
	props: {
		findability: {
			type: Number,
			required: true,
		},
		accessibility: {
			type: Number,
			required: true,
		},
		interoperability: {
			type: Number,
			required: true,
		},
		reusability: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			expand: false,
		};
	},
	methods: {
		score(score) {
			// return the score of the letter from 0 to 100
			// Math.ceil to round up to the nearest integer
			return Math.ceil(score * 100);
		},
		opacity(score) {
			// return the opacity of the circle from 0 to 1
			return {
				background: 'rgba(57, 111, 186,' + score + ')',
			};
		},
		color(score) {
			// return the color of the circle from 0 to 1
			if (score < 0.4) {
				return {
					color: '#0B579F',
				};
			} else {
				return {
					color: 'white',
				};
			}
		},
		close() {
			this.expand = false;
		},
	},
};
</script>
<style>
.main {
	width: 250px;
	max-height: 100px;
	display: inline-block;
	position: relative !important;
	margin-left: -37px;
}

.sec {
	width: 47px;
}

.fairchip {
	width: 60px;
	margin-top: 3px;
}

.fairexpandedchip {
	width: 165px !important;
}

.fair-text {
	display: inline-block;
	margin-left: 15px;
	margin-right: 20px;
	color: #0b579f;
}

.circle {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: #396fba;
}

.inner-chip {
	height: 18px !important;
	background-color: #396fba;
	color: white !important;
	position: absolute;
	right: 8px;
}
</style>
