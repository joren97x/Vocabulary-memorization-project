<script setup>

    import {defineProps, ref} from 'vue'
    const {nativeLang, languages} = defineProps(['nativeLang', 'languages'])
    const nativeWord = ref('')
    const newWord = ref([])
    const words = ref([])
    let index = ref(0)
    const snackbar = ref(false)
    const newLanguages = languages.filter(lang => {
        return lang != languages[nativeLang-1]
    })

    for(let i = 0; i < newLanguages.length; i++) {

        newWord.value.push({
            lang: newLanguages[i],
            text: ''
        })
    }

    async function validate() {
        if(nativeWord.value === '') {
            console.log('eslaf')
            snackbar.value = true
            return false
        }
        for(let i = 0; i < newLanguages.length; i++) {
            if(newWord.value[i].text === '') {
                console.log('eslaf')
                snackbar.value = true
                return false
            }
        }
        insertWords()
    }

    function insertWords() {

        words.value.push({
            id: index.value,
            native: nativeWord.value,
            texts: new Array(newLanguages.length)
        })
        for(let i = 0; i < newLanguages.length; i++) {
            words.value[index.value].texts[i] = newWord.value[i].text
            newWord.value[i].text = ''
        }
        nativeWord.value = ''
        index.value++
    }

    function deleteWord(id) {
        words.value = words.value.filter(word => {
            console.log(word)
            return word.id !== id
        })
        index.value--
    }

</script>

<template>

        <v-row>
            <v-col>
                <h3>Make Volcabulary with Translation {{ words }} </h3>
                <h1>{{ index }}</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Add (Min 5) word of your native language <strong>{{ languages[nativeLang-1].toUpperCase() }}</strong> and Translate it into others.
            </v-col>
        </v-row>

        <v-form @submit.prevent @keydown.enter="validate()">
            <v-row class="justify-center">
                <v-col cols="2">
                    <v-text-field :label="languages[nativeLang-1]+' (native)'" v-model="nativeWord" >
                    </v-text-field>
                </v-col>
                <v-col cols="2" v-for="(lang, i) in newLanguages" :key="lang">
                    <v-text-field :label="`in ${lang}` " v-model="newWord[i].text">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-form>
            <v-table class="w-50 mt-3" style="margin-left: 25%;">
                <thead>
                    <tr>
                        <th  class="text-center">No.</th>
                        <th class="text-center">{{ languages[nativeLang-1] }} (Native)</th>
                        <th class="text-center" v-for="lang in newLanguages" :key="lang" >{{ lang }}</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <v-slide-x-transition>
                        <tr v-show="words.length == 0">
                            <td colspan="12">Fill all textareas above and press ENTER key.</td>
                        </tr>
                    </v-slide-x-transition>

                    <v-slide-y-transition group>
                        <tr v-for="word in words" :key="word.id">
                            <td>{{word.id}}</td>
                            <td>{{word.native}}</td>
                            <td v-for="(lang, i) in newLanguages" :key="lang">{{word.texts[i]}}</td>
                            <td> <v-btn icon="mdi-close-circle-outline" flat style="color: red" @click="deleteWord(word.id)"></v-btn> </td>
                        </tr>
                    </v-slide-y-transition>
                </tbody>
            </v-table>

            <v-row class="my-5">
                <v-col>
                    <v-btn color="green" :disabled="words.length < 5">Start Test</v-btn>
                </v-col>
            </v-row>

            <v-snackbar v-model="snackbar" timeout="1000" color="warning">
                    <v-alert
                        density="compact"
                        type="warning"
                        title="Fill in missing fields."
                        text="Bruh you stupid?"
                    ></v-alert>
            </v-snackbar>

</template>
