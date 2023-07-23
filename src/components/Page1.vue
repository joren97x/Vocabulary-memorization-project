<script setup>

	import {ref} from 'vue'
	import { RouterLink } from 'vue-router'

	const showAddLang = ref(false)
	const newLang = ref('')
	const nativeLang = ref()
	const languages = ref([])	

	function addLanguage() {
		languages.value.push(newLang.value)
		newLang.value = ''
		showAddLang.value = false
	}

	//rules
	const newLangRules = [
		value => {
			if (value) return true
			return 'This field is required'
		}
	]

</script>

<template>
		<v-row>
			<v-col>
				<h3>Add & Select Language</h3>
			</v-col>
		</v-row>
		<v-divider class="my-4" />
		<v-row class="mb-3">
			<v-col>
				Add languages which you know (Min 2) and (Max 4) and select which is your native.
			</v-col>
		</v-row>
		<v-row class="justify-center">
			<v-btn id="add_lang" class="rounded-pill mx-2" @click="nativeLang = i+1" flat v-for="(lang, i) in languages" :key="i">
				<v-fade-transition>
					<v-icon color="green" v-if="nativeLang-1 === i">mdi-check</v-icon>
				</v-fade-transition>
				{{ lang }}
			</v-btn>
			<v-btn class="mx-2" id="add_lang" flat @click="showAddLang = true">
				<v-icon class="rounded-circle" color="green">mdi-plus</v-icon>
				Add language
			</v-btn>
		</v-row>
		<v-row class="justify-center">
				<v-btn color="green" id="page2btn" class="my-3" :disabled="!nativeLang && !languages.length <= 1">
					<router-link :to="{path: '/page2', query: { nativeLang: nativeLang, languages: languages.join(',') }}" class="router-link" style="text-decoration: none; color: black">
						Let's make a list of vocabulary
					</router-link>
				</v-btn>
		</v-row>

	<!-- ADD LANGUAGE DIALOG -->
	<v-dialog v-model="showAddLang" width="40%" persistent transition="dialog-top-transition">
		<v-card>
			<v-form fast-fail @submit.prevent>
				<v-card-title class="text-center">
					Add language
				</v-card-title>

				<v-card-item>
						<v-text-field v-model="newLang" :rules="newLangRules" label="Language">

						</v-text-field>
				</v-card-item>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red"  @click="showAddLang = false">Close</v-btn>
					<v-btn color="success" type="submit" @click="addLanguage()">Add</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
    </v-dialog>

</template>

<style scoped>

	#add_lang {
		border: 1px solid green;
	}

	#page2btn:disabled:hover {
		cursor: not-allowed;
	}

</style>