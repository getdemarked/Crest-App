import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet,
  smartWallet,
  darkTheme,
} from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { Ethereum, Polygon,  } from "@thirdweb-dev/chains"; //mainnet
import { Mumbai, BaseGoerli } from "@thirdweb-dev/chains"; //testnet

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

const smartWalletOptions = {
  factoryAddress: "0x07774908c663f249507923d0A77D56d2cbe71a15",
  gasless: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
    activeChain={activeChain} 
    clientId="ed00a882b22dfd9edeea77c9ce3ab664"
    supportedWallets={[
      smartWallet(
        metamaskWallet(),
        smartWalletOptions,
      ),
      smartWallet(
        coinbaseWallet(),
        smartWalletOptions,
      ),
      smartWallet(
        walletConnect(),
        smartWalletOptions,
      ),
      smartWallet(
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ],
        }),
        smartWalletOptions,
      ),
      smartWallet(
        localWallet(),
        smartWalletOptions,
      ),
      smartWallet(
        embeddedWallet({ recommended: true }),
        smartWalletOptions,
      ),
      smartWallet(
        trustWallet(),
        smartWalletOptions,
      ),
      smartWallet(
        rainbowWallet(),
        smartWalletOptions,
      ),
    ]}
  >
      <ChakraProvider>
      <Head>
  <title>Crest Digital Wallet - Your Secure Financial Wallet</title>
  <meta
    name="description"
    content="Crest Digital Wallet is your trusted and secure Financial wallet. Store, send, and receive funds with ease."
  />
  <meta property="og:title" content="Crest Digital Wallet - Your Secure Financial Wallet" />
<meta property="og:description" content="Crest Digital Wallet is your trusted and secure Financial wallet. Store, send, and receive funds with ease." />
<meta property="og:image" content="https://example.com/your-image.jpg" /> 
<meta property="og:url" content="https://facebook.com/CrestDigitalWallet" /> 
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Crest Digital Wallet - Your Secure Financial Wallet" />
<meta name="twitter:description" content="Crest Digital Wallet is your trusted and secure Financial wallet. Store, send, and receive funds with ease." />
<meta name="twitter:image" content="https://example.com/your-image.jpg" /> 
<meta name="twitter:url" content="https://twitter.com/CrestDigitalWallet" /> 


</Head>

        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
