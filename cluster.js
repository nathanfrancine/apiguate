//Created by: Ing. Nathan Francine Soto
var chalk = require("chalk");
var cluster = require("cluster");
var os = require("os");

if (cluster.isMaster) {
    for (var i = 0, coreCount = os.cpus().length; i < coreCount; i++) {
        var worker = cluster.fork();
    }
    cluster.on(
        "exit",
        function handleExit(worker, code, signal) {
            if (!worker.exitedAfterDisconnect) {
                var worker = cluster.fork();
            }
        }
    );
} else {
    require("./server");
}
