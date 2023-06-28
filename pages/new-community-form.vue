<template>
	<v-container class="mt-5">
		<v-row>
			<v-col>
				<div class="text-center">
					<h1 class="text--h3">
						OpenEBench: Petition to create a New Community
					</h1>
					<p class="mt-1">
						<b>
							Find more information here:
							<v-icon small>mdi-open-in-new</v-icon>
							<a
								href="https://gitlab.bsc.es/inb/elixir/openebench/sops/-/blob/main/scientific-benchmarking/02.create.new.community.md"
								target="_blank"
							>
								Documentation about How to Create a new Community
							</a>
						</b>
					</p>
				</div>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" sm="8" md="6">
				<div class="container">
					<form ref="formulario" @submit.prevent="sendEmail">
						<div v-for="campo in campos" :key="campo.nombre">
							<label>{{ campo.nombre }}</label>
							<template v-if="campo.structure === 'input'">
								<input
									v-model="formulario[campo.nombre]"
									:type="campo.tipo"
									:placeholder="campo.placeholder"
									required
								/>
							</template>
							<template v-if="campo.structure === 'textarea'">
								<textarea
									v-model="formulario[campo.nombre]"
									:placeholder="campo.placeholder"
									required
								></textarea>
							</template>
						</div>

						<input type="submit" value="Send" />
					</form>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
	name: 'NewCommunityFormPage',
	data() {
		return {
			campos: [], // Array para almacenar los campos del formulario
			formulario: {}, // Objeto para almacenar los valores del formulario
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Petition New Community',
					disabled: true,
				},
			],
			name: '',
			email: '',
			message: '',
		};
	},
	mounted() {
		// Aquí puedes cargar el JSON con la estructura del formulario
		// Puedes hacerlo mediante una llamada AJAX o importando el archivo JSON directamente
		this.campos = [
			{
				nombre: 'Email',
				tipo: 'email',
				placeholder: 'Your Email',
				structure: 'input',
			},
			{
				nombre: 'Orcid',
				tipo: 'text',
				placeholder: 'Your Orcid ID',
				structure: 'input',
			},
			{
				nombre: 'Community Name',
				tipo: 'text',
				placeholder: 'Community Name you want',
				structure: 'input',
			},
			{
				nombre: 'Reasons to create a new Community',
				tipo: 'text',
				placeholder: 'Explain why you want to create a new Community in OEB...',
				structure: 'textarea',
			},
		];
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
	methods: {
		sendEmail() {
			const formularioElement = this.$refs.formulario;
			const formularioJSON = JSON.stringify(this.formulario);
			// eslint-disable-next-line no-console
			console.log(formularioJSON);

			try {
				// eslint-disable-next-line import/no-named-as-default-member
				emailjs.sendForm(
					'YOUR_SERVICE_ID',
					'YOUR_TEMPLATE_ID',
					formularioElement,
					'YOUR_PUBLIC_KEY'
				);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log({ error });
			}
			// Reset form field
			this.name = '';
			this.email = '';
			this.message = '';
			this.formulario = {};
		},
	},
};
</script>

<style scoped>
* {
	box-sizing: border-box;
}

label {
	float: left;
}

input[type='text'],
[type='email'],
textarea {
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	margin-top: 6px;
	margin-bottom: 16px;
	resize: vertical;
}

input[type='submit'] {
	background-color: #0b579f;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

input[type='submit']:hover {
	background-color: #0b579f;
}
</style>

<!--
<template>
	<v-container class="mt-5">
		<v-row>
			<v-col>
				<div class="text-center">
					<h1 class="text--h3">OpenEBench: Petition to create a New Community</h1>
				<p class="mt-1">
					<b>
					Find more information here:
					<v-icon small>mdi-open-in-new</v-icon>
					<a href="https://gitlab.bsc.es/inb/elixir/openebench/sops/-/blob/main/scientific-benchmarking/02.create.new.community.md" target="_blank">
						Documentation about How to Create a new Community
					</a>
					</b>
				</p>
				</div>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" sm="8" md="6">
				<v-form @submit.prevent="enviarFormulario">
				<v-container>
					<v-row v-for="campo in campos" :key="campo.nombre">
					<v-col>
						<v-text-field v-model="formulario[campo.nombre]" :label="campo.nombre" :type="campo.tipo" required></v-text-field>
					</v-col>
					</v-row>
					<v-row justify="center">
					<v-col cols="12" sm="6" md="4">
						<v-btn type="submit" color="primary">Enviar</v-btn>
					</v-col>
					</v-row>
				</v-container>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>



<script>

	//import nodemailer from 'nodemailer';

	export default {
		name: 'NewCommunityFormPage',
		data() {
			return {
				campos: [], // Array para almacenar los campos del formulario
				formulario: {}, // Objeto para almacenar los valores del formulario
				breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Petition New Community',
					disabled: true,
				},
			],
			};
		},
		mounted() {
			// Aquí puedes cargar el JSON con la estructura del formulario
			// Puedes hacerlo mediante una llamada AJAX o importando el archivo JSON directamente
			this.campos = [
				{ nombre: 'mail', tipo: 'email' },
				{ nombre: 'orcid', tipo: 'text' },
				{ nombre: 'nombre_comunidad', tipo: 'text' },
			];
			this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		},
		methods: {
			enviarFormulario() {
				// Aquí puedes hacer las operaciones necesarias antes de enviar el formulario
				// Puedes validar los datos, realizar transformaciones, etc.

				const nodemailer = require('nodemailer');

				// Envía el formulario por correo electrónico en formato JSON
				const formularioJSON = JSON.stringify(this.formulario);
				// Aquí puedes agregar la lógica para enviar el correo electrónico, por ejemplo,
				// utilizando una biblioteca o API de envío de correos electrónicos

				console.log(formularioJSON);
				// Configura el transporte de correo electrónico con nodemailer

				const transporter = nodemailer.createTransport({
					// Configura los detalles del servidor de correo electrónico
					// Aquí debes proporcionar los detalles del servidor de correo que estés utilizando
					host: 'mao.bsc.es',
					port: 25,
					secure: false, // Si utilizas SSL/TLS, cambia a true
					auth: {
						user: 'oeb_admin',
						pass: 'Hc37E/BvxZezTpM65MT2JaR1X6gzWMx3N/r5fqVvCC0='
					}
				});

				// Configura los datos del correo electrónico
				const mailOptions = {
					from: 'openebench-support@bsc.es',
					to: 'esther.vendrell@bsc.es',
					subject: 'Nuevo formulario enviado',
					text: formularioJSON
				};

				// Envía el correo electrónico utilizando el transporte configurado
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error);
					} else {
						console.log('Correo electrónico enviado:', info.response);
					}
				});
				// Limpia el formulario después de enviarlo
				this.formulario = {};
			},
		},
	};
</script>
-->
