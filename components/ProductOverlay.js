import styles from '../styles/components/ProductOverlay.module.scss'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';

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
                            <SwiperSlide>
                                <div className={styles.swipeImg}>
                                    <Image
                                        src={image}
                                        height={450}
                                        width={450}
                                        objectFit="contain"

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
                    <strong>Size:</strong>
                    <div>
                        {sizeExist && sizeExist.map((x) => {
                            return (
                                <span>{x}</span>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.priceView}>
                    <h1>{product.price} SEK</h1>
                    <button><a href={product.productLink}>Go to store</a></button>
                </div>
                {/*    <div className={styles.merInfo}>
                    <div>1</div>
                    <div>2</div>
                </div> */}

            </div>
        </div>
    )
}

export default ProductOverlay