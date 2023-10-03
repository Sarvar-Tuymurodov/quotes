<template>
    <header>
        <nav class="nav">
            <div class="container">
                <div class="nav__content">
                    <router-link to="/" class="nav__brand">
                        Quotes
                    </router-link>

                    <div class="nav__links">
                        <router-link class="nav__links--item" to="/">
                            Quote list
                        </router-link>

                        <router-link class="nav__links--item" @click="isEditing()" to="/add-quote">
                            Add quote 
                        </router-link>
                    </div>

                    <div class="nav__actions">
                        <div class="nav__search">
                            <input @keyup="filterQuotes($event)" type="text" placeholder="Quote...">
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import store from "@/store"

const filterQuotes = (event) => {
    store.commit("setFilteredQuotes",event.target.value)
}

const isEditing = () => {
    store.commit("isEditing",false)
}
</script>


<style lang="sass" scoped>
.nav
    position: sticky
    left: 0
    top: 0
    padding: 15px 0
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.07)
    border-bottom: 1px solid $color-border-grey

    &__content
        display: flex
        align-items: center
        justify-content: space-between

        +screen(576)
            flex-direction: column
            gap: 10px

    &__brand
        +mulBold
        font-size: 20px

    &__links
        display: flex
        align-items: center
        gap: 25px

        +screen(576)
            gap: 10px

        &--item 
            font-size: 18px
            +mulMed
            color: $color-text
            transition: all .1s
            color: rgba($color-text, 0.8)

            &:hover
                color: $color-black

            +screen(576)
                font-size: 16px

        .router-link-active
            color: $color-black

    &__actions
        +screen(576)
            width: 100%

    &__search
        +screen(576)
            width: 100%

        input 
            padding: 8px 10px
            border-radius: 10px
            border: 1px solid $color-silver
            font-size: 16px
            letter-spacing: 0.6px

            &::placeholder
                font-size: 14px

            +screen(576)
                width: 100%
</style>