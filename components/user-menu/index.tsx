import React, { useState } from "react";
import cx from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const UserMenu = () => {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("UserData");
    localStorage.removeItem("UserToken");
    toast.success("logged Out Successfully");
    setTimeout(() => {
      router.push("/login");
    }, 4000);
  }

  return (
    <>
      <ToastContainer />
      <ul className={`${cx.profileMenu}`}>
        <li>
          <Link href="/gardener-profile/profile" className={`${cx.link}`}>
            Profile
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/nests" className={`${cx.link}`}>
            Nests
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/Blogs" className={`${cx.link}`}>
            Blogs
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/ArticleSeries" className={`${cx.link}`}>
            Article Series
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/category" className={`${cx.link}`}>
            Category
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/subcategory" className={`${cx.link}`}>
            Sub Category
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/tags" className={`${cx.link}`}>
            Tags
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/tag-group" className={`${cx.link}`}>
            Tag Group
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/inners" className={`${cx.link}`}>
            Inners
          </Link>
        </li>
        <li>
          <Link href="/gardener-profile/wellgorithms" className={`${cx.link}`}>
            Wellgorithms
          </Link>
        </li>
        <li>
          <Link
            href="/gardener-profile/change-password"
            className={`${cx.link}`}
          >
            Change Password
          </Link>
        </li>
        <li onClick={logout} className={`${cx.LogoutButton}`}>
          {/* <Link href="/login" > */}
          LogOut
          {/* </Link> */}
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
