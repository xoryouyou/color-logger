var bunyan = require("bunyan");
var colors = require("colors");
var util = require("util");
var path = require("path");
var bunyanDebugStream = require("bunyan-debug-stream");

class ConsoleStream {
	constructor() {
		this.colorLevels = {
			10: { color: colors.white, string: "trace" },
			20: { color: colors.white, string: "debug" },
			30: { color: colors.green, string: "info" },
			40: { color: colors.yellow, string: "warn" },
			50: { color: colors.red, string: "error" },
			60: { color: colors.bgRed, string: "fatal" }
		};
	}
	write(data) {
		if (!data.component) {
			data.component = "main";
		}

		if (data.src) {
			data.msg = "(" + path.basename(data.src.file) + ":" + data.src.line + ") " + data.msg;
		}

		var message = util.format("%s [%d][%s] %s-%s: %s\n",
			data.time.toISOString(),
			data.pid,
			this.colorLevels[data.level].color(this.colorLevels[data.level].string.padEnd(5)),
			data.name,
			data.component,
			data.msg);

		process.stdout.write(message);

		if (data.err) {
			process.stderr.write(colors.red(data.err.stack) + "\n");
		}
		if ("payload" in data) {
			process.stdout.write(util.inspect(data.payload, {
				colors: true,
				depth: 2,
				compact: false
			}) + "\n");
		}
	}

}

function buildLogger(config) {
	return bunyan.createLogger({
		name: config.logging.name,
		src: config.logging.src,
		streams: [
			{
				level: config.logging.level,
				type: "raw",
				stream: new ConsoleStream()
			}
		],
		serializers: bunyanDebugStream.serializers
	});
}

module.exports = buildLogger;
