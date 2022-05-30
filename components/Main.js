import styles from '../styles/components/Main.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Main = () => {

    return (
        <div id={styles.Main}>

            <h1 className={styles.leftText}>LAST SEEN</h1>
            <h1 className={styles.rightText}>BE UPDATED</h1>



            <div className={styles.left}>

                <Image
                    src='/sergey-vinogradov-cp-yyhib74w-unsplash.jpg'
                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'
                    alt="My Awesome Image"

                ></Image>
            </div>


            <div className={styles.right}>
                <Image
                    src='/images/manon-drogue-hZ-j3N8xYpE-unsplash (1).jpg'
                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'
                    alt="My Awesome Image"

                ></Image>

            </div>

            <div className={styles.center}>

                <div className={styles.centerImg}>

                    <Image
                        src='/images/mojtaba-mosayebzadeh-QvJsfkVxbjU-unsplash.jpg'

                        height={850}
                        width={550}
                        objectFit="contain"
                        alt="My Awesome Image"

                    ></Image>

                </div>

            </div>

            <div id={styles.mainBrands}>
                <h1>SEE THE LATEST PRODUCTS</h1>
                <div>
                    <div>
                        <Link href='/dedicatedPages/adidas'>
                            <a>
                                <span>
                                    <Image
                                        src='/logo/adidas.svg'
                                        height={100}
                                        width={100}
                                        objectFit="contain"
                                        alt="My Awesome Image"
                                    ></Image>
                                </span>
                            </a>

                        </Link>



                    </div>
                    <div>
                        <Link href='/dedicatedPages/h&m'>
                            <a>
                                <span>
                                    <Image
                                        src='/logo/hm.svg'
                                        height={100}
                                        width={100}
                                        objectFit="contain"
                                        alt="My Awesome Image"
                                    ></Image>
                                </span>
                            </a>

                        </Link>

                    </div>
                    <div>
                        <Link href='/dedicatedPages/zara'>
                            <a>
                                <span>
                                    <Image
                                        src='/logo/zara.svg'
                                        height={100}
                                        width={100}
                                        objectFit="contain"
                                        alt="My Awesome Image"
                                    ></Image>
                                </span>
                            </a>

                        </Link>

                    </div>
                    <div>
                        <Link href='/dedicatedPages/puma'>
                            <a>
                                <span>
                                    <Image
                                        src='/logo/puma.svg'
                                        height={100}
                                        width={100}
                                        objectFit="contain"
                                        alt="My Awesome Image"
                                    ></Image>
                                </span>
                            </a>

                        </Link>

                    </div>
                </div>
            </div>


        </div>





    )
}

export default Main