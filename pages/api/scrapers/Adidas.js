const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const startLink = `https://www.adidas.se/senaste`



/*  */
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
    console.log('Get all pages')

    try {
        const pageLinks = []
        const page = await browser.newPage()
        await page.goto(startLink, { waitUntil: 'networkidle2' })

        const totalAmountOfProducts = await page.evaluate(() =>
            document.querySelector('[data-auto-id="plp-header-bar-products-count"]').innerText.replace(/[^\w\s]/gi, '').trim()
        )

        const pageproductSize = await page.evaluate(() =>
            document.querySelectorAll('[data-auto-id="product_container"] .grid-item .glass-product-card >a').length
        )
        const pageCount = Math.ceil(totalAmountOfProducts / pageproductSize)
        for (let i = 0; i < pageCount; i++) {
            pageLinks.push(`https://www.adidas.se/senaste?start=${i * pageproductSize}`)
        }
        await page.close()
        console.log(`Amount of pages : ${pageLinks.length}`)
        return pageLinks
    }
    catch (error) {
        throw new Error(error)
    }
}

const getProductLinks = async (browser, pageLinks) => {
    console.log('Get productsLinks')
    const run = async () => {
        const page = await browser.newPage()
        const resultProductLinks = []
        const len = pageLinks.length
        let i = 0
        const loop = async () => {

            try {
                await page.goto(pageLinks[i], { watUntil: 'networkidle2' })
                const productHref = await page.evaluate(() => Array.from(document.querySelectorAll('[data-auto-id="product_container"] .grid-item .glass-product-card >a')).map(x => x.href))
                resultProductLinks.push(...productHref)
                i++
                console.log(`Total product Links :${resultProductLinks.length}`)
                if (i < len) {
                    return loop()
                }
                await page.close()
                return resultProductLinks.slice(0, 50)
            }
            catch (error) {
                console.log(error)
            }
        }
        return loop()
    }
    return run()
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
                await page.waitForSelector('[data-auto-id="size-selector"] button')
                await page.waitForSelector('[data-auto-id="image-grid"] [data-auto-id="pdp__image-viewer__desktop-zoom__content"] >img')
            } catch (error) {
                console.log(error)
            }
            let product

            try {
                product = await page.evaluate(({ link }) => {
                    const productLink = link
                    const nameElement = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML)
                    const name = nameElement.name.trim()

                    const descriptionElement = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML)
                    const description = descriptionElement.description.trim()
                    const price = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).offers.price

                    const image = document.querySelector('meta[property="og:image"]').content.trim()
                    const sku = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).sku
                    const color = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).color
                    const brand = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).brand.name
                    const extraImageElement = Array.from(document.querySelectorAll('[data-auto-id="image-grid"] [data-auto-id="pdp__image-viewer__desktop-zoom__content"] >img'))
                    const category = JSON.parse(document.querySelector('[type="application/ld+json"]').innerHTML).category.trim()
                    if (!extraImageElement) {
                        extraImageElement = []
                    }
                    const extraImage = extraImageElement.map(x => x?.src)
                    const sizeElement = document.querySelectorAll('[data-auto-id="size-selector"] button')
                    if (!sizeElement) {
                        sizeElement = []
                    }
                    const size = Array.from(sizeElement).map((x) => x?.innerText?.split(' ')[0]?.trim())
                    return {
                        productLink: productLink,
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        sku: sku,
                        color: color,
                        brand: brand,
                        category: category,
                        extraImage: [...new Set(extraImage)],
                        size: [...new Set(size)]
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

            console.log({ productsLengt: resultProducts.length })

            return resultProducts


        }
        return loop()


    }

    return run()

}




const scraper = async () => {
    const run = async () => {
        const browser = await puppeteer.launch(options)
        const pageLinks = await getPages(browser)
        const productHrefLinks = await getProductLinks(browser, pageLinks)
        const products = await getProducts(browser, productHrefLinks)
        await browser.close()
        console.log(products)
        return products
    }
    return await run()
}
//scraper()
module.exports = scraper