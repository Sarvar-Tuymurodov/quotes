<template>
    <div class="quote-add">
        <div class="container">
            <div class="quote-add__content">
                <div class="quote-add__form">
                    <h3 class="quote-add__title">Add quote</h3>

                    <form class="quote-add__body" @submit.prevent>
                        <div class="quote-add__block">
                            <div class="quote-add__left">
                                <div class="quete-add__group custom-group">
                                    <label class="quote-add__label custom-label" for="quoteAuthor">Author</label>
                                    <input class="quote-add__input custom-input" autocomplete="off" required v-model="quote.author" type="text" id="quoteAuthor"/>
                                </div>

                                <div class="quete-add__group custom-group">
                                    <label class="quote-add__label custom-label" for="quoteText">Quote</label>
                                    <textarea class="quote-add__input custom-textarea" autocomplete="off" required v-model="quote.text" type="text" id="quoteText"/>
                                </div>
                            </div>
                            <div class="quote-add__right">
                                <div class="quete-add__group custom-group">
                                    <label class="quote-add__label custom-label" for="quoteCat">Category</label>
                                    <input class="quote-add__input custom-input" autocomplete="off" v-model="quote.category" type="text" id="quoteCat"/>
                                </div>
                            </div>
                        </div>

                        <button type="submit" @click="quoteModified()" v-if="store.state.isEditing" class="quote-add__save btn-blue">Save quote</button>
                        <button type="submit" @click="quoteAdded()" v-else class="quote-add__submit btn-green">Add quote</button>
                    </form>
                </div>

                <div class="quote-add__quick-view">
                    <h3 class="quote-add__title">Quick view</h3>
                    <div class="quote-add__card">
                        <div class="quote-add__card--top">
                            <div class="quote-add__card--author">{{quote.author || "Author"}}</div>
                            <div class="quote-add__card--category">{{quote.category || "Category"}}</div>
                        </div>
                        <div class="quote-add__card--text">
                            {{quote.text || exampleText}}
                        </div>
                        <div class="quote-add__card--date">{{ (new Date(quote.date)).toLocaleDateString() }}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <DoneAlert/>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {v4 as uuidv4} from 'uuid';
import store from "@/store";
import DoneAlert from "@/components/DoneAlert.vue";

const quote = reactive({
    id: "",
    author: "",
    text: "",
    category: "",
    date: new Date(),
    modifiedDate: null
}); 

const exampleText = "Слепая вера в авторитеты – самый главный враг истины";

const clearForm = () => { 
    quote.author = ""
    quote.text = ""
    quote.category = ""
}

const quoteAdded = async () => {
    if(!(quote.author && quote.category && quote.text)) return;

    quote.id = uuidv4();
    quote.date = new Date();

    store.commit("addQuote", quote);
    store.commit("showSuccessAlert");
    clearForm();
}

const quoteModified = () => {
    if(!(quote.author && quote.category && quote.text)) return

    quote.modifiedDate = new Date();

    store.commit("saveQuote", quote);
    store.commit("isEditing", false);
    store.commit("showSuccessAlert");
    clearForm();
}

onMounted(()=>{
    if(store.state.isEditing){
        quote.id = store.state.quote.id
        quote.author = store.state.quote.author
        quote.category = store.state.quote.category
        quote.text = store.state.quote.text
        quote.date = store.state.quote.date
    }
})
</script>

<style scoped lang="sass">
.quote-add
    padding: 60px 0

    +screen(991)
        padding: 40px 0

    &__content
        display: flex
        gap: 20px

        +screen(991)
            flex-direction: column
        

    &__title
        font-size: 32px
        margin-bottom: 35px

        +screen(991)
            font-size: 28px
            margin-bottom: 25px

    &__form
        display: flex
        max-width: 640px
        width: 100%
        flex-direction: column
        min-width: 500px

        +screen(1200)
            min-width: 320px

        +screen(991)
            max-width: 100%
            width: 100%
            margin-bottom: 30px

    &__body
        display: flex
        flex-direction: column
        align-items: flex-start
        padding: 35px 20px 
        border-radius: 10px
        border: 2px solid $color-silver

    &__block
        display: grid
        grid-template-columns: repeat(2,1fr)
        grid-gap: 20px
        width: 100%
        margin-bottom: 40px

        +screen(576)
            grid-template-columns: repeat(1,1fr)

    &__left,
    &__right
        display: flex
        flex-direction: column
        gap: 20px

    &__left 
        +screen(576)
            order: 2

    &__card
        display: flex
        flex-direction: column
        padding: 30px 20px 
        border-radius: 10px
        border: 2px solid $color-silver
        min-width: 500px
        max-width: 100%

        +screen(1200)
            min-width: 350px

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
            font-size: 24px
            margin-bottom: 25px
            line-height: 1.4

            +screen(576)
                font-size: 18px

        &--date 
            align-self: flex-end
            color: #777

.custom-group
    display: flex
    flex-direction: column

.custom-input
    padding: 8px 10px
    border-radius: 8px
    border: 1px solid $color-silver
    font-size: 16px
    letter-spacing: 0.6px

.custom-textarea
    padding: 8px 10px
    border-radius: 8px
    border: 1px solid $color-silver
    font-size: 16px
    letter-spacing: 0.6px
    min-height: 120px

.custom-label
    font-size: 14px
    +mulMed
    color: $color-text
    margin-bottom: 6px

.btn-green
    background-color: rgb(0, 130, 0 )
    color: $color-white
    font-size: 16px
    +mulMed 
    padding: 13px 45px
    border-radius: 10px
    border: 0
    outline: 0

.btn-blue
    background-color: rgb(43, 84, 223)
    color: $color-white
    font-size: 16px
    +mulMed 
    padding: 13px 45px
    border-radius: 10px
    border: 0
    outline: 0
</style>