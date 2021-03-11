
exports.config = {
    //What test runner we are using
    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },
    /**
     Browser properties, also called as DesiredCapabilities. Allows to configure a lot of browser aspects.
     Documentation for NOT FULL list of capabilites could be found here: https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
     */

    specs: ['./specs/*_spec.js'],

    directConnect: true,
    

    // capabilities: {
    //     'browserName': 'firefox',
    //     specs: ['./specs/css/firefox/*_ff.js','./specs/func/firefox/*_ff.js']
    // },

    // capabilities: {
    //     'browserName': 'chrome',
    //     specs: ['./specs/css/chrome/500px/*_spec.js','./specs/css/chrome/1000px/*_spec.js','./specs/func/chrome/*_spec.js']
    // },

    // multiCapabilities: [
    //     {   'browserName': 'chrome',
    //         specs: ['./specs/css/chrome/500px/*_spec.js','./specs/css/chrome/1000px/*_spec.js','./specs/func/chrome/*_spec.js'] },
    //     {   'browserName': 'firefox',
    //         specs: ['./specs/css/firefox/500px/*_ff.js','./specs/css/firefox/1000px/*_ff.js','./specs/func/firefox/*_ff.js']  }
    // ],

    //This tells protractor that we have Angular 2 app on the page, so synchronizing with it should be done differently than with Angular 1
    useAllAngular2AppRoots: true,

    /**
     Some of protractor life-circle methods. Provided function will be called when browser is started, and your test runner (jasmine2) is initialized.
     You can define some extra logic here, such as reporters, pre/post conditions.
     */
    onPrepare: function () {

        // global.SMALL_TIMEOUT = 2000;

        // global.BD1 = browser;
        // BD1.BD1 = true;
        // BD1.ignoreSynchronization = true;

        // global.BD2 = browser.forkNewDriverInstance();
        // BD2.BD2 = true;
        // BD2.ignoreSynchronization = true;

        // var width = 1366;
        // var height = 1000;
        // BD1.driver.manage().window().setSize(width, height);

        global.EC = protractor.ExpectedConditions;
        // global.waitTime = 20000;

        // implicitlyWait - hidden wait for element existence
        browser.manage().timeouts().implicitlyWait(5000);
        // BD2.manage().timeouts().implicitlyWait(5000);

        // BD1.sleep(5000)

        //Global afterEach for all tests
        // afterEach(function () {
        //     //Wiping cookie files ONLY for current domain
        //     browser.manage().deleteAllCookies();
        //     //Wiping local and session storage
        //     browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        //         .then(undefined,
        //             function (err) {
        //                 // Errors will be thrown when browser is on default data URL.
        //                 // Session and Local storage is disabled for data URLs
        //             });
        // });

        //test matchers
        require("jasmine-expect")

        //Defining nice console reporter
        let JasmineReporter = require('jasmine2-reporter').Jasmine2Reporter

        //Options object for console reporter
        let options = {
            pendingSpec: false,
            symbols: {
                pending: '*  '.strikethrough,
            }
        };
        //Adding reporter to jasmine.
        jasmine.getEnv().addReporter(new JasmineReporter(options));

        var today = new Date(),
            year = today.getFullYear(),
            month = today.getMonth() + 1,
            date = today.getDate(),
            hh = today.getHours(),
            min = today.getMinutes(),
            timeStamp = year + '' + month + '' + date + '' + hh + min;

        //Reports to files
        var jasmineReporters = require('jasmine-reporters');
        var junitReportPath = 'testresults/';
        var screenshotsPath = 'testresults/screenshots/';

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: junitReportPath,
            filePrefix: '_',
            useDotNotation: false,
            // Allows Jenkins to find and show screenshots just inside JUnit report
            systemOut: function(spec) {
                if (spec.status == 'failed') {
                    let filename =  __dirname + '/' + screenshotsPath + spec.fullName + '.png';
                    return '\n[[ATTACHMENT|' + filename + ']]';
                }
                return '';
            }
        }));

        var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

        //HTML reporter
        var reporter = new HtmlScreenshotReporter({
            dest: './testresults/html',
            showSummary: true,
            showConfiguration: true,
            filename: 'index.html',
        //  reportTitle: "E2E Report--Test run on " + timeStamp,
            captureOnlyFailedSpecs: true
         })
         
        jasmine.getEnv().addReporter(reporter);

        //Another html reporter (testing)
        var Jasmine2HtmlReporter = require('wordwrap-protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: './testresults/test/',
          screenshotsFolder: 'images',
          takeScreenshots: true,
          takeScreenshotsOnlyOnFailures: true,
          filePrefix: 'index',
          reportOnlyFailedSpecs: true
        })
        );

        //Screenshots
        // let ScreenShotOnFailureReporter = require('./utils/screenshoter.js').ScreenShotOnFailureReporter
        // jasmine.getEnv().addReporter(new ScreenShotOnFailureReporter({screenShotDirectory: screenshotsPath}));
    },

    resultJsonOutputFile: './testresults/output.json'
};