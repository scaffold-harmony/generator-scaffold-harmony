import {HarmonyExtension} from "@harmony-js/core";
import {ChainID, ChainType, defaultConfig} from "@harmony-js/utils";
import {Messenger} from "@harmony-js/network";

export const configs = {
  localnet: {
    Chain_ID: ChainID.HmyLocal,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'http://localhost:9500',
    Network_ID: '1666700000',
  },
  testnet: {
    Chain_ID: ChainID.HmyTestnet,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'https://api.s0.b.hmny.io',
    Network_ID: '1666700000',
  },
  mainnet: {
    Chain_ID: ChainID.HmyMainnet,
    Chain_Type: ChainType.Harmony,
    Chain_URL: 'https://api.s0.t.hmny.io',
    Network_ID: '1666600000',
  }
}

export async function getHarmony(config) {
  await (async() => {
    console.log("waiting for onewallet extension to be injected...");
    while(!window.hasOwnProperty("onewallet") && !window.hasOwnProperty("harmony")) {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  })();
  const harmony = await new HarmonyExtension(window.onewallet || window.harmony || {}, config);
  harmony.setProvider(config.Chain_URL);
  harmony.setMessenger(new Messenger(harmony.provider, config.Chain_Type, config.Chain_ID));
  return harmony;
}
