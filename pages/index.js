
import styles from '../styles/Home.module.scss'
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Head from 'next/head';


export default function Home() {
  return (
    <div id={styles.home}>
      <Head>
        <title>LAST SEEN</title>
        <meta name="description" content="lastSeen All Brands in One Place" />
      </Head>

      <Header />
      <Main />
      <Footer />
    </div>
  )
}
