import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FooterWebsite, HeaderWebsite } from ".";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  localDataFields,
  removeLocalStorageKey,
} from "../redux/reducers/dataReducer";

const fetcher = (...args: any[]) =>
  fetch(...(args as [RequestInfo, RequestInit?])).then((res) => res.json());

export default function Layout({ children }: any) {
  const { search } = useAppSelector(localDataFields);
  const dispatch = useAppDispatch();
  // console.log(search, "localDatalocalData");
  const router = useRouter();

  const headerShow =
    router.pathname.length > 1 &&
    router.pathname.includes("/") &&
    search !== "landing";
  const footerShow =
    router.pathname.length > 1 &&
    router.pathname.includes("/") &&
    search !== "landing";
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/categoryget`,
    fetcher
  );

  // console.log(data, error, "fetcher in swr");

  useEffect(() => {
    if (search !== "landing") dispatch(removeLocalStorageKey("search"));
  }, []);
  return (
    <>
      <div className="website">
        {headerShow && (
          <HeaderWebsite categories={(data && data.result) ?? []} />
        )}
        <main>{children}</main>
        {footerShow && <FooterWebsite />}
      </div>
    </>
  );
}
