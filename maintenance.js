const cmd = require("node-cmd");

cmd.run("git pull --rebase", (err,data,stderr) => {
    cmd.run("node yt.js");
    process.exit(1);
});