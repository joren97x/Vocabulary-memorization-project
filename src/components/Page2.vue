<script setup>

    import {defineProps, ref, watch} from 'vue'
    const {nativeLang, languages} = defineProps(['nativeLang', 'languages'])
    const nativeWord = ref('')
    const newWord = ref([])
    const words = ref([])
    let index = ref(0)
    const answer = ref([])
    const quizIndex = ref(0)
    const showQuiz = ref(false)
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

    function validate() {
        if(nativeWord.value === '') {
            snackbar.value = true
            return false
        }
        for(let i = 0; i < newLanguages.length; i++) {
            if(newWord.value[i].text === '') {
                snackbar.value = true
                return false
            }
        }
        insertWords()
    }

    function insertWords() {

        const wordObject = {
            id: index.value,
            native: nativeWord.value,
            texts: new Array(newLanguages.length).fill('')
        }

        for(let i = 0; i < newLanguages.length; i++) {
            wordObject.texts[i] = newWord.value[i].text
            newWord.value[i].text = ''
        }
        
        words.value.push(wordObject)
        nativeWord.value = ''
        index.value++
        
    }

    function deleteWord(id) {
        words.value = words.value.filter(word => {
            console.log(word)
            return word.id !== id
        })
    }

    const answerRules = [
        value => {
            if(value) return true
            return 'Fill in missing field'
        }
    ]

    function validateForm() {
        for(let i = 0; i < newLanguages.length; i++) {
            if(answer[i] === null || answer[i] === '') {
                snackbar.value = true
                return false
            }
        }
        
    }



    // watch(quizIndex.value, () => {
    //     for(let i = 0; i < words[quizIndex].texts.length; i++) {

    //     }
    // })



</script>

<template>

        <v-container v-if="!showQuiz">
            <v-row>
            <v-col>
                <h3>Make Volcabulary with Translation </h3>
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
                            <td>{{word.id+1}}</td>
                            <td class="text-capitalize">{{word.native}}</td>
                            <td v-for="(lang, i) in newLanguages" :key="lang"><p class="text-capitalize">{{word.texts[i]}}</p></td>
                            <td> <v-btn icon="mdi-close-circle-outline" flat style="color: red" @click="deleteWord(word.id)"></v-btn> </td>
                        </tr>
                    </v-slide-y-transition>
                </tbody>
            </v-table>

            <v-row class="my-5">
                <v-col>
                    <v-btn color="green" :disabled="words.length < 2" @click="showQuiz = true">
                            Start Test
                    </v-btn>
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
        </v-container>

        <v-container v-if="showQuiz">
            <v-row>
                <v-col>
                    <h2 class="text-h4">Quiz {{ words }} </h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Given 5 questions. You have to translate native language word into another language.
                    {{ answer }}
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="6">
                    <v-progress-linear
                    :model-value="((quizIndex+1) * 100) / words.length"
                    color="light-green-darken-4"
                    height="20"
                    striped
                    >

                    {{ (quizIndex+1) }} of {{ words.length }}

                    </v-progress-linear>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="text-h6">Translate this "{{ words[quizIndex].native }}" word of your native language {{ languages[nativeLang-1] }}, into the following languages:</p>
                </v-col>
            </v-row>
            <v-form validate-on="submit lazy" @submit.prevent>
                <v-row class="justify-center">
                    <v-col cols="7" v-for="(quiz, i) in words[quizIndex].texts" :key="i">
                        <v-text-field :label="`In ${newLanguages[i]}`" :rules="answerRules" v-model="answer[i]">
                            <template v-slot:prepend>
                                <v-card width="44" flat color="green-lighten-2" class="d-flex align-center justify-center fill-height">
                                    <h3>{{ quizIndex+1 }}</h3>
                                </v-card>
                            </template>
                        </v-text-field>
                    </v-col>
                    
                </v-row>
                
                <br>
                <v-row class="mb-3">
                    <v-spacer></v-spacer>
                    <v-col>
                        <v-btn append-icon="mdi-chevron-right" color="green" type="submit" @click="validateForm">Next</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>

</template>
