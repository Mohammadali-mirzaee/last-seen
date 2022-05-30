import styles from '../styles/about.module.scss';
import Header from '../components/Header'
import Image from 'next/image';
import AOS from 'aos';
import React, { useEffect, useState } from "react";

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 0,
        });
        AOS.refresh();
    }, []);

    return (
        <div id={styles.about}>
            <Header />
            <div className={styles.title}><h1>lastSeen All Brands in One Place</h1></div>
            <div className={styles.lastSeen}>
                <span>
                    Last Seen was created mid spring in 2022 with the ambition to make it easier to find the latest release from your favorite brand stores. Our goal is to be able to get the latest products in real time so instead of visiting a bunch of stores to find out whats new, you can find everything here.
                    In the future we will implement brand subscription and filtering functionality. Stay tuned.
                </span>
                <div className={styles.glassDiv}>
                    <div className={styles.imgCover}>
                        <Image

                            src='/images/justin.jpg'
                            objectFit="cover"
                            layout="fill"
                            alt="My Awesome Image"

                        />
                    </div>
                    <ul>
                        <h1>
                            Our Value
                        </h1>
                        <li>
                            Customer commitment
                        </li>
                        <li>
                            Trust
                        </li>
                        <li>
                            Simplicity
                        </li>
                        <li>
                            Respect
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}


export default About