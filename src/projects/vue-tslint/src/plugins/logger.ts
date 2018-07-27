export default class Logger {
  private debug: boolean
  private prefix: string
  constructor(debug: boolean = false, prefix: string) {
    this.debug = debug
    this.prefix = prefix
  }

  public info(...texts: string[]): void {
    // tslint:disable-next-line
    console.log(`${this.prefix}:`, ...texts)
  }
}
