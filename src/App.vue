<script setup>

    import HelloWorld from './components/Page1.vue'

</script>

<template>
    <v-app>
        <v-main>
	        <v-container class="text-center align-self-center align-center mt-5" style="background-color: rgb(232, 255, 206);">
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>


