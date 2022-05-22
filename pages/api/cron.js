const fs = require("fs")

const run = async () => {
    const scrapers = fs.readdirSync("scrapers")
    for (let i = 0, len = scrapers.length; i < len; i++) {
        console.log("!start")
        const code = fs.readFileSync(`scrapers/${scrapers[i]}`, "utf8")
        //console.log("1", code)
        const scraper = await eval(code)
        //console.log("2", products)
        const products = await scraper()
        console.log("Done")
        console.log({ products })
    }
}
run();