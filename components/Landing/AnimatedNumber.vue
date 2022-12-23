<template>
	<v-progress-circular v-if="value == 0" indeterminate></v-progress-circular>
	<span v-else v-observe-visibility="visibilityChanged">{{
		displayValue
	}}</span>
</template>

<script>
import gsap from 'gsap';
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
	name: 'App',
	directives: {
		ObserveVisibility,
	},
	props: { value: { type: Number, default: 0 } },
	data() {
		return {
			inputValue: 0,
			displayValue: 0,
			tweenValue: 0,
			isVisible: false,
		};
	},
	watch: {
		inputValue() {
			gsap.to(this, {
				tweenValue: this.inputValue,
				onUpdate: () => {
					this.displayValue = Math.ceil(this.tweenValue);
				},
				duration: 2,
			});
		},
	},
	methods: {
		visibilityChanged(isVisible) {
			if (!this.isVisible && isVisible) {
				this.isVisible = isVisible;
				this.inputValue = this.value;
			} else {
				this.isVisible = false;
				this.inputValue = 0;
			}
		},
	},
};
</script>
