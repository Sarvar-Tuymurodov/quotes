<template>
    <Transition v-show="alertStatus" name="fade">
            <div class="done-alert__overlay"></div>
    </Transition>
    <Transition v-show="alertStatus" name="slide-fade">
        <div class="done-alert__modal" role="dialog">
            <div class="done-alert__modal--head">
                <div class="done-alert__modal--icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
                        <path style="fill:#A5EB78;" d="M433.139,67.108L201.294,298.953c-6.249,6.249-16.381,6.249-22.63,0L78.861,199.15L0,278.011  l150.547,150.549c10.458,10.458,24.642,16.333,39.431,16.333l0,0c14.788,0,28.973-5.876,39.43-16.333L512,145.968L433.139,67.108z"/>
                        <g style="opacity:0.1;">
                            <path d="M485.921,119.888L187.59,418.22c-8.254,8.253-18.633,13.882-29.847,16.391c9.363,6.635,20.608,10.28,32.235,10.28l0,0   c14.788,0,28.973-5.876,39.43-16.333L512,145.966L485.921,119.888z"/>
                        </g>
                    </svg>
                </div>
                <div class="done-alert__modal--title">Successfully added!</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import store from "@/store";
import { computed, ref, watch} from "vue";

const alertStatus = ref(false);

watch(() => store.state.alertSuccess, function() {
    alertStatus.value = store.state.alertSuccess
});

</script>

<style lang="sass">
.done-alert
    &__overlay
        content: ""
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 50
        background: #2c3e50
        opacity: 0.6
        cursor: pointer

    &__modal
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        margin: auto
        max-width: 520px
        width: 100%
        background: $color-white
        z-index: 999
        transform: none
        padding: 30px 20px
        border-radius: 30px
        height: max-content
        box-shadow: -5px 10px 50px rgba(0, 0, 0, 0.1)

        display: flex
        flex-direction: column
        justify-content: center
        overflow-y: auto

        +screen(576)
            max-width: 100%
            height: 100%
            border-radius: 0
            padding: 30px

        &--head
            position: relative
            display: flex
            align-items: center
            flex-direction: column
            margin-bottom: 35px

        &--icon
            margin-bottom: 25px
            max-width: 130px
            display: flex

            & svg 
                max-width: 100%
                max-height: 100%
                width: 100%
                height: 100%

        &--title
            font-size: 30px
            color: $color-black

            +screen(576)
                font-size: 24px

        &--close
            position: absolute
            right: -20px
            top: -20px
            cursor: pointer

            +screen(576)
                right: 0
                top: 10px

.form
    &__group
        display: flex
        flex-direction: column
        margin-bottom: 30px

    &__head
        display: flex
        justify-content: space-between

    &__label
        font-size: 14px
        color: rgba($color-black, 0.5 )
        margin-bottom: 12px

.fade-enter-active,
.fade-leave-active
    transition: opacity 0.5s


.fade-enter-from
    opacity: 0.3 !important


.fade-leave-to
    opacity: 0 !important


.slide-fade-enter-active
    transition: all 0.4s


.slide-fade-leave-active
    transition: all 0.4s


.slide-fade-enter-from,
.slide-fade-leave-to
    transform: translateY(-20px)
    opacity: 0
</style>
