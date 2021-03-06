import styles from '../styles/product.module.scss';
import Image from 'next/image';
import { useState, useEffect } from "react";
import Header from '../components/Header'
import ProductOverlay from '../components/ProductOverlay';
import React, { useCallback } from "react";
import Animation from '../components/Animation';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/Footer'

/* import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
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
    if (!products) {
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
    //const { data, error } = useSWR("/api/producsItems", fetcher)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [data, setData] = useState([])
    const [LengthOfproduct, setProductLength] = useState(null)
    const [serach, setSearch] = useState('')
    const [wait, setWait] = useState(false)
    const [page, setPage] = useState(1)

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
            const { adidas, hm, zara, puma } = await response.json()
            const productLength = [...adidas, ...hm, ...zara, ...puma].length
            setProductLength(productLength)
            setData(shuffle([...adidas, ...hm, ...zara, ...puma]))
            setWait(true)
        }
        myFunc()
    }, [])

    const onChange = (event) => {
        setSearch(event.target.value)
    }

    const from = page <= 0 ? 0 : (page - 1) * 50
    const to = from + 50
    const productsToShow = filterProducts(data?.slice(from, to), serach)

    // const scrollToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth' // for smoothly scrolling
    //     });
    // };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    }, [page])

    const goFrom = () => {
        setPage(page + 1)
        // scrollToTop()

    }
    const goBack = () => {
        setPage(page - 1)
        // scrollToTop()
    }

    const productLeft = data.length
    const getRemainingProducts = () => {
        const remainingProducts = data.length - to
        if (remainingProducts <= 0) {
            return null
        }
        return remainingProducts
    }

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
                                    <div>
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

                {data !== null && !(productsToShow?.length > 0) && wait && <Animation />}

            </div>
            {data.length > 0 && (
                <div className={styles.Pagination}>
                    <button disabled={from <= 0} onClick={goBack}>Previous</button>
                    <h2>Showing {getRemainingProducts()} of {productLeft} Products</h2>
                    <button disabled={to >= data.length - 1} onClick={goFrom}>Next</button>
                </div>
            )}
            {data.length > 0 && (
                <Footer />
            )}
        </div>
    );
};

export default Product;