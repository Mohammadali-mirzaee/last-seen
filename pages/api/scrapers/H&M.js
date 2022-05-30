const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const urls = [
    {
        url: 'https://www2.hm.com/sv_se/',
        query: 'herr/nyheter/klader.html?sort=stock&image-size=small&image=model&offset=0&'
    },
    {
        url: 'https://www2.hm.com/sv_se/',
        query: 'dam/nyheter/klader.html?sort=stock&image-size=small&image=model&offset=0&'
    }

]

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
};


const getPages = async (browser) => {
    console.log('Get all Pages av H&M')
    const pageLinks = []
    for (let i = 0; i < urls.length; i++) {
        try {
            const url = urls[i]
            const page = await browser.newPage()
            await page.goto(`${url.url}${url.query}`, { waitUntil: 'networkidle2', timeout: 70000 })
            /*    await page.waitForSelector('.load-more-heading') */

            const totalAmountOfProducts = await page.evaluate(() =>
                document.querySelector('.load-more-heading')?.innerText.split('av')[1].replace('Artiklar', '').trim()
            )
            const pageCount = Math.ceil(totalAmountOfProducts / 36)
            for (let i = 0; i < pageCount; i++) {
                pageLinks.push(`${url.url}${url.query}page-size=${i * 36}`)
            }
            await page.close()
            console.log(`Amount of Pages : ${pageLinks.length}`)


        } catch (error) {
            throw new Error(error)
        }
    }
    return pageLinks
}

const getProductLinks = async (browser, pageLinks) => new Promise((resolve, reject) => {
    console.log('Get product Links')

    const run = async () => {

        const page = await browser.newPage()
        const resultProductLinks = []
        const len = pageLinks.length
        let i = 0
        const loop = async () => {
            try {
                await page.goto(pageLinks[i], { watUntil: 'networkidle2', timeout: 70000 })
                const productHref = await page.evaluate(() =>
                    Array.from(document.querySelectorAll('.hm-product-item .image-container a')).map(x => x.href))
                resultProductLinks.push(...productHref)
                i++
                console.log(`Total Product Links:${resultProductLinks.length}`)
                if (i < len) {
                    return loop()
                }
                await page.close()
                return resolve(resultProductLinks.slice(0, 300))
            } catch (error) {
                console.log(error)
            }
        }
        return loop()
    }
    return run()

})

const getProducts = async (browser, productHrefLinks) => new Promise((resolve, reject) => {

    console.log('Get products')
    const resultProducts = []
    const run = async () => {
        const page = await browser.newPage()
        const len = productHrefLinks.length
        let b = 0

        const loop = async () => {
            const href = productHrefLinks[b]

            try {
                await page.goto(href, { watUntil: 'networkidle2', timeout: 70000 })

            } catch (error) {
                console.log(error)
            }
            let product

            try {
                product = await page.evaluate(({ link }) => {

                    const productInfo = JSON.parse(document.querySelector('#product-schema[type="application/ld+json"]').innerHTML)
                    const productLink = link
                    const name = productInfo.name.trim()
                    const description = productInfo.description.trim()
                    const price = productInfo.offers[0].price
                    const image = productInfo.image.replace('//lp2.hm.com/', 'https://lp2.hm.com/')?.replace('//lp.arket.com', 'https://lp.arket.com')?.replace('//lp.weekday.com', 'https://lp.weekday.com')?.trim()
                    const sku = productInfo.sku.trim()
                    const color = productInfo.color
                    const brand = productInfo.brand.name
                    const sizeElement = document.querySelectorAll('.picker-list li button')
                    if (!sizeElement) {
                        sizeElement = []
                    }
                    const size = Array.from(sizeElement)?.map(x => x?.innerText)?.slice(1)?.slice(0, -1)
                    const category = productInfo.category.name.trim()
                    const extraImageElement = document.querySelectorAll('.sticky-wrapper figure img')
                    if (!extraImageElement) {
                        extraImageElement = []
                    }

                    //Array.from(document.querySelectorAll('.sticky-wrapper figure img'))?.map(x => x?.src?.replace('//lp2.hm.com/', 'https://lp2.hm.com/').replace('//lp.arket.com', 'https://lp.arket.com')?.trim())?.slice(1)
                    const extraImage = Array.from(extraImageElement)?.map(x => x?.src?.trim())?.slice(1)



                    return {
                        productLink: productLink,
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        sku: sku,
                        color: color,
                        brand,
                        size: size,
                        category,
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
            if (b < len) {
                return loop()
            }
            await page.close()

            console.log({ productsLengt: resultProducts.length })

            return resolve(resultProducts)

        }
        return loop()
    }
    return run()
})






const scraper = async () => new Promise((resolve, reject) => {

    const run = async () => {
        const browser = await puppeteer.launch(options)
        const pageLinks = await getPages(browser)
        const productHrefLinks = await getProductLinks(browser, pageLinks)
        const products = await getProducts(browser, productHrefLinks)
        await browser.close()
        console.log(products)
        return resolve(products)
    }
    return run()
})



//scraper()

module.exports = scraper