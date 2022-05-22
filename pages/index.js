//import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/footer';
export default function Home() {
  return (
    <div id={styles.home}>

      <Header />
      <Main />
      <Footer />

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
