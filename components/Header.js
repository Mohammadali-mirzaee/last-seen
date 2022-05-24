
import styles from '../styles/components/Header.module.scss';
import Link from 'next/link';
import products from '../pages/products'
import Image from 'next/image';



const Header = () => {
    return (
        <header id={styles.header}>

            <a href="/">
                <span>L</span>
                <span>S</span>
                <span>Last Seen</span>
            </a>

            <ul className={styles.nav}>

                {/*   <li className={styles.logo}>

                    <Link href="/">
                        <Image
                            src='/logo/S.svg'
                            height={80}
                            width={100}
                            alt="My Awesome Image"
                        ></Image>
                    </Link>
                </li> */}


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