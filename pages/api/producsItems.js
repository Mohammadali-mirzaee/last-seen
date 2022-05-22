// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');


const productData = (req, res) => {
  /*  res.status(200).json({ name: 'John Doe' }) */
  try {
    const adidasDataString = fs.readFileSync('public/data/adidas.json', "utf8")
    const hmDataString = fs.readFileSync('public/data/hm.json', "utf8")
    const zaraDataString = fs.readFileSync('public/data/Zara.json', "utf8")
    const adidasData = JSON.parse(adidasDataString)
    const hmData = JSON.parse(hmDataString)
    const zaraData = JSON.parse(zaraDataString)
    // const data = [...adidasData, ...hmData]
    const data = {
      adidas: adidasData, hm: hmData, zara: zaraData
    }

    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error reading data' })
  }

}

export default productData