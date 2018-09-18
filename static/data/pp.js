const puppeteer = require('puppeteer');
const cookiesFilePath = __dirname + `/cookie.js`
const jsonfile = require('jsonfile')
const sleep = require('sleepjs')

const shoplink = 'https://h5.ele.me/shop/#id=919661&rank_id=4139d2afaf034133a17f691b306556b0&s_type=0'


  ; (async () => {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['-psn_0_57358', '--restore-last-session', '--flag-switches-begin', '--flag-switches-end']
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 375,
      height: 667
    });
    //session-cookie
    try {
      var obj = await jsonfile.readFile(`${cookiesFilePath}`)
      //console.dir(obj)
      if (obj.length !== 0) {
        for (let cookie of obj) {
          await page.setCookie(cookie)
        }
        console.log('Session has been loaded in the browser')
      }
    }
    catch (err) {
      console.log(err)
    }
    //

    await page.goto(shoplink);
    await sleep(2000)
    await page.focus('body')
    await page.reload();
    try {
      let elements = await page.$$('a.section-title');
      elements[0].click();
    }
    catch (err) { console.log(err) }
    await page.waitForNavigation()
    const srcs = await page.evaluate(s => {
      console.log(s.innerHTML)
    }, 'body>div>div')

    // Save Session Cookies
    const cookiesObject = await page.cookies()
    // Write cookies to temp file to be used in other profile pages
    jsonfile.writeFile(cookiesFilePath, cookiesObject, { spaces: 2 })
      .then(res => console.log('Session has been successfully saved')
      )
      .catch(err => console.log('The file could not be written.', err)
      )

    //await browser.close();
  })();