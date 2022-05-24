import styles from '../styles/brands.module.scss'
import Image from 'next/image';
import Header from '../components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from "react";

const allBrands = [
    'Adidas',
    'H&M',
    'Zara',
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

const getlogo = (store) => {
    /*    console.log("store", store) */

    switch (store) {
        case 'H&M':
            return {
                src: '/logo/hm-1.svg'
            }
        case 'Adidas':
            return {
                src: '/logo/adidas.svg'
            }
        case 'Zara':
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

    /* 
        const [LengthOfproduct, setProductLength] = useState(null)
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
                const allLength = [adidas, hm, zara, puma]
                setProductLength(allLength)
    
    
            }
            myFunc()
        }, []) */

    return (
        <div id={styles.brands}>
            <Header />
            <h1>All Brands</h1>
            {/*     <span>{LengthOfproduct[0].length}</span> */}
            <div>

                {allBrands && allBrands.map((x) => {
                    return (
                        <div data-aos={'fade-down'} className={styles.brandCard}>
                            {/*  <p>{x}</p> */}
                            {getlogo(x)?.src && <Image
                                height={100}
                                width={100}
                                objectFit="contain"
                                alt="My Awesome Image"
                                src={getlogo(x).src}
                            />}
                        </div>
                    )
                })}

            </div>
        </div>
    )

}


export default Brands