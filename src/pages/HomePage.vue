<template>
  <div class="quotes">
    <div class="container">
      <div class="quotes__content">
        <div class="quotes__title">Quotes</div>
        <div class="quotes__list">
            <div class="quotes__item" v-for="(quote, index) of quoteList " :key="index">
                <div class="quotes__item--top">
                    <div class="quotes__item--author">{{quote?.author}}</div>
                    <div class="quotes__item--category">{{quote?.category}}</div>
                </div>
                <div class="quotes__item--text">{{quote?.text}}</div>
                <div class="quotes__item--dates">
                    <div v-if="quote?.modifiedDate" class="quotes__item--modified">Modified: {{ (new Date(quote?.date)).toLocaleString() }}</div>
                    <div class="quotes__item--created">{{ (new Date(quote?.date)).toLocaleString() }}</div> 
                </div>

                <router-link to="/add-quote" class="quotes__item--edit" @click="editQuote(quote.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"/></svg>
                </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import { computed, onMounted, ref, watch } from "vue";
import { isMoment } from "vue-moment";
const quoteList = ref([]);

const editQuote = (id) => {
    store.commit("editQuote",id);
    store.commit("isEditing",true);
}

onMounted(() => {
    store.dispatch("getData");
    quoteList.value = store.getters.getFilteredData || store.getters.getAllData;
})

watch(() => store.state.filteredQuotes, function() {
    quoteList.value = store.getters.getFilteredData || store.getters.getAllData;
});
</script>

<style scoped lang="sass">
.quotes
    padding: 60px 0

    +screen(576)
        padding: 40px 0

    &__content
        display: flex
        flex-direction: column

    &__title 
        font-size: 42px
        +mulBold 
        color: $color-black
        margin-bottom: 40px

        +screen(768)
            font-size: 34px

    &__list 
        display: grid
        grid-template-columns: repeat(3,1fr)
        grid-gap: 25px

        +screen(991)
            grid-template-columns: repeat(2,1fr)

        +screen(768)
            grid-gap: 25px 15px

        +screen(576)
            grid-template-columns: repeat(1,1fr)

    &__item
        display: flex
        flex-direction: column
        padding: 20px 
        border-radius: 10px
        border: 1px solid $color-silver
        position: relative

        &--top 
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 25px
        
        &--author 
            font-size: 16px
            color: $color-text

        &--category 
            background-color: rgb(163 215 255)
            padding: 3px 8px
            border-radius: 8px
            font-size: 16px

        &--text 
            font-size: 18px
            margin-bottom: 25px
            line-height: 1.4

            +screen(576)
                font-size: 16px

        &--dates
            margin-top: auto
            display: flex
            flex-direction: column

            +screen(576)
                font-size: 15px

        &--created 
            align-self: flex-end
            color: #777

        &--modified
            align-self: flex-end
            margin-bottom: 8px
            font-size: 14px
            color: #777

        &--edit 
            position: absolute
            align-self: flex-start
            padding: 5px 9px 
            border-radius: 8px
            bottom: 15px
            left: 20px
            border: 1px solid $color-silver
            display: flex
            background-color: buttonface

            & svg 
                max-width: 22px
                width: 100%
                height: 100%

</style>
