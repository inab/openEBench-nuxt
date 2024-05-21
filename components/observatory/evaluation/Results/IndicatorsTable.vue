<template>
	<v-container class="ml-6 mr-6">
		<v-data-table
			:headers="headers"
			:items="items"
			single-expand
			show-expand
			:items-per-page="30"
			:expanded.sync="expanded"
			hide-default-footer
			class="elevation-0 text-body-2"
		>
			<!-----    INDICATOR COLUMN  ---------->
			<template v-slot:[`item.indicator`]="{ item }">
				<p
					v-if="idsMainIndicators.includes(item.id)"
					class="text-subtitle-2 primary--text ma-auto"
				>
					{{ item.indicator }}
				</p>
				<p v-else class="text-body-2 ml-4 ma-auto">
					{{ item.indicator }}
				</p>
			</template>

			<!-----    STATUS COLUMN  ---------->
			<template v-slot:[`item.status`]="{ item }">
				<!-- only chip on rows of low-level indicators-->
				<div v-if="indicatorsExplanation[item.id].measured === false">
					<v-chip
						v-if="
							!indicatorsExplanation[item.id].types.includes(metaType(item))
						"
						class="font-weight-bold grey--text"
						color="#f5f5f5"
						small
						label
					>
						NOT APPLICABLE
					</v-chip>
					<v-chip
						v-else
						class="font-weight-bold grey--text"
						color="#f5f5f5"
						small
						label
					>
						NOT MEASURED
					</v-chip>
				</div>
				<div v-else>
					<div
						v-if="
							!idsMainIndicators.includes(item.id) &&
							!indicatorsExplanation[item.id].types.includes(metaType(item))
						"
					>
						<v-chip
							v-if="
								!indicatorsExplanation[item.id].types.includes(metaType(item))
							"
							class="font-weight-bold grey--text"
							color="#f5f5f5"
							small
							label
						>
							NOT APPLICABLE
						</v-chip>
					</div>
					<div
						v-if="
							!idsMainIndicators.includes(item.id) &&
							indicatorsExplanation[item.id].types.includes(metaType(item))
						"
					>
						<v-chip
							v-if="item.status === true"
							class="font-weight-bold success--text"
							color="#d3f0d4"
							small
							label
						>
							PASSED
						</v-chip>
						<v-chip
							v-else
							class="font-weight-bold"
							style="color: #ffa000"
							color="amber lighten-4"
							small
							label
						>
							FAILED
						</v-chip>
					</div>
				</div>
			</template>

			<!-----     EXPANSION  ---------->
			<template #expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<v-alert class="mt-3" colored-border border="left" type="info">
						<div class="text-caption font-weight-bold primary--text">
							About this indicator:
						</div>
						<!------ For high-level indicators  ------->
						<div
							v-if="idsMainIndicators.includes(item.id)"
							class="text-caption mt-3 mb-3"
						>
							<span class="font-weight-bold"> What it is: </span>
							<span>
								{{ indicatorsExplanation[item.id].what }}
							</span>
						</div>

						<!------ For low-level indicators  ------->
						<div
							v-if="!idsMainIndicators.includes(item.id)"
							class="text-caption mt-3 mb-2"
						>
							<span class="font-weight-bold"> What it is: </span>
							<span>
								{{ indicatorsExplanation[item.id].what }}
							</span>
						</div>

						<div
							v-if="!idsMainIndicators.includes(item.id)"
							class="text-caption"
						>
							<span class="font-weight-bold"> Why it is important: </span>
							<span>
								{{ indicatorsExplanation[item.id].why }}
							</span>
						</div>
						<div
							v-if="!idsMainIndicators.includes(item.id)"
							class="text-caption mt-2"
						>
							<span class="font-weight-bold mt-2"> How it is meadured: </span>
							<span>
								{{ indicatorsExplanation[item.id].how }}
							</span>
							<span
								v-if="indicatorsExplanation[item.id].how === 'Not measured.'"
							>
								<a href="#not-measured"
									><v-icon small>mdi-information-slab-circle-outline</v-icon></a
								>
							</span>
						</div>
						<div
							v-if="!idsMainIndicators.includes(item.id)"
							class="text-caption mt-2 mb-3"
						>
							<span class="font-weight-bold">
								Types of software it applies to:
							</span>
							<span v-if="indicatorsExplanation[item.id].types.length === 2">
								"web" and "non-web"
							</span>
							<span v-if="indicatorsExplanation[item.id].types.length === 1">
								"{{ indicatorsExplanation[item.id].types[0] }}"
							</span>
							<a href="#types"
								><v-icon small>mdi-information-slab-circle-outline</v-icon></a
							>
						</div>
						<div
							v-if="
								!idsMainIndicators.includes(item.id) &&
								indicatorsExplanation[item.id].note != ''
							"
							class="text-caption mt-2 mb-3"
						>
							<v-icon small>mdi-alert-outline</v-icon>
							<span>
								{{ indicatorsExplanation[item.id].note }}
							</span>
						</div>
					</v-alert>
				</td>
			</template>
		</v-data-table>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { indicatorsExplanation } from './IndicatorsExplanation.js';

export default {
	name: 'IndicatorsTable',
	props: ['indicators', 'idsMainIndicators'],
	data() {
		return {
			expanded: [],
			headers: [
				{
					text: 'Indicator',
					align: 'start',
					sortable: false,
					value: 'indicator',
					width: '35%',
				},
				{
					text: 'Status',
					align: 'center',
					value: 'status',
				},
				{
					value: 'data-table-expand',
				},
			],
			indicatorsExplanation,
			webTypes: ['web', 'app', 'api', 'rest', 'suite'],
		};
	},
	created() {
		this.items = this.indicators.map((indicator) => {
			return {
				indicator: `${indicator.avatar} ${indicator.name}`,
				id: indicator.id,
				avatar: indicator.avatar,
				status: this.indicatorFullfilled(indicator),
				log: indicator.info,
			};
		});
	},
	computed: {
		...mapGetters({
			FAIRIndicatorsTool:
				'observatory/evaluation/results/getFAIRIndicatorsTool',
		}),
	},
	methods: {
		indicatorFullfilled(indicator) {
			// low-level indicators are boolean
			// high-level indicators are floats or integers
			switch (this.FAIRIndicatorsTool[0][indicator.id]) {
				case 1:
					return true;
				case 1.0:
					return true;
				case true:
					return true;
				default:
					return false;
			}
		},
		metaType(indicator) {
			if (this.webTypes.includes(indicator.type)) {
				return 'web';
			} else {
				return 'non-web';
			}
		},
	},
};
</script>
<style scoped>
::v-deep .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
	box-shadow: inset 0 1 1 -1 rgb(50, 50, 50 / 75%),
		inset 0 -1 1 -1 rgb(50, 50, 50 / 50%) !important;
}
</style>
