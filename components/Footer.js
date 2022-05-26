import styles from '../styles/components/Footer.module.scss'
import Image from 'next/image';
import Link from 'next/link';


const Footer = () => {

    return (
        <footer id={styles.Footer}>
            <Link href="/">
                <a>
                    <span>L</span>
                    <span>S</span>
                    <span>Last Seen</span>
                </a>
            </Link>


            <div className={styles.links}>
                <ul>
                    <li>
                        <a href="">
                            <Image
                                height={30}
                                width={30}
                                src='/logo/instagram.svg'
                                alt='My link'
                            />
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <Image
                                height={30}
                                width={30}
                                src='/logo/facebook.svg'
                                alt='My link'

                            />

                        </a>
                    </li>
                    <li>
                        <a href="">
                            <Image
                                height={30}
                                width={30}
                                src='/logo/linkedin.svg'
                                alt='My link'
                            />
                        </a>
                    </li>
                </ul>
            </div>


            <div className={styles.social}>
                <p>Copyright @ 2022. All Right Reserved</p>
            </div>

        </footer >
    )
}

export default Footer