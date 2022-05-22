import styles from '../../styles/product.module.scss'
import Image from 'next/image';
import { useState, useEffect } from "react";

/* import { fetchProducts } from '../services/Products';
 */


const getlogo = (store) => {

    switch (store) {
        case 'H&M':
            return {
                src: '/h&m_- logo-100x67 1.svg'
            }
    }

}

const Hm = () => {


    console.log()


    const [data, setData] = useState(null)


    useEffect(() => {
        const myFunc = async () => {
            let response
            try {
                response = await fetch("/api/producsItems")
            } catch (error) {
                console.log(err, ' error')
                throw new Error(error.message)
            }
            const { hm } = await response.json()
            setData([...hm])

        }
        myFunc()
    }, [])
    return (
        <div id={styles.ProductPage}>
            <div className={styles.filterItems}>
                Filter
            </div>
            <div className={styles.container}>
                {
                    // use data State Variable For Get Data Use JavaScript Map Mathod
                    data ? data.map(
                        function (data) {

                            return (
                                <article>
                                    <div>
                                        <div className={styles.logo}>
                                            <Image
                                                width={30}
                                                height={30}
                                                src={getlogo(data.brand)?.src}
                                            />
                                        </div>

                                        <div className={styles.imageBox}>
                                            <Image
                                                width={400}
                                                height={400}
                                                objectFit="contain"
                                                /*  layout='fill' */
                                                src={data.image}
                                            />
                                        </div>

                                        <p>
                                            {data.name}
                                        </p>
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
                    ) : ""
                }
            </div>
        </div>
    );
};

export default Hm;