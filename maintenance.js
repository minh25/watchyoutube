const cmd = require("node-cmd");

cmd.run("git pull", (err,data,stderr) => {
    cmd.run("node yt.js");
    process.exit(1);
});