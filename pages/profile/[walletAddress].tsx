import React, { useState } from "react";
import { Avatar, Container, Flex, Heading, SimpleGrid, Spinner, Text, Button } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useDisconnect, ConnectWallet, useOwnedNFTs  } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import BalanceCard from "../../components/BalanceCard";
import TransactionHistory from "../../components/TransactionHistory";
import ProfilePicture from "../../components/ProfilePicture";
import { useQRCode } from "next-qrcode";

export default function AccountPage() {
    const disconnect = useDisconnect();
    const address = useAddress();
    const [isCopied, setIsCopied] = useState(false);
    const { Canvas } = useQRCode();

    function copyToClipboard(text: string) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // Reset copied state after 3 seconds
    }
    

    function truncateAddress(address: string) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    const { 
        contract: transferContract,
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(
        transferContract,
        "getVerifiedTokens"
    );
    
    return (
        <Container maxW={"1440px"} py={4}>
            {address ? (
                <Flex flexDirection={["column", "column", "row"]}>
                    <Flex flexDirection={"column"} mr={[0, 0, 8]} p={10} alignItems={["center"]}>
                    <ConnectWallet 

                    
                theme={"dark"}
                btnTitle={"Click Me to Login"}
                modalTitle={"Login"}
                switchToActiveChain={true}
                modalSize={"wide"}
                hideTestnetFaucet={true}
                welcomeScreen={{
                    img: {
                      src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                      width: 150,
                      height: 150,
                    },
                    subtitle:
                      "Login to access your account",
                  }}
                  modalTitleIconUrl={
                    "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
                  }

                  detailsBtn={() => {
                    return <Canvas
                    text={address}
                    options={{
                      width: 128,
                    }}
                  />
      
                    
                    ;
                  }}
        
                />
                        <Flex alignItems="center" mt={[4, 4, 0]}>
                            <Text as='b'>UID</Text> <br></br></Flex>
                            <Flex alignItems="center" mt={[4, 4, 0]}>
                            <Text
                                fontSize={"sm"}
                                border={"2px solid black"}
                                textAlign={["center"]}
                                borderRadius={4}
                                pr={2}
                            >
                                {truncateAddress(address)}
                            </Text>
                        </Flex>
                      
                        <Flex alignItems="center" mt={[4, 4, 0]}>
                            <Button size="sm" onClick={() => copyToClipboard(address)}>
                                {isCopied ? "Copied!" : "Copy UID"}
                            </Button>
                        </Flex>
                        <Flex alignItems="center" mt={[4, 4, 0]}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button onClick={disconnect}>Logout</Button>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} w={"100%"}>
                        <Heading textAlign={["center"]}>Wallet Balance</Heading>
                        <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                        {!isVerifiedTokensLoading ? (
                            verifiedTokens.map((token: string) => (
                                <BalanceCard
                                    key={token}
                                    tokenAddress={token}
                                />
                            ))
                        ) : (
                            <Spinner />
                        )}
                        </SimpleGrid>
                     
                    </Flex>
                    <Flex
  direction="column"
  alignItems="center"
  justifyContent="center"
  mt={[4, 4, 0]}
  mx={[2, 4, 8]} // Adjust the horizontal margins for responsiveness on smaller screens
  width={["100%", "90%", "40%"]} // Adjust the width for responsiveness on smaller screens
>
  <TransactionHistory />
</Flex>

                    
                    
                </Flex>
                
            ) : (
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <ConnectWallet 
                theme={"dark"}
                btnTitle={"Please login to continue"}
                modalTitle={"Login"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={{
                    img: {
                      src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                      width: 150,
                      height: 150,
                    },
                    subtitle:
                      "Login to access your account",
                  }}
                  modalTitleIconUrl={
                    "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
                  }
                detailsBtn={() => {
                    return <Text></Text>;
                }}
        
                />
                </Flex>
                
            )}

        



            
        </Container>

        
    )
}