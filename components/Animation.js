import styles from '../styles/components/Animation.module.scss'
import Link from 'next/link';
const Animation = () => {

    return (
        <div id={styles.animation}>
            <h1>Nothing To Show</h1>

            <ul>
                <li><Link href="/products"><a>Products</a></Link></li>
                <li><Link href="/brands"><a>Brands</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
            </ul>


        </div>
    )

}
export default Animation