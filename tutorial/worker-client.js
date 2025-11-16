const { parentPort, workerData } = require("worker_threads");
const { compute } = require("../exercise/factorial.js");

parentPort.postMessage(compute(workerData));
