import styles from "./page.module.css";
import HomePage from "./homepage/page";
import Head from "next/head";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  );
}
