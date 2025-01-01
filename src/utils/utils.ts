import { MD5 } from "crypto-js";

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "";

const ts = new Date().getTime().toString();
const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

export { PUBLIC_KEY, PRIVATE_KEY, ts, hash };
