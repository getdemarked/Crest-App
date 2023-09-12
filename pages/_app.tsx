import type { AppProps } from "next/app";
import { 
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  smartWallet,
  trustWallet,
  safeWallet,
  magicLink,
  paperWallet, } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Ethereum, Polygon,  } from "@thirdweb-dev/chains"; //mainnet
import { Mumbai, BaseGoerli } from "@thirdweb-dev/chains"; //testnet

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
    activeChain={activeChain} 
    clientId={process.env.TW_CLIENT_ID}
    supportedChains={[
      Polygon
    ]}
    supportedWallets={
      [
        /*
        paperWallet({
          paperClientId: {process.env.PAPER_CLIENT_ID} as string,
        }),*/
        magicLink({
          apiKey: process.env.MAGICLINK_CLIENT_ID as string, 
        }),
        /*
          smartWallet({
          factoryAddress: "",
          thirdwebApiKey: "",
          gasless: false,
          personalWallets: [
            metamaskWallet(),
            localWallet()
          ]
        }),*/
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        safeWallet(),
        localWallet(),
      ]
    }
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
