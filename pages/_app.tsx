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

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base";

const smartWalletOptions = {
  factoryAddress: "0xacca204f8d716150e81078d7f83c1157c67cccf5",
  gasless: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
    activeChain={activeChain} 
    clientId="c118bdd32635b3929f8d1aa32c0e5548"
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
        localWallet(),
        smartWalletOptions,
      ),
      smartWallet(
        embeddedWallet({
          recommended: true,
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
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
