"use client";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import CustomButton from "@/components/Button";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/utils";


const Header = () => {

  const pathname = usePathname();


  return (
    <header className={styles.header_wrapper}>
      {pathname === "/" && (
        <>
          <div className={styles.home_wrapper_inner}>
            <div className={styles.header}>
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5 pr-8 pl-8 ml-6">
                <Image
                  src="/ethenacredit.png"
                  alt="EthenaCredit Logo"
                  height="150"
                  width="250"
                />
              </div>
              <nav className="flex float-right items-end">
                <Link className={styles.menu} href={"/"}>
                  Home
                </Link>
                <Link className={styles.menu} href={"$"}>
                  About
                </Link>
                <Link href={"#"} className={styles.menu}>
                  Blog
                </Link>
                <ConnectButton client={client} />
              </nav>
            </div>
            <div className={styles.headerInfo}>
              <h4>Revolutionizing Lending</h4>
              <h2>
                Blockchain-<span>Based UnderCollateralise</span>{" "}
              </h2>
              <h1>
                Platform with Real-World And Digital <br /> Asset As Collateral
              </h1>
              <p>
                Empowering Businesses with Transparent, Efficient, and Secure
                Loans
              </p>
              <Link href={"/dashboard/profile"}>
                <CustomButton
                  value="Get Loan"
                  type={"button"}
                  style={{ marginBottom: 20, marginTop: 40 }}
                  disabled={false}
                  onClick={() => {}}
                />
              </Link>
            </div>
          </div>
          <div className={styles.header_bottom_wrapper}>
            <div className={styles.header_floating_box}>
              <div className={styles.header_inner_floating_box}>
                <div className="backdrop-blur-xl bg-sky-700/10 h-full rounded-b-2xl pl-10 pt-5">
                  <h6>
                    Join the Future of <br />
                    Lending
                  </h6>
                  <p>Get Started with EthenaCredit Now</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pathname != "/" && (
        <div className={styles.home_wrapper_inner_no_banner}>
          <div className={styles.header}>
            <div className={styles.logo2}>
              <Image
                src="/ethenacredit.png"
                alt="EthenaCredit Logo"
                height="150"
                width="203"
              />
            </div>
            <nav
              className="flex float-right items-end"
              style={pathname != "/" ? { marginTop: 0 } : {}}
            >
              <Link className={styles.menu} href={"/"}>
                Home
              </Link>
              <Link className={styles.menu} href={"#"}>
                About
              </Link>
              <Link href={"#"} className={styles.menu}>
                Blog
              </Link>
              <ConnectButton client={client} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
