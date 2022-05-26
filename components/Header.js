
import styles from '../styles/components/Header.module.scss';
import Link from 'next/link';



const Header = () => {
    return (
        <header id={styles.header}>

            <Link href="/">
                <a>
                    <span>L</span>
                    <span>S</span>
                    <span>Last Seen</span>
                </a>
            </Link>
            <ul className={styles.nav}>

                <li>
                    <Link href="/products"><a>Products</a></Link>
                </li>
                <li>
                    <Link href="/brands"><a>Brands</a></Link>

                </li>
                <li><Link href="/about"><a>About</a></Link></li>


            </ul>

        </header>
    );
};

export default Header;