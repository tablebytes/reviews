const cluster = require('cluster');
const os = require('os');
const CPUS = os.cpus();
if (cluster.isMaster) {
    // create a worker for each cpu
    CPUS.forEach(() => cluster.fork());

 
    cluster.on("disconnect", worker => {
        console.log("Cluster %d disconnected", worker.process.pid);
    });
 
    cluster.on("exit", worker => {
        console.log("Cluster %d is dead", worker.process.pid);
         // Ensure starts of a new cluster if an old one dies 
        cluster.fork();      
    });
 
} else {
    require("./server.js"); 
}