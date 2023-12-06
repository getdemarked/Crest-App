import { Avatar, Container, Flex, Heading, SimpleGrid, Spinner, Text, Button } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useDisconnect, ConnectWallet, useOwnedNFTs  } from "@thirdweb-dev/react";
import React, { useState } from "react";
import DepositForm from "../components/DepositForm";


export default function DepositPage() {
    
    const address = useAddress();
    const [isCopied, setIsCopied] = useState(false);

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
    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
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
                                {truncateAddress(address as string)}
                            </Text>
                        </Flex>
                        <Flex alignItems="center" mt={[4, 4, 0]}>
                            <Button size="sm" onClick={() => copyToClipboard(address)}>
                                {isCopied ? "Copied!" : "Copy UID"}
                            </Button>
                        </Flex>

                        <br></br>
                        <br></br>
                
                <DepositForm />
            </Flex>
        </Container>
    );
}