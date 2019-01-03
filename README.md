# color-logger
Simple color logger based on bunyan

![screenshot from 2019-01-03 09-19-28](https://user-images.githubusercontent.com/777569/50628569-ef5dd500-0f38-11e9-833e-78613b45595f.png)

See example for usage.

## config
* name - name of the logger 
* level - logging level
* src - toggles src file:line display

```javascript
var config = { 
    logging: { 
        name: "TEST", 
        level: "debug", 
        src: true
    } 
};

// create the logger
var logger = require("../src/")(config);

// fancy logging with util.inspect
logger.debug({ payload: payload }, msg);
```
