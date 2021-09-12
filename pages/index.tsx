import Head from 'next/head'
import Footer from '@/components/Footer'
import Lead from '@/components/Lead'
import Message from '@/components/Message'
import QuestionAndAnswer from '@/components/QuestionAndAnswer'
import styles from '@/styles/Top.module.sass'

const Top: React.VFC = () => {
  return (
    <>
      <Head>
        <title>A-Programming | オンラインスクール</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Lead className={styles.lead} />
      <Message className={styles.message} />
      <QuestionAndAnswer className={styles.q_and_a} />

      <Footer className={styles.footer} />
    </>
  )
}

export default Top
