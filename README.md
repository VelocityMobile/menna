# menna

This library uses [winston](https://www.npmjs.com/package/winston) as logger, and streams to [Papertail](https://papertrailapp.com/) via [winston-papertrail](https://www.npmjs.com/package/winston-papertrail) package.

## Installation & testing

```sh
npm install
npm test
```

## Usage

The logger functions are the same as Winston's. The settings can be configured with environment variables, see `lib/menna.js` for details.

```javascript
import log from 'menna';

log.info('ʘ‿ʘ');
```
