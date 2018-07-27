import Vue, { PluginFunction, PluginObject } from 'vue'
import {Vue as _Vue} from 'vue-property-decorator'
import Logger from './logger'

interface IOptions {
  debug: boolean
}
const prefix = 'APP'
export default function(vue: typeof _Vue, options: IOptions): void {
  // register logger to Vue and vm
  const logger: Logger = new Logger(options.debug, prefix)
  vue.$logger = logger
  // tslint:disable-next-line:no-unsafe-any
  vue.prototype.$logger = logger
}
