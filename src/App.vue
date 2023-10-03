<template>
    <Header/>
    <router-view/>
</template>

<script setup>
    import Header from "@/navigation/Header.vue"
</script>

<style lang="sass">
*
    box-sizing: border-box
    margin: 0
    padding: 0

.container
    max-width: 1320px
    margin: 0 auto

    +screen(1320)
        padding: 0 20px

html
    +mulReg()
    color: $color-black
</style>
