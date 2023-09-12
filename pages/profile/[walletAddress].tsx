import React, { useState } from "react";
import { Avatar, Container, Flex, Heading, SimpleGrid, Spinner, Text, Button } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useDisconnect  } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import BalanceCard from "../../components/BalanceCard";

export default function AccountPage() {
    const disconnect = useDisconnect();
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
                        <Avatar size={"2xl"} mb={4}/>
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
                            <Button size="sm" onClick={() => copyToClipboard(address)}>
                                {isCopied ? "Copied!" : "Copy"}
                            </Button>
                        </Flex>
                        <Flex alignItems="center" mt={[4, 4, 0]}>
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
                </Flex>
            ) : (
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Text fontSize="xl">Please Login to continue</Text>
                </Flex>
            )}
            
        </Container>
    )
}