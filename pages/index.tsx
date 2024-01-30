import React from "react";
import Head from "next/head";
import Landing from "./landing";

export default function Main() {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="INNER XR" />
        <meta
          property="og:title"
          content="Humanities Club class in singapore"
        />
        <meta
          property="og:image"
          content="https://images-klassbook.s3.ap-southeast-1.amazonaws.com/business/1667457426802-pexels-thirdman-8926546.jpg"
        />
        <meta property="og:url" content="https://innerxr.com" />
        <meta
          property="og:description"
          content='<span><p dir="ltr"><span><font face="Calibri">OUR HUMANITIES TUITION CENTRE offers Humanities tuition in Social Studies, History and Geography to students preparing for their N and O Level Examinations. With an excellent track record of students scoring distinctions, our Humanities specialists are confident of guiding your child to make significant progress in their Humanities subjects. All our tutors were trained at the National Institute of Education (NIE) and had many years of teaching experience in various government schools. Beyond teaching, our tutors are writers of the Humanities Ten-Year Series (TYS) which are used widely in schools, and they are also authors of numerous Humanities Guide books.</font></span></p></span><p><span><font face="Calibri"><br></font></span></p><table><colgroup><col width="624"></colgroup><tbody><tr><td><p dir="ltr"><span><font face="Calibri">Information Source : Official Website/Facebook Pages of &amp;#34;Humanities Club&amp;#34;</font></span></p></td></tr></tbody></table><p></p>'
        />
        <link
          href="https://nextjs.org/learn-pages-router/seo/rendering-and-ranking/url-structure"
          rel="canonical"
        />
      </Head>
      <Landing />
    </>
  );
}
