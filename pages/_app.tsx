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
    clientId="cb72ef930a22b6ef0ea75f1888be248f"
    supportedChains={[
      Polygon
    ]}
    supportedWallets={
      [
        
        paperWallet({
          paperClientId: 'dd2a7b91-e862-4542-b6cd-1a6e8e23b277',
        }),
        /*
        magicLink({
          apiKey: 'pk_live_620BAEFEB70A9317',
        }),
        
          smartWallet({
          factoryAddress: "0x4Ddf33Ffc79eaB7b242d9D20047D767871D26a83",
          gasless: true,
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
