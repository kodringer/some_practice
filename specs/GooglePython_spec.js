const { browser, $, ExpectedConditions, $$ } = require("protractor")
browser.waitForAngularEnabled(false)

let url = "https://google.com"
let search_input = $('input[name="q"]')
let search = $('input[type=submit]')
let search_results=$$('div[id=search] div[class=g] a[href]')

describe ('Go to google and search Python', ()=>{

    it('go to google and search python', ()=>{
        
        browser.get(url)
        search_input.sendKeys("python")
        search.sendKeys(protractor.Key.ENTER)
    })

    it('select python site and go to Python Downloads', ()=>{

        let python_result = search_results.filter((elem)=>{
                return elem.getText()
                    .then((text)=>{
                    return text === 'Downloads'
                    })
                })
        browser.sleep(3000) // for demo
        
        if (EC.textToBePresentInElement($(python_result), 'python.org'))
          {
            python_result.click()
          }
        browser.sleep(3000) // for demo
    })

    it('Investigate python site', ()=>{
        
    let download_buttons = $$('.header-banner a.button')
    let download_button = download_buttons.filter((elem)=>{
        return elem.isDisplayed().then((visible_button)=>{
             return visible_button;
        })
    }).first()

    let download_button_url = download_button.getAttribute('href')
    let python_releases = $$('.list-row-container li .release-version')
    let python_releases_end = $$('.list-row-container li .release-end')
    
    var version = download_button.getText().then((text) => { version = text.replace('Download Python ','')
        return version })
    expect(download_button.getText()).toEqual('Download Python 3.9.2');
    expect(version).toEqual('3.9.2')
//    expect(download_button_url).toContain(version)

//  ^^^^ test disabled because of python site detects webdriver like "other OS" and changes url of button
// - Expected 'https://www.python.org/downloads/release/python-392/' to contain '3.9.2'.

// for release dates used manually array index. 
// did not found like for protractor get index of element
// planned get index of the array "python_releases" and use it for "python_releases"

    python_releases.then(function(items) { 
        expect(items[1].getText()).toBe('3.8')
        })
    python_releases_end.then(function(items) { 
        expect(items[1].getText()).toBe('2024-10')
        })

    })
})