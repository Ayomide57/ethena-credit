"use client";
import CustomButton from "@/components/Button";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { CiMoneyBill } from "react-icons/ci";
import { VscLock, VscBriefcase } from "react-icons/vsc";
import { LuClock12 } from "react-icons/lu";;
import { RiGlobalLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.revolution_section}>
        <div className={styles.revolution_section_first}>
          <h1>Revolutionizing Lending</h1>
          <p>
            EthenaCredit is an Undercollateralise lending platform that gives
            out more loan to users than their collateral{" "}
          </p>
          <div>
            <Link href="/dashboard" shallow={true}>
              <CustomButton
                value="Get Loan"
                type={"button"}
                style={{
                  marginBottom: 20,
                  marginTop: 40,
                  paddingLeft: 70,
                  paddingRight: 70,
                  fontSize: 20,
                }}
                disabled={false}
                onClick={() => {}}
              />
            </Link>
            <CustomButton
              value="Learn more"
              type={"button"}
              style={{
                marginBottom: 20,
                marginTop: 40,
                paddingLeft: 70,
                paddingRight: 70,
                fontSize: 20,
              }}
              disabled={false}
              onClick={() => {}}
              btnStyle="secondaryBtn"
            />
          </div>
        </div>
        <div className={styles.revolution_section_second}>
          <Image
            src="/Dollars2.png"
            alt="Dollars 2 Logo"
            height={200}
            width={200}
            className={styles.dollar1}
          />

          <Image
            src="/Dollars.png"
            alt="Dollars Logo"
            height={200}
            width={200}
            className={styles.dollar2}
          />
        </div>
      </div>
      <div className={styles.empower_section}>
        <div className={styles.empower_section_first}>
          <Image
            src="/ethereum-server.png"
            alt="Ethereum Server Logo"
            height={400}
            width={400}
            className={styles.dollar1}
          />
        </div>
        <div className={styles.empower_section_second}>
          <h1>Empowering Financial Freedom through Blockchain Innovation</h1>
          <p>
            Our platform bridges the gap between traditional lending limitations
            and the needs of modern borrowers by offering real-world and digital
            asset collateral options and a decentralized, peer-to-peer lending
            environment.
          </p>
          <div>
            <Link href="/dashboard" shallow={true}>
              <CustomButton
                value="Get Loan"
                type={"button"}
                style={{
                  marginBottom: 20,
                  marginTop: 40,
                  paddingLeft: 70,
                  paddingRight: 70,
                  fontSize: 20,
                  marginRight: 20,
                }}
                disabled={false}
                onClick={() => {}}
              />
            </Link>
            <CustomButton
              value="Learn more"
              type={"button"}
              style={{
                marginBottom: 20,
                marginTop: 40,
                paddingLeft: 70,
                paddingRight: 70,
              }}
              disabled={false}
              onClick={() => {}}
              btnStyle="secondaryBtn"
            />
          </div>
        </div>
      </div>
      <div className={styles.problem_section}>
        <h1>Problem</h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          Problems with Traditional Lending Limitations
        </p>
        <div className="grid grid-cols-4 gap-10">
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <CiMoneyBill
                style={{ width: 22, height: 22, color: "#6AFFAE" }}
              />
            </div>
            <h4>Lack of accessibility</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Traditional lending platforms lack accessibility to loans for many
              individuals and businesses.
            </p>
          </div>
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <LuClock12 style={{ width: 22, height: 22, color: "#6AFFAE" }} />
            </div>
            <h4>Lengthy approval processes</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Traditional lending platformshave Lengthy approval processes and
              high interest rates.
            </p>
          </div>{" "}
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <VscLock style={{ width: 22, height: 22, color: "#6AFFAE" }} />
            </div>
            <h4>Limited transparency and trust</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Traditional lending platforms have Limited transparency and
              trust in traditional lending institutions.
            </p>
          </div>{" "}
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <VscBriefcase
                style={{ width: 22, height: 22, color: "#6AFFAE" }}
              />
            </div>
            <h4>Inadequate collateral </h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Inadequate collateral options for borrowers.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <CustomButton
              value="Get Loan"
              type={"button"}
              style={{
                marginBottom: 20,
                marginTop: 40,
                paddingLeft: 75,
                paddingRight: 75,
                fontSize: 20,
                marginRight: 30,
              }}
              disabled={false}
              onClick={() => {}}
            />
          </Link>
          <CustomButton
            value="Learn more"
            type={"button"}
            style={{
              marginBottom: 20,
              marginTop: 40,
              paddingLeft: 75,
              paddingRight: 75,
            }}
            disabled={false}
            onClick={() => {}}
            btnStyle="secondaryBtn"
          />
        </div>
      </div>
      <div className={styles.problem_section}>
        <h1>Solution</h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          EthenaCredit’s Innovative Approach
        </p>
        <div className="grid grid-cols-4 gap-10">
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <CiMoneyBill
                style={{ width: 22, height: 22, color: "#6AFFAE" }}
              />
            </div>
            <h4>Blockchain Technology</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Ensures transparency and security in every transaction.
            </p>
          </div>
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <LuClock12 style={{ width: 22, height: 22, color: "#6AFFAE" }} />
            </div>
            <h4>Real-World Asset Collateral</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Allows borrowers to use tangible assets as collateral.
            </p>
          </div>{" "}
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <VscLock style={{ width: 22, height: 22, color: "#6AFFAE" }} />
            </div>
            <h4>Fast Approval Process</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Streamlined and efficient loan approval.
            </p>
          </div>{" "}
          <div
            className="border border-white rounded-md backdrop-blur-xl bg-sky-700/10 h-full p-8"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div
              className="pl-2 pt-1 rounded-md h-8 w-10 mb-10 mt-5"
              style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
            >
              <VscBriefcase
                style={{ width: 22, height: 22, color: "#6AFFAE" }}
              />
            </div>
            <h4>Lower Interest Rates</h4>
            <p style={{ marginBottom: 40, marginTop: 10 }}>
              Competitive rates compared to traditional lenders.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <CustomButton
              value="Get Loan"
              type={"button"}
              style={{
                marginBottom: 20,
                marginTop: 40,
                paddingLeft: 70,
                paddingRight: 70,
                fontSize: 20,
                marginRight: 30,
              }}
              disabled={false}
              onClick={() => {}}
            />
          </Link>
          <CustomButton
            value="Learn more"
            type={"button"}
            style={{
              marginBottom: 20,
              marginTop: 40,
              paddingLeft: 70,
              paddingRight: 70,
            }}
            disabled={false}
            onClick={() => {}}
            btnStyle="secondaryBtn"
          />
        </div>
      </div>
      <div className={styles.feature_section}>
        <h1>Features</h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          Innovative Solutions for Modern Lending{" "}
        </p>
        <div className="flex">
          <div
            className="border border-white backdrop-blur-xl bg-sky-700/10 p-8 h-auto rounded-lg"
            style={{ borderColor: "#6AFFAE" }}
          >
            <div className="grid grid-cols-2 w-fit">
              <div
                className="pl-2 pt-1 rounded-lg h-8 w-10 mb-1 mt-1 mr-2"
                style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
              ></div>
              <div
                className="pl-2 pt-1 rounded-lg h-8 w-10 mb-1 mt-1"
                style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
              ></div>
              <div
                className="pl-2 pt-1 rounded-lg h-8 w-10 mb-1 mt-1"
                style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
              ></div>
              <div
                className="pl-2 pt-1 rounded-lg h-8 w-10 mb-1 mt-1"
                style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
              ></div>
            </div>{" "}
            <div style={{ top: 260, position: "relative" }}>
              <h4>Decentralized Platform</h4>
              <p style={{ marginBottom: 40, marginTop: 10 }}>
                EthenaCredit operates on a peer-to-peer lending model,
                eliminating the need for traditional financial intermediaries.
              </p>
            </div>
          </div>
          <div className="ml-3">
            <div
              className="border border-white rounded-lg backdrop-blur-xl bg-sky-700/10 p-8 flex mb-3"
              style={{ borderColor: "#6AFFAE" }}
            >
              <div className="w-2/4 mr-40">
                {" "}
                <h4>Smart Contracts</h4>
                <p style={{ marginBottom: 40, marginTop: 10 }}>
                  Our platform utilizes smart contracts to automate and secure
                  loan agreements. These self-executing contracts ensure that
                  all terms and conditions are met before funds are released.
                </p>
              </div>
              <div className="grid grid-cols-2 w-1/4">
                <div
                  className="pl-2 pt-1 rounded-lg h-8 w-10 mb-10 mt-5"
                  style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
                ></div>
                <div
                  className="pl-2 pt-1 rounded-lg h-8 w-10 mb-10 mt-5"
                  style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
                ></div>
                <div
                  className="pl-2 pt-1 rounded-lg h-8 w-10 mb-10 mt-5"
                  style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
                ></div>
                <div
                  className="pl-2 pt-1 rounded-lg h-8 w-10 mb-10 mt-5"
                  style={{ border: "solid 1px", borderColor: "#6AFFAE" }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="border border-white rounded-lg backdrop-blur-xl bg-sky-700/10 h-full p-8"
                style={{ borderColor: "#6AFFAE" }}
              >
                <RiGlobalLine
                  style={{
                    width: 45,
                    height: 45,
                    color: "#6AFFAE",
                    marginBottom: 50,
                  }}
                />
                <h4>Global Accessibility</h4>
                <p style={{ marginBottom: 40, marginTop: 10 }}>
                  EthenaCredit is designed to be accessible to users worldwide,
                  breaking down geographical barriers to financial services.
                </p>
              </div>
              <div
                className="border border-white rounded-lg backdrop-blur-xl bg-sky-700/10 h-full p-8"
                style={{ borderColor: "#6AFFAE" }}
              >
                <HiOutlineUsers
                  style={{
                    width: 45,
                    height: 45,
                    color: "#6AFFAE",
                    marginBottom: 50,
                  }}
                />
                <h4>User-Friendly Interface</h4>
                <p style={{ marginBottom: 40, marginTop: 10 }}>
                   We prioritize user experience with an intuitive and
                  easy-to-navigate interface.
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.get_started_section}>
        <h1>
          Get started <br />
          with EthenaCredit.
        </h1>
        <p style={{ marginBottom: 25 }}>
          Join EthenaCredit today and experience the future of lending with{" "}
          <br />
          unparalleled transparency, efficiency, and security.
        </p>
        <div className="flex justify-start">
          <Link href="/dashboard">
            <CustomButton
              value="Get Started"
              type={"button"}
              style={{
                marginBottom: 20,
                marginTop: 40,
                paddingLeft: 75,
                paddingRight: 75,
                fontSize: 20,
                marginRight: 20,
              }}
              disabled={false}
              onClick={() => {}}
            />
          </Link>
          <CustomButton
            value="Learn more"
            type={"button"}
            style={{
              marginBottom: 20,
              marginTop: 40,
              paddingLeft: 75,
              paddingRight: 75,
            }}
            disabled={false}
            onClick={() => {}}
            btnStyle="secondaryBtn"
          />
        </div>
      </div>
    </div>
  );
}
