import Vue from 'vue'
import {Logger} from './logger'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $logger: Logger
  }
  interface Vue {
    $logger: Logger
  }
}