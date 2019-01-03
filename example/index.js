var config = { 
    logging: { 
        name: "TEST", 
        level: "debug", 
        src: true
    } 
};

// create the logger
var logger = require("../src/")(config);

// prepare some JSON data
var payload = { data: { foo: 123, bar: "string" } };
// prepare some message
var msg = "Woopsie";

logger.trace(msg);

// fancy logging with util.inspect
logger.debug({ payload: payload }, msg);

logger.info(msg);
logger.warn(msg);
logger.error(new Error("BOOM!"));
logger.fatal(msg);
