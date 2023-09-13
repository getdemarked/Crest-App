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
        
        paperWallet({
          paperClientId: 'dd2a7b91-e862-4542-b6cd-1a6e8e23b277',
        }),
        /*
        magicLink({
          apiKey: 'pk_live_620BAEFEB70A9317',
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
    sdkOptions={{
      gasless: {
        openzeppelin:{
          relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/036b87db-f66a-414b-9f27-6f626bb07a52/runs/webhook/a6f84629-5a3f-4d72-9b42-1322ab845fd1/86u8Q8DwSVCaw3hRvU32ez'
        }
      }
    }}
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
