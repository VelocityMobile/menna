import * as winston from 'winston'

declare namespace menna {
  interface Logger extends winston.LoggerInstance {}
}

declare const menna: menna.Logger;
export = menna;
