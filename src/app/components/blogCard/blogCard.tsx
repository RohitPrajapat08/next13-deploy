import React from 'react';
import cx from "./blogCard.module.scss";
import { banner2 } from '../../../../public/images';
import Image from "next/image";
import Link from 'next/link';

export default function BlogCard() {
  return (
    <div className={`${cx.blogCard}`}>
       <div className={`${cx.blogCardImg}`}>
          <Image src={banner2} alt="banner" className={`${cx.bannerImg}`} />
       </div>
       <div className={`${cx.blogCardBody}`}>
           <Link href="detailspage" className={`${cx.tag} btn`}>peace</Link>
           <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
       </div>
    </div>
  )
}
