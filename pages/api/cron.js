const fs = require("fs")
const { writeFile } = require('fs');


const run = async () => {
    const scrapers = fs.readdirSync("scrapers")
    for (let i = 0, len = scrapers.length; i < len; i++) {
        console.log("!start")
        //Reading the all scrapers files
        const code = fs.readFileSync(`scrapers/${scrapers[i]}`, "utf8")
        const scraper = await eval(code)
        const products = await scraper()
        console.log("Done")
        console.log({ products })

        // Remove Js of the last name of files
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

