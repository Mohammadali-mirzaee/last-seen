const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
/* 
const fs = require("fs")
const { writeFile } = require('fs'); */
const options = {
    defaultViewport: null,
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
        '--proxy-server= http://proxylist.geonode.com/api/proxy-list?limit=50&page=1&sort_by=lastChecked&sort_type=desc&speed=fast&anonymityLevel=elite',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--use-gl=egl',
        `--window-size=1000,1000`,
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    ],
    setExtraHTTPHeaders: {
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8',
    },
}

const urls = [
    'https://eu.puma.com/se/en/men/exclusive-trends',
    'https://eu.puma.com/se/en/women/exclusive-trends'
]


const getProductLinks = async (browser) => {
    console.log('Get Product Links')
    const resultProductLinks = [];

    for (let i = 0; i < urls.length; i++) {
        try {
            const url = urls[i]
            const page = await browser.newPage();
            await page.goto(`${url}`, { waitUntil: 'load', timeout: 70000 })
/*             await page.waitForSelector('button[data-component="plp/LoadMore"]')
 */            await page.click('button[data-component="plp/LoadMore"]')
            const totalLinkOfProducts = await page.evaluate(() =>
                Array.from(document.querySelectorAll('.product-grid >div .grid-tile .product-tile-image-wrapper .product-tile-image-link')).map(x => x.href)
            )

            resultProductLinks.push(...totalLinkOfProducts)
            await page.close();
            console.log(`Amount of Products links : ${totalLinkOfProducts.length}`)
        }
        catch (error) {
            throw new Error(error)
        }
    }
    return [...new Set(resultProductLinks)].slice(0, 100)

}

const getProducts = async (browser, productHrefLinks) => {
    console.log('Get products')
    const resultProducts = []

    const run = async () => {

        const page = await browser.newPage()
        const len = productHrefLinks.length
        let b = 0

        const loop = async () => {
            const href = productHrefLinks[b]

            try {
                await page.goto(href, { waitUntil: 'load', timeout: 70000 })
            } catch (error) {
                console.log(error)

            }
            let product

            try {
                product = await page.evaluate(({ link }) => {

                    const productInfo = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerHTML)
                    const productLink = link
                    const name = productInfo.name.trim()
                    const description = productInfo.description.trim()
                    const price = productInfo.offers.price
                    const image = productInfo.image[0]
                    const sku = productInfo.sku
                    const color = productInfo.color
                    const brand = productInfo.brand
                    const sizeElement = document.querySelectorAll('.product-variation--size .product-variation-swatch')
                    if (!sizeElement) {
                        sizeElement = []
                    }
                    const size = [...new Set(Array.from(sizeElement).map(x => x?.innerText?.split('.')[0]))]
                    const extraImage = productInfo.image.slice(1)

                    return {
                        productLink: productLink,
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        sku: sku,
                        color: color,
                        brand: brand,
                        size: size,
                        extraImage: extraImage
                    }

                }, { link: productHrefLinks[b] })
            } catch (error) {
                console.log(error)

            }
            if (product) {
                resultProducts.push(product)
            }
            b++
            console.log(b / len)
            if (b < len) {
                return loop()
            }
            await page.close()

            console.log({ productLength: resultProducts.length })

            return resultProducts
        }
        return loop()
    }
    return run()
}


const scraper = async () => {
    const run = async () => {
        const browser = await puppeteer.launch(options)
        const productHrefLinks = await getProductLinks(browser)
        const products = await getProducts(browser, productHrefLinks)
        await browser.close()


        /*      const path = '../../../public/data/Puma.json';
             const Puma = products
     
     
     
             writeFile(path, JSON.stringify(Puma, null, 2), (error) => {
                 if (error) {
                     console.log('An error has occurred ', error);
                     return;
                 }
                 console.log('Data written successfully to disk');
             }); */

        console.log(products)
        return products
    }
    return await run()
}
//scraper({})
module.exports = scraper