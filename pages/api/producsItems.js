// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');

const productData = (req, res) => {
  /// reading all Json Files from public mapp
  try {
    const adidasDataString = fs.readFileSync('public/data/Adidas.json', "utf8")
    const hmDataString = fs.readFileSync('public/data/H&M.json', "utf8")
    const zaraDataString = fs.readFileSync('public/data/Zara.json', "utf8")
    const pumaDataString = fs.readFileSync('public/data/Puma.json', "utf-8")
    //parse data
    const adidasData = JSON.parse(adidasDataString)
    const hmData = JSON.parse(hmDataString)
    const zaraData = JSON.parse(zaraDataString)
    const PumaData = JSON.parse(pumaDataString)
    const data = { adidas: adidasData, hm: hmData, zara: zaraData, puma: PumaData }

    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error reading data' })
  }

}
export default productData
