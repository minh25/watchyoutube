const cmd = require("node-cmd");

cmd.run("git pull", (err,data,stderr) => {
    console.log(err);
    console.log(data);
    console.log(stderr);
    cmd.run("node yt.js");
    // process.exit(1);
});