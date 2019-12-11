/**
 * @description   event bus
 */
import Vue from 'vue'

let eventBus = new Vue()

Vue.prototype.$bus = eventBus

export default eventBus
