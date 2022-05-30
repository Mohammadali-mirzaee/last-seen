import styles from '../styles/brands.module.scss';
import Image from 'next/image';
import Header from '../components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

import React, { useEffect, useState } from "react";


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

const allBrands = [
    'adidas',
    'H&M',
    'ZARA',
    'Nike',
    'Jack&Jons',
    'Zalando',
    'Gant',
    'Louis Vuitton',
    'GUCCI',
    'Dior',
    'Boss',
    'Levis',
    'Prada',
    'PUMA'

]
shuffle(allBrands)

const getlogo = (store) => {
    /*    console.log("store", store) */

    switch (store) {
        case 'H&M':
            return {
                src: '/logo/hm-1.svg'
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
        case 'Gant':
            return {
                src: '/logo/gant.svg'
            }
        case 'Louis Vuitton': {
            return {
                src: '/logo/Louis_Vuitton.svg'
            }
        }
        case 'Jack&Jons': {
            return {
                src: '/logo/Jack_Jones.svg'
            }
        }
        case 'GUCCI': {
            return {
                src: '/logo/gucci.svg'
            }
        }
        case 'Nike': {
            return {
                src: '/logo/nike.svg'
            }
        }
        case 'Zalando': {
            return {
                src: '/logo/zalando.svg'
            }
        }
        case 'Dior': {
            return {
                src: '/logo/dior.svg'
            }
        }
        case 'Boss': {
            return {
                src: '/logo/Hugo-Boss-Logo.svg'
            }
        }
        case 'Levis': {
            return {
                src: '/logo/Levis.svg'
            }
        }
        case 'Prada': {
            return {
                src: '/logo/Prada.svg'
            }
        }

    }

}





const Brands = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 0,
        });
        AOS.refresh();
    }, []);


    const [data, setData] = useState(null)


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
            setData([...adidas, ...hm, ...zara, ...puma])

        }
        myFunc()
    }, [])

    const product = data
    const brandcount = {}

    allBrands?.forEach(brand => {
        product?.forEach(prod => {
            if (prod.brand === brand) {
                brandcount[brand] = brandcount[brand] ? brandcount[brand] + 1 : 1
            }
        })
    })

    console.log("brandcount", brandcount)

    const brandsArray = Object.entries(brandcount).map(([brand, count]) => ({ brand, count }))

    console.log(brandsArray)
    return (
        <div id={styles.brands}>
            <Header />
            <h1>All Brands</h1>
            <div>

                {allBrands && allBrands.map((x) => {
                    return (
                        <div key={x.src} className={styles.brandCard}>
                            {getlogo(x)?.src && <Image
                                data-aos={'zoom-in'}
                                height={100}
                                width={100}
                                objectFit="contain"
                                alt="My Awesome Image"
                                src={getlogo(x).src}
                            />}
                            {brandcount[x] ? <span> {brandcount[x]} Products</span> : 'Coming soon'}
                            {/*  {console.log("X", x)} */}

                            {brandcount[x] ? <Link href={`/dedicatedPages/${x.toLowerCase()}`}><a><button>Go to Butik</button></a></Link> : ''}


                        </div>
                    )
                })}

            </div>
        </div>
    )

}


export default Brands