import styles from '../styles/product.module.scss'
import Image from 'next/image';
import { useState, useEffect } from "react";
import Header from '../components/Header'
import ProductOverlay from '../components/ProductOverlay';
import React, { useCallback } from "react";
/* import { fetchProducts } from '../services/Products';
 */



function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
const getlogo = (store) => {

    switch (store) {
        case 'H&M':
            return {
                src: '/h&m_- logo-100x67 1.svg'
            }
        case 'adidas':
            return {
                src: '/adidas-4-logo-svgrepo-com 1.svg'

            }
        case 'ZARA':
            return {
                src: '/zara-vector-logo-2022.svg'
            }

    }

}

const filterProducts = (products, search) => {
    if (!products) {
        return []
    }

    return products.filter(product => {
/*         console.log("products.description", product.description)
 */        if (product.category?.toLowerCase().startsWith(search.toLowerCase())) {
            return true
        }
        if (product.description?.toLowerCase().includes(search.toLowerCase())) {
            return true
        }

        return false
    })
}




const Product = () => {

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [data, setData] = useState(null)
    const [LengthOfproduct, setProductLength] = useState(null)

    const [serach, setSearch] = useState('')


    const selectProduct = useCallback((sku) => {
        console.log("sku", sku)
        const prod = data.find(p => p.sku === sku)
        console.log("prod", prod)
        setSelectedProduct(prod)
    }, [data])

    const closeModal = useCallback(() => {
        setSelectedProduct(null)
    }, [])

    useEffect(() => {
        const myFunc = async () => {
            let response
            try {
                response = await fetch("/api/producsItems")
            } catch (error) {
                console.log(error, ' error')
                throw new Error(error.message)
            }

            const { adidas, hm, zara } = await response.json()

            const productLength = [...adidas, ...hm, ...zara].length

            setProductLength(productLength)
            setData(shuffle([...adidas, ...hm, ...zara]))

        }
        myFunc()
    }, [])

    const onChange = (event) => {

        setSearch(event.target.value)
    }

    const productsToShow = filterProducts(data, serach)
/*     console.log("productsToShow", productsToShow)
 */    return (
        <div id={styles.ProductPage}>


            {selectedProduct && (
                <div className={styles.productOverlay}>

                    <div onClick={closeModal}>

                        <ProductOverlay product={selectedProduct} />

                    </div>
                </div>
            )}
            <Header />

            <div className={styles.filterItems}>
                <h1>{LengthOfproduct} Products</h1>
                <input type="text" onChange={onChange} value={serach}></input>
            </div>
            <div className={styles.container}>
                {
                    // use data State Variable For Get Data Use JavaScript Map Mathod
                    productsToShow && productsToShow.map(
                        function (data) {

                            return (
                                <article key={data.id}>
                                    <div onClick={() => selectProduct(data.sku)}>
                                        <div className={styles.logo}>
                                            <Image
                                                width={50}
                                                height={50}
                                                src={getlogo(data?.brand)?.src}
                                            />
                                        </div>

                                        <div className={styles.imageBox}>
                                            <Image
                                                width={400}
                                                height={400}
                                                objectFit="contain"
/*                                                 layout='fill'
 */                                                src={data.image}

                                            />
                                        </div>

                                        <p>
                                            {data.name}
                                        </p>
                                        <p>{data.category}</p>
                                        <div className={styles.price}>
                                            <p>{data.price} kr</p>
                                        </div>
                                        <button>
                                            <a href={data.productLink}>Go to store</a>
                                        </button>
                                    </div>

                                </article>

                            )
                        }
                    )


                }
                {!(productsToShow?.length > 0) && <h1> Inga produkter</h1>}
            </div>
        </div>
    );
};

export default Product;