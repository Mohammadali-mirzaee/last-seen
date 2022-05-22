import styles from '../styles/components/Main.module.scss'
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import Link from 'next/link';

const Main = () => {

    // Fetch Function   



    return (
        <div id={styles.Main}>

            {/*             <h1>{data.name}</h1>
 */}
            <h1 className={styles.leftText}>LAST SEEN</h1>
            <h1 className={styles.rightText}>BE UPDATED</h1>



            <div className={styles.left}>

                <Image
                    src='/sergey-vinogradov-cp-yyhib74w-unsplash.jpg'

                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'

                ></Image>
            </div>


            <div className={styles.right}>
                <Image
                    src='/images/manon-drogue-hZ-j3N8xYpE-unsplash (1).jpg'
                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'

                ></Image>

            </div>

            <div className={styles.center}>

                <div className={styles.centerImg}>

                    <Image
                        src='/images/mojtaba-mosayebzadeh-QvJsfkVxbjU-unsplash.jpg'

                        height={850}
                        width={550}
                        objectFit="cover"
                        layout='responsive'

                    ></Image>

                </div>

            </div>

            <div id={styles.mainBrands}>
                <h1>SEE THE LATEST PRODUCTS</h1>
                <div>
                    <h2>
                        <Link href='/dedicatedPages/adidas'>

                            {/* Adidas */}

                            <span><Image
                                src='/adidas-4-logo-svgrepo-com 1.svg'
                                height={100}
                                width={100}
                                layout='responsive'
                            ></Image></span>
                        </Link>



                    </h2>
                    <h2>
                        <Link href='/dedicatedPages/hm'>

                            <span><Image
                                src='/h&m_- logo-100x67 1.svg'
                                height={100}
                                width={100}
                                layout='responsive'
                            ></Image></span>
                        </Link>

                    </h2>
                    <h2>
                        <Link href='/dedicatedPages/zara'>
                            <span><Image
                                src='/zara-vector-logo-2022.svg'
                                height={100}
                                width={100}
                                layout='responsive'
                            ></Image></span>
                        </Link>

                    </h2>
                </div>
            </div>


        </div>





    )
}

export default Main