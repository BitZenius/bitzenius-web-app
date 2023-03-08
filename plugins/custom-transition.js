import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const growTransition = createSimpleTransition('grow-transition')

Vue.component('grow-transition', growTransition)