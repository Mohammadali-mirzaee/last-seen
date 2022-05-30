import styles from '../styles/components/Main.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';


SwiperCore.use([Pagination, Navigation]);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Main = () => {

    return (
        <div id={styles.Main}>

            <h1 className={styles.leftText}>LAST SEEN</h1>
            <h1 className={styles.rightText}>BE UPDATED</h1>



            <div className={styles.left}>

                <Image
                    src='/images/leftPic.jpg'
                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'
                    alt="My Awesome Image"

                ></Image>
            </div>


            <div className={styles.right}>
                <Image
                    src='/images/rightPic.jpg'
                    height={450}
                    width={300}
                    objectFit="cover"
                    layout='responsive'
                    alt="My Awesome Image"

                ></Image>

            </div>


            <div className={styles.center}>

                <div className={styles.centerImg}>

                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        className={styles.swiper}
                    >
                        <SwiperSlide>
                            <Image

                                //src='/images/mojtaba-mosayebzadeh-QvJsfkVxbjU-unsplash.jpg'
                                src='/images/center.jpg'
                                height={900}
                                width={599}
                                //objectFit="contain"
                                layout="responsive"
                                alt="My Awesome Image"

                            ></Image>
                        </SwiperSlide>

                        <SwiperSlide className={styles.nextImg}>
                            <Image
                                //src='/sergey-vinogradov-cp-yyhib74w-unsplash.jpg'
                                src='/images/rightPic.jpg'
                                height={850}
                                width={550}
                                objectFit="contain"
                                alt="My Awesome Image"

                            ></Image>
                        </SwiperSlide>
                    </Swiper>

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