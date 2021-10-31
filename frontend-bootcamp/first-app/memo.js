const os = require('os');

var totalMemo = os.totalmem();
var freeMemo = os.freemem();

console.log("Total: " + totalMemo);
console.log("Free: " + freeMemo);