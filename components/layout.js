import React from "react";
import Head from "next/head";
import Footer from "./footer";
import Navigation from "./navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Layout = ({ children, footer, isPreview, navigation }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["COOKIES_ALLOWED"]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!cookies.COOKIES_ALLOWED) return null;
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head></Head>
      <Navigation data={navigation}></Navigation>
      <main>{children}</main>
      <Footer data={footer}></Footer>
    </>
  );
};

export default Layout;
