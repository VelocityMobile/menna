import { Logger as LoggerInstance } from 'winston'

declare module 'winston' {
}

declare namespace menna {
  interface Logger extends LoggerInstance {}
}

declare const menna: menna.Logger;
export = menna;
