/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "@/styles/Home.module.css";
import CustomButton from "../Button";
import CustomInput from "../CustomInput";

const Footer = ({ }: any) => {
  return (
    <footer className={styles.footer}>
      <div
        className="border border-white backdrop-blur-xl bg-sky-700/10 p-8 h-auto flex justify-between mt-20 rounded-2xl"
        style={{ borderColor: "#6AFFAE" }}
      >
        <div className="w-2/5">
          <h1>STAY UP TO DATE</h1>
          <div style={{ display: "flex" }}>
            <CustomInput
              //value={values.price}
              placeholder="Acres"
              name="acres"
              style={{
                color: "white",
                backgroundColor: "black",
                width: "auto",
                margin: 0,
                border: "none",
              }}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <CustomButton
              value="Sign Up"
              type={"button"}
              style={{
                marginBottom: 0,
                marginTop: 0,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 17,
                borderRadius: 5,
                width: 120,
                height: 50,
              }}
              disabled={false}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 w-2/5">
          <div style={{}}>
            <ul>
              <li>Product</li>
              <li>Pricing</li>
              <li>Customers</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Price Kit</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>X</li>
              <li>Discord</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
