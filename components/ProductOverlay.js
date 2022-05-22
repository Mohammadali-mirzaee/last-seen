import styles from '../styles/components/ProductOverlay.module.scss'
import Image from 'next/image';

const ProductOverlay = ({ product }) => {
    console.log("product", product)

    if (!product) {
        return null
    }

    return (
        <div id={styles.overlay}>

            <div className={styles.imageGallery}>
                <Image
                    width={200}
                    height={200}
                    objectFit="contain"
                    src={product.extraImage[0]}
                    alt="My Awesome Image"

                />
                <Image
                    width={200}
                    height={200}
                    objectFit="contain"
                    src={product.extraImage[1]}
                    alt="My Awesome Image"

                />
            </div>
            <div className={styles.productView}>

                <h1> {product.name}</h1>
            </div>
        </div>
    )
}

export default ProductOverlay