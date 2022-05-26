import styles from '../styles/components/ProductOverlay.module.scss'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import Link from 'next/link';


SwiperCore.use([Pagination, Navigation]);

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductOverlay = ({ product }) => {
    console.log("product", product)

    if (!product) {
        return null
    }

    const sizeExist = product.size
    const imageExist = product.extraImage


    const clickOut = (event) => {
        event.stopPropagation()
    }

    return (
        <div id={styles.overlay} onClick={clickOut} >

            <div className={styles.imageGallery}>

                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    className={styles.swiper}
                >
                    {imageExist && imageExist.map((image) => {

                        return (
                            <SwiperSlide key={image}>
                                <div className={styles.swipeImg}>
                                    <Image
                                        src={image}
                                        height={450}
                                        width={450}
                                        objectFit="contain"
                                        alt='my pic'

                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

            </div>
            <div className={styles.productView}>
                <h1> {product.name}</h1>
                <span className={styles.articleNm}><strong>Art. nr:</strong> {product.sku}</span>
                <div className={styles.description}>
                    <strong>Description<br></br> </strong>
                    <span>  {product.description}</span>
                </div>
                <div className={styles.color}>
                    <strong>Color : </strong>
                    <span>{product.color}</span>
                </div>
                <div className={styles.sizes}>
                    <strong>Avalible sizes:</strong>
                    <div>
                        {sizeExist && sizeExist.map((x) => {
                            return (
                                <span key={x}>{x}</span>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.priceView}>
                    <h1>{product.price} SEK</h1>
                    <button><a href={product.productLink}>Go to store</a></button>
                </div>

            </div>
        </div>
    )
}

export default ProductOverlay