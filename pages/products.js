import styles from '../styles/product.module.scss';
import Image from 'next/image';
import { useState, useEffect } from "react";
import Header from '../components/Header'
import ProductOverlay from '../components/ProductOverlay';
import React, { useCallback } from "react";
import Animation from '../components/Animation';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());





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
                src: '/logo/hm.svg'
            }
        case 'adidas':
            return {
                src: '/logo/adidas.svg'

            }
        case 'ZARA':
            return {
                src: '/logo/zara.svg'
            }
        case 'PUMA':
            return {
                src: '/logo/puma.svg'
            }

    }

}

const filterProducts = (products, search) => {

    if (!Array.isArray(products)) {
        return []
    }

    return products.filter(product => {
        if (product.category?.toLowerCase().startsWith(search.toLowerCase())) {
            return true
        }
        if (product.description?.toLowerCase().includes(search.toLowerCase())) {
            return true
        }
        if (product.name?.toLowerCase().includes(search.toLowerCase())) {
            return true
        }
        if (product.color?.toLowerCase().includes(search.toLowerCase())) {
            return true
        }
        if (product.brand?.toLowerCase().includes(search.toLowerCase())) {
            return true
        }

        return false
    })
}




const Product = () => {
    const { data: api, error, isValidating } = useSWR("/api/producsItems", fetcher)
    console.log("api", api)

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [data, setData] = useState([])
    console.log("data", data)
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

        /*  const myFunc = async () => {
             let response
             try {
                 response = await fetch("/api/producsItems")
 
             } catch (error) {
                 console.log(error, ' error')
                 throw new Error(error.message)
             }
             const { adidas, hm, zara, puma } = await response.json()
             const productLength = [...adidas, ...hm, ...zara, ...puma].length
             setProductLength(productLength)
             setData(shuffle([...adidas, ...hm, ...zara, ...puma]))
 
         }
         myFunc() */
        console.log("1")
        const { adidas, hm, zara, puma } = api || {}

        if (adidas && hm && zara && puma) {
            console.log("1.3")
            const productLength = [...adidas, ...hm, ...zara, ...puma].length
            console.log("1.6")
            setProductLength(productLength)
            console.log("2")
            setData(shuffle([...adidas, ...hm, ...zara, ...puma]))
            console.log("3")
        }

    }, [api])

    const onChange = (event) => {

        setSearch(event.target.value)
    }

    const productsToShow = filterProducts(data, serach)


    /* if (data === null) {
        return null
    } */
    return (
        <div id={styles.ProductPage}>
            <Head>
                <title>product</title>
                <meta name="description" content="lastSeen All Brands in One Place" />
            </Head>

            <Header />
            {selectedProduct && (
                <div className={styles.productOverlay}>

                    <div onClick={closeModal}>

                        <ProductOverlay product={selectedProduct} />

                    </div>
                </div>
            )}


            <div className={styles.filterItems}>
                <h1>{LengthOfproduct} Products</h1>
                <input type="text" onChange={onChange}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            setSearch(event.target.value)
                        }
                    }}
                    value={serach} placeholder="Search"></input>
            </div>
            <div className={styles.container}>
                {
                    // use data State Variable For Get Data Use JavaScript Map Mathod
                    productsToShow && productsToShow.map(
                        function (data) {
                            const src = getlogo(data?.brand)?.src
                            if (!src) {
                                src = '/logo/S3.svg'
                            }

                            return (
                                <article key={uuidv4()}>
                                    <div >
                                        <div className={styles.logo}>
                                            {src && <Image
                                                width={50}
                                                height={50}
                                                src={src}
                                                alt="My Awesome Image"
                                            />}
                                        </div>

                                        <div onClick={() => selectProduct(data.sku)} className={styles.imageBox}>
                                            <Image
                                                width={400}
                                                height={400}
                                                objectFit="contain"
/*                                                 layout='fill'
 */                                                src={data.image}
                                                alt="My Awesome Image"

                                            />
                                        </div>

                                        <p>
                                            {data.name}
                                        </p>
                                        {/* <p>{data.category}</p> */}
                                        <div className={styles.price}>
                                            <p>{data.price} SEK</p>
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

                {data !== null && !(productsToShow?.length > 0) && <Animation />}
            </div>
        </div>
    );
};

export default Product;