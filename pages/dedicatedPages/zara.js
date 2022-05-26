import styles from '../../styles/product.module.scss'
import Image from 'next/image';
import { useState, useEffect } from "react";
import Header from '../../components/Header';
import ProductOverlay from '../../components/ProductOverlay';
import React, { useCallback } from "react";
import Animation from '../../components/Animation';


const getlogo = (store) => {

    switch (store) {

        case 'ZARA':
            return {
                src: '/logo/zara.svg'

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

        return false
    })
}

const Zara = () => {


    console.log()


    const [data, setData] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

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
                console.log(err, ' error')
                throw new Error(error.message)
            }
            const { zara } = await response.json()
            setData([...zara])

        }
        myFunc()
    }, [])

    const onChange = (event) => {

        setSearch(event.target.value)
    }

    const productsToShow = filterProducts(data, serach)
    return (
        <div id={styles.ProductPage}>

            <Header />
            {selectedProduct && (
                <div className={styles.productOverlay}>

                    <div onClick={closeModal}>

                        <ProductOverlay product={selectedProduct} />

                    </div>
                </div>
            )}

            <div className={styles.filterItems}>
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

                            return (
                                <article key={data.id}>
                                    <div >
                                        <div className={styles.logo}>
                                            <Image
                                                width={50}
                                                height={50}
                                                src={getlogo(data?.brand)?.src}
                                                alt="My Awesome Image"
                                            />
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

export default Zara;