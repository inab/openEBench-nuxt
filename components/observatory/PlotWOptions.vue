<template>
	<div class="mb-0 pb-0 ml-auto mr-0 pr-0 pt-2">
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					@click="dialog = true"
					icon
					class="copy-icon"
				>
					<v-icon small color="grey lighten-1">mdi-content-copy</v-icon>
				</v-btn>
			</template>
			<span>{{ message }}</span>
		</v-tooltip>

		<v-dialog v-model="dialog" width="65%">
			<v-card>
				<v-card-title> Plots Iframe Code </v-card-title>
				<v-card-text>
					Copy and paste the following code to embed the plots into your
					website. Change the width and height of the iframe as needed.
					<codeBlock
						v-for="(item, index) in items"
						:key="index"
						:title="item.title"
						:code="copyIframeCode(item.url)"
					/>
				</v-card-text>

				<v-divider></v-divider>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import CodeBlock from '~/components/observatory/visualizations/CodeBlock.vue';

export default {
	name: 'PlotWOptions',
	components: {
		CodeBlock,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		dialog: false,
		message: 'See iframe code',
	}),
	computed: {
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
		}),
	},
	methods: {
		copyIframeCode(url) {
			const newUrl = `${url}/${this.currentCollection}/`;
			const iframeCode = `<iframe src="${newUrl}"
	frameborder="0"
	style="width:50%; height:500px;"
	scrolling="no">
</iframe>`;
			return iframeCode;
		},
		generateURL() {
			// add current collection to the URL
			return `${this.url}/${this.currentCollection}`;
		},
	},
};
</script>
