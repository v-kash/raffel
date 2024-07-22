import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ManualHeader from '../components/ManualHeader'
import LotteryEnter from '../components/LotteryEnter'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fair play </title>
        <meta name="description" content="Lottery " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ManualHeader />
      <LotteryEnter />
      
    </div>
  )
}
