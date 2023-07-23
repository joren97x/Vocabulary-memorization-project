<script setup>

    import {defineProps, ref} from 'vue'
    const {nativeLang, languages} = defineProps(['nativeLang', 'languages'])
    const nativeWord = ref('')
    const newWord = ref('')
    const words = ref([])
    let index = 1

    function insertWords() {
        words.value.push({
            id: index,
            native: nativeWord.value,
            new: newWord.value
        })
        nativeWord.value = ''
        newWord.value = ''
        index++
    }

    function deleteWord(id) {
        words.value = words.value.filter(word => {
            return word.id !== id
        }) 
    }

</script>

<template>

        <v-row>
            <v-col>
                <h3>Make Volcabulary with Translation {{ languages }} </h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Add (Min 5) word of your native language WQE and Translate it into others.
            </v-col>
        </v-row>

        <v-form @submit.prevent @keydown.enter="insertWords()">
            <v-row class="justify-center">
                <v-col cols="3">
                    <v-text-field :label="languages[nativeLang-1]+' (native)'" v-model="nativeWord" >
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="in new language" v-model="newWord" >
                    </v-text-field>
                </v-col>
            </v-row>
        </v-form>

            <v-table class="w-50 mt-3" style="margin-left: 25%;">
                <thead>
                    <tr>
                        <th  class="text-center">No.</th>
                        <th class="text-center">{{ languages[nativeLang-1] }}(Native)</th>
                        <th class="text-center">NEED TO FIX LANGUAGE</th>
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
                            <td>{{word.new}}</td>
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

</template>
