import Web3 from "web3";
import { HarmonyExtension } from "@harmony-js/core";

const getWeb3 = () => new HarmonyExtension(window.onewallet);


export default getWeb3;
