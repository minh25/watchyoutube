var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'AutoYoutube',
  description: 'AutoYoutube',
  // script: 'C:\\Users\\ENVY 2020\\Desktop\\ViewSubYoutube\\yt.js'
  script: 'D:\\code\\ViewSubYoutube\\runyt.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.uninstall();