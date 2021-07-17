
function Yt(username, password, list, comment, when_like = 5, when_sub = 10, when_cmt = 15, sub_first_video = false, like_video = true, comment_video = true, sub_channel = true, skip_ads = true, socket, machine) {
    /*
    username: String
    password: String
    list: Array of Objects{"search": "...", "title": "...", "watch": "..."} ( title must be correct totally)
    comment: Array of Strings
    when_like, when_sub, when_cmt: integer number (time to like, sub, cmt after choosing video)
    sub_first_video, like_video, comment_video, sub_channel, skip_ads: bool 
    */
    this.username = username;
    this.password = password;
    this.list = list;
    this.comment = comment;
    this.when_like = when_like;
    this.when_sub = when_sub;
    this.when_cmt = when_cmt;
    this.sub_first_video = sub_first_video;
    this.like_video = like_video;
    this.comment_video = comment_video;
    this.sub_channel = sub_channel;
    this.skip_ads = skip_ads;

    this.time_end;
    this.total_video_time = 0;

    this.socket = socket;
    this.machine = machine;

    let browser;
    let page;

    function log(message) {
        console.log("mes :"+message + "     " + machine);
        socket.emit("status", machine, message);
    }

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }

    async function init_browser_and_new_page() {
        // init =====================================================================================
        log("init...");
        try{
            browser = await puppeteer.launch({
                headless: true,
                product: 'firefox',
                args: [
                '-wait-for-browser'
                ],
                executablePath: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
                defaultViewport: {width:1250, height:800},
            });
            page = await browser.newPage();
            //await page.screenshot({path: '1.png'});
        }catch(err){
            throw err;
        }
    };

    async function mute_page() {
        try {
            await delay(200);
            await page.keyboard.down('Control');
            await delay(200);
            await page.keyboard.press('M');
            await delay(200);
            await page.keyboard.up('Control');
        } catch (error) {
        }
    }

    async function go_youtube() {
        // go page ==================================================================================
        log("go to youtube...");
        try{
            await page.goto('https://www.youtube.com');
            //await page.screenshot({path: '1.2.png'});
        }catch(err){
            throw err;
        }
    };

    async function sign_in_with_id_and_password(username, password) {
        // sign in ==================================================================================
        log("sign in...");
        try{
            await page.waitForSelector('path[d="M12,0 C18.62375,0 24,5.37625 24,12 C24,18.62375 18.62375,24 12,24 C5.37625,24 0,18.62375 0,12 C0,5.37625 5.37625,0 12,0 Z M12,10.63625 C13.66,10.63625 15,9.29625 15,7.63625 C15,5.97625 13.66,4.63625 12,4.63625 C10.34,4.63625 9,5.97625 9,7.63625 C9,9.29625 10.34,10.63625 12,10.63625 Z M12,12.40875 C8.33375,12.40875 5.455,14.18125 5.455,15.8175 C6.84125,17.95 9.26875,19.3625 12,19.3625 C14.73125,19.3625 17.15875,17.95 18.545,15.8175 C18.545,14.18125 15.66625,12.40875 12,12.40875 Z"]', {
                visible: true,
            });
            //await page.screenshot({path: '1.3.png'});
            await delay(2000);
            await page.click('path[d="M12,0 C18.62375,0 24,5.37625 24,12 C24,18.62375 18.62375,24 12,24 C5.37625,24 0,18.62375 0,12 C0,5.37625 5.37625,0 12,0 Z M12,10.63625 C13.66,10.63625 15,9.29625 15,7.63625 C15,5.97625 13.66,4.63625 12,4.63625 C10.34,4.63625 9,5.97625 9,7.63625 C9,9.29625 10.34,10.63625 12,10.63625 Z M12,12.40875 C8.33375,12.40875 5.455,14.18125 5.455,15.8175 C6.84125,17.95 9.26875,19.3625 12,19.3625 C14.73125,19.3625 17.15875,17.95 18.545,15.8175 C18.545,14.18125 15.66625,12.40875 12,12.40875 Z"]');
            //await page.screenshot({path: '1.4.png'});
            await page.waitForSelector('input[type="email"]', {
                visible: true,
            });

            //await page.screenshot({path: '2.png'});
            await delay(2000);
            for(let i = 0; i<username.length; i++) {
                await page.type('input[type="email"]', username[i]);
                await delay(200);
            }
            page.keyboard.press('Enter');
            await page.waitForSelector('input[type="password"]', {
                visible: true,
            });

            //await page.screenshot({path: '3.png'});
            await delay(200);
            for(let i = 0; i<password.length; i++) {
                await page.type('input[type="password"]', password[i]);
                await delay(200);
            }
            page.keyboard.press('Enter');
            console.log(page.url());
            await delay(20000);
        }catch(err){
            throw err;
        }
    };

    async function choose_random_video_in_main_page() {
        log("watching random video in main page");
        try {
            await delay(1000);
            //await page.screenshot({path: '3.1.png'});
            await page.click('ytd-rich-item-renderer.style-scope:nth-child(4)');
            //  chup anh
            await delay(10000);
            //await page.screenshot({path: '3.2.png'});
        } catch (error) {
            log("Can't choose random video in main page");
            throw error;
        }
    };

    async function choose_random_video_in_suggest_list() {
        log("watching random video in suggest list");
        try {
            while (true) {
                try {
                    await page.click(`ytd-compact-video-renderer.style-scope:nth-child(${Math.floor(Math.random() * 8) + 1})`);
                } catch (error) {
                    continue;
                }
                break;
            }
            //  chup anh
            await delay(10000);
            //await page.screenshot({path: 'a.png'});
        } catch (error) {
            log("Can't choose random video in suggest list");
            throw error;
        }
    }

    async function search_video_with_search_name(search_name) {
        // search ===================================================================================
        log("search: "+search_name);
        try{
            console.log(page.url());
            await delay(5000);
            await page.waitForSelector('input[name="search_query"]', {
                visible: true,
            });
            await page.click('input[name="search_query"]');
            await delay(200);
            await page.keyboard.down('Control');
            await delay(200);
            await page.keyboard.press('A');
            await delay(200);
            await page.keyboard.up('Control');
            await delay(200);
            await page.keyboard.press('Backspace');
            await delay(200);
            for(let i = 0; i<search.length; i++) {
                await page.keyboard.type(search_name[i]);
                await delay(200);
            }
            page.keyboard.press('Enter');
        }catch(err){
            throw err;
        }
    };

    async function choose_video_with_title_name(title_name) {
        // choose video =============================================================================
        log("choose video: "+title_name);
        try{
            await delay(2000);
            await page.waitForSelector(`a[id="video-title"][title="${title_name}"]` , {
                visible: true,
            });
            await page.click(`a[id="video-title"][title="${title_name}"]`);
        }catch(err){
            throw err;
        }
    };

    async function choose_list_with_title_name(title_name) {
        // choose video =============================================================================
        log("choose list: "+title_name);
        try{
            await delay(2000);
            await page.waitForSelector(`span[id="video-title"][title="${title_name}"]` , {
                visible: true,
            });
            await page.click(`span[id="video-title"][title="${title_name}"]`);
        }catch(err){
            throw err;
        }
    };

    async function check_total_video_time(percent, is_rand_video = false) {
        try{
            let t = parseInt(await page.evaluate('document.querySelector("div.ytp-progress-bar").getAttribute("aria-valuemax")'));
            if (t != this.total_video_time) {

                this.total_video_time = t;
                let added_time;

                if (is_rand_video == true)
                    added_time = 300;
                else
                    added_time = ((total_video_time * percent > 30) ? (this.total_video_time * percent) : 30);

                this.time_end = (new Date().getTime()) + added_time  * 1000;
                console.log(`Watch time: ${added_time}`);
                console.log(`Total video time: ${this.total_video_time}`);
                console.log(`Time to end: ${this.time_end}`);
                console.log(`Curent time: ${new Date().getTime()}`);

                return true;
            }
            return false;
        }catch(err){
            // log(err);
            return false;
        }
    }

    async function skipads(title) {
        try{
            if ("" === await page.evaluate('document.querySelector("span.ytp-ad-skip-button-container").getAttribute("style")')) {
                await page.click(`span[class="ytp-ad-skip-button-container"]`);
                log(`Skip ads at ${title}`);
            }
        }catch(err){
            // log(err);
            // log("Can't skip ads!!!");
            // throw err;
        }
    };

    async function clicklike(title) {
        log(`like ${title}`);
        try{        
            let x = await page.evaluate(
                () => document.querySelector('ytd-menu-renderer.ytd-video-primary-info-renderer > div:nth-child(1) > ytd-toggle-button-renderer:nth-child(1) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)').getAttribute("aria-pressed")
            );
            if (x == "false") {
                await page.click('ytd-menu-renderer.ytd-video-primary-info-renderer > div:nth-child(1) > ytd-toggle-button-renderer:nth-child(1) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)');
                log(`liked ${title}`);
            }
        }catch(err){
            // log(err);
            log("Can't like!!!");
            // throw err;
        }
    };

    async function subcribe(title) {
        log(`subscribe ${title}`);
        try{
            let x = await page.evaluate(
                () => document.querySelector('ytd-subscribe-button-renderer[class="style-scope ytd-video-secondary-info-renderer"] > tp-yt-paper-button').getAttribute("subscribed")
            );
            if (x === null) {
                await page.click('ytd-subscribe-button-renderer[class="style-scope ytd-video-secondary-info-renderer"]');
                log(`subscribed ${title}`);
            }
        }catch(err){
            // log(err);
            log("Can't subscribe!!!");
            // throw err;
        };
    };

    async function send_comment_with_cmt(title, cmt) {
        try{
            if (comment[0] == '') {
                return;
            }

            log(`comment ${title}`);

            let n = Math.floor(Math.random() * comment.length);

            await page.keyboard.press('PageDown');
            await delay(2000);
            await page.waitForSelector(`div[id="placeholder-area"]` , {
                visible: true,
            });
            await page.click(`div[id="placeholder-area"]`);
            await delay(1000);
            for (let i = 0; i < cmt[n].length; i++){
                await page.keyboard.type(cmt[n][i]);
                await delay(200);
            }
            await delay(200);
            await page.keyboard.down('Control');
            await delay(200);
            await page.keyboard.press('Enter');
            await delay(200);
            await page.keyboard.up('Control');

            log(`commented ${title}`);

            await delay(2000);
            await page.keyboard.press('Home');
            await delay(2000);
        }
        catch(err){
            // log(err);
            log("Can't comment!!!");
            // throw err;
        }
    };

    async function nextvideo() {
        try{
            if (null !== await page.$('path[d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z"]')) {
                log("Video ends!");
                await delay(1000);
                // await page.click('path[d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z"]');
                return true;
            }
        }
        catch(err){
            // log(err);
            // log("Can't next video!!!");
            // throw err;
        }
    };

    async function watch_video(title, is_first_video = false, is_rand_video = false, percent = 1) {
        try {
            await delay(2000);

            let deltaTime = 0;


            while (true) {
                await delay(1000);
                deltaTime ++;

                await check_total_video_time(percent, is_rand_video);

                if (skip_ads == true)
                    await skipads(title);

                if (deltaTime == when_like && like_video == true && is_rand_video != true)
                    await clicklike(title);

                if (deltaTime == when_sub && sub_channel == true && is_rand_video != true)
                    await subcribe(title);
                else if(deltaTime == when_sub && sub_channel == true && is_first_video == true && sub_first_video == true)
                    await subcribe(title);

                if (deltaTime == when_cmt && comment_video == true && is_rand_video != true)
                    await send_comment_with_cmt(title, comment);

                if (await nextvideo())
                    break;

                if ((new Date().getTime()) > this.time_end)
                    break;

                if(browser.isConnected() == false)
                    throw new Error('Browser is not connected!!!')
            }
        } catch (error) {
            throw error;
        }
    }

    async function filter_list() {
        // filter ===================================================================================
        log("filter");
        try{
            await delay(2000);
            await page.waitForSelector('path[d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"]', {
                visible: true,
            });
            await page.click('path[d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"]');

            await delay(2000);
            await page.waitForSelector('ytd-search-filter-group-renderer.style-scope:nth-child(2) > ytd-search-filter-renderer:nth-child(6) > a:nth-child(1) > div:nth-child(1)', {
                visible: true,
            });
            await page.click('ytd-search-filter-group-renderer.style-scope:nth-child(2) > ytd-search-filter-renderer:nth-child(6) > a:nth-child(1) > div:nth-child(1)');
        }catch(err){
            log(err);
        }
    }

    async function watch_list(title, is_first_video = false, is_rand_video = false, percent = 1) {
        try {
            await delay(2000);

            let deltaTime = 0;


            while (true) {
                await delay(1000);
                deltaTime ++;

                if(await check_total_video_time(percent, is_rand_video)) {
                    deltaTime = 0;
                }

                if (skip_ads == true)
                    await skipads(title);

                if (deltaTime == when_like && like_video == true && is_rand_video != true)
                    await clicklike(title);

                if (deltaTime == when_sub && sub_channel == true && is_rand_video != true)
                    await subcribe(title);
                else if(deltaTime == when_sub && sub_channel == true && is_first_video == true && sub_first_video == true)
                    await subcribe(title);

                if (deltaTime == when_cmt && comment_video == true && is_rand_video != true)
                    await send_comment_with_cmt(title, comment);

                if (await nextvideo())
                    break;

                // if ((new Date().getTime()) > this.time_end)
                //     break;

                if(browser.isConnected() == false)
                    throw new Error('Browser is not connected!!!')
            }
        } catch (error) {
            throw error;
        }
    }

    this.yt = async function(){
        try {
            // let search = "";
            let title = "";
            let percent = "";

            await init_browser_and_new_page();
            await mute_page();
            await go_youtube();
            await sign_in_with_id_and_password(username, password);

            await choose_random_video_in_main_page();

            await watch_video(title, true, true, 1);

            // for list =====================================================================================
            for(let i = 0; i < list.length; i++){
                search = list[i]['search'];
                title = list[i]['title'];
                percent = parseInt(list[i]['watch']);

                if (percent == -1) {
                    while(true) {
                        await search_video_with_search_name(search);
                        await filter_list();
                        await choose_list_with_title_name(title);
                        await watch_list(title, false, false, 1);
                    }
                }
                
                await search_video_with_search_name(search);
                await choose_video_with_title_name(title);
                await watch_video(title, false, false, percent);

                title = "";
                await choose_random_video_in_suggest_list();
                await watch_video(title, false, true, percent);
            };

            await browser.close();
            log("End list. Closed browser!");
        } catch (error) {
            //log(error);
            await browser.close();
            log("Closed browser!");
        }
    };

    this.shutdown = async function() {
        await browser.close();
    };
};

const puppeteer = require('puppeteer-core');
const cmd = require("node-cmd");

//socket connection
let io = require('socket.io-client');
//      http://192.168.1.5:3000/
//      http://autoyt.herokuapp.com/
//      http://171.244.143.245/
let socket = io.connect("http://171.244.143.245/", {
    reconnection: true
});



//get own ID

function getID() {
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log(add);
    add=add.split(".");
    let ipadd = "NET01_" + add[3];
    console.log(ipadd);
    socket.emit("name", ipadd);
    console.log("connected: "+ipadd);
    let x;
    socket.on("runcommand", (arg) => {
        //Yt(username, password, list, comment, when_like = 5, when_sub = 10, when_cmt = 15, sub_first_video = false, like_video = true, comment_video = true, sub_channel = true, skip_ads = true, socket, machine)
        //[ip, username, password, videolist[], comment[], time[], option[], status]
        //compare incomming command equal local ip address
        console.log(arg[0] + "          "+ipadd);
        if(arg[0] == ipadd){
            x = new Yt(arg[1], arg[2], arg[3], arg[4], arg[5][0], arg[5][2], arg[5][1], arg[6][0], arg[6][1], arg[6][2], arg[6][3], arg[6][4], socket, ipadd);
            x.yt();
                    
            socket.on('stopnow', (stop) => {
                //console.log(stop + "----------" +ipadd);
                if(stop==ipadd) {
                    console.log(stop + "----------" +ipadd);
                    x.shutdown();
                    console.log("tat day");
                }
                    
            });

        }
    });

    socket.on("restartStart", function() {
        console.log("ok");
        socket.emit("name", ipadd);
    })

})
}

setTimeout(getID, 1000)

socket.on("updateClientStart", function() {
    console.log("startUpdateClient");
    cmd.run("node maintenance.js", (err,data,stderr) => {
        console.log(err);
        console.log(data);
        console.log(stderr);
        process.exit(1);
    });
})
