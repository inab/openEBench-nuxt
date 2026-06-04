<template>
	<div class="main">
		<v-row>
			<v-col cols="9" class="mr-0 mt-0 mb-0 pb-0">
				<div @mouseover="expand = true">
					<v-card v-if="!expand" class="sec pa-1 rounded-lg" elevation="1">
						<v-row class="mb-0 pb-0">
							<v-col cols="12" class="mt-1 pb-0 d-flex align-center fair-col">
								<span class="fair-lbl">F</span>
								<div class="circle" :style="fillColor(findability)"></div>
							</v-col>
						</v-row>
						<v-row class="mt-0 mb-0 pb-0">
							<v-col cols="12" class="pb-0 pt-2 d-flex align-center fair-col">
								<span class="fair-lbl">A</span>
								<div class="circle" :style="fillColor(accessibility)"></div>
							</v-col>
						</v-row>
						<v-row class="mt-0 mb-0 pb-0">
							<v-col cols="12" class="pb-0 pt-2 d-flex align-center fair-col">
								<span class="fair-lbl">I</span>
								<div class="circle" :style="fillColor(interoperability)"></div>
							</v-col>
						</v-row>
						<v-row class="mt-0 mb-0 pb-0">
							<v-col
								cols="12"
								class="pb-0 mb-1 pt-2 d-flex align-center fair-col"
							>
								<span class="fair-lbl">R</span>
								<div class="circle" :style="fillColor(reusability)"></div>
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
										:style="fillColor(findability)"
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
										:style="fillColor(accessibility)"
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
										:style="fillColor(interoperability)"
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
										:style="fillColor(reusability)"
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
			type: [Number, String],
			required: true,
		},
		accessibility: {
			type: [Number, String],
			required: true,
		},
		interoperability: {
			type: [Number, String],
			required: true,
		},
		reusability: {
			type: [Number, String],
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
			return Math.ceil(score * 100);
		},
		// Solid band fill matching the FAIRscore table: grey for missing/zero,
		// green for high (>= 0.7), orange for partial.
		fillColor(score) {
			const n = parseFloat(score);
			let bg = '#d0d0d0';
			if (!isNaN(n) && n > 0) {
				bg = n >= 0.7 ? '#1d9e75' : '#ffb236';
			}
			return { background: bg };
		},
		color() {
			return { color: 'black' };
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
	width: 70px;
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
	color: black;
}

.fair-col {
	padding-left: 30px !important;
	padding-right: 4px !important;
}

.fair-lbl {
	font-size: 0.68rem;
	font-weight: 700;
	color: black;
	width: 10px;
	min-width: 10px;
	text-align: center;
	margin-right: 6px;
	line-height: 1;
	flex-shrink: 0;
}

.circle {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: #d0d0d0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 12%);
}

.inner-chip {
	height: 18px !important;
	background-color: #d0d0d0;
	position: absolute;
	right: 8px;
}
</style>
