const fs = require("fs")
const { writeFile } = require('fs');


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


        const path = `../../public/data/${scrapers[i].replace('.js', '').trim()}.json`
        const allProducts = products

        writeFile(path, JSON.stringify(allProducts, null, 2), (error) => {
            if (error) {
                console.log('An error has occurred ', error);
                return;
            }
            console.log('Data written successfully to disk');
        });
    }
}
run();