import React from 'react';
import cx from "./blogCard3.module.scss";
import { banner2 } from '../../../../public/images';
import Image from "next/image";
import Link from 'next/link';

export default function BlogCard3() {
  return (
    <div className={`${cx.blogCard}`}>
       <div className={`${cx.blogCardImg}`}>
          <Image src={banner2} alt="banner" className={`${cx.bannerImg}`} />
           <Link href="/pathsdetails" className={`${cx.tag} btn`}>Peace</Link>
       </div>
       <div className={`${cx.blogCardBody}`}>
           <h3>(serenitty)Sunflowers</h3>
       </div>
    </div>
  )
}
