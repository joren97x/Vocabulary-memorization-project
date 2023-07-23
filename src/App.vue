<script setup>

    import HelloWorld from './components/Page1.vue'

</script>

<template>
    <v-app>
        <v-main style="background-color: rgb(243,244,248);">
	        <v-container class="text-center align-self-center align-center mt-5" style="background-color: white;">
                <RouterView />
            </v-container>
        </v-main>
    </v-app>
</template>


