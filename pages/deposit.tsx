import { Container, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import DepositForm from "../components/DepositForm";

const DepositPage = () => {
  const address = useAddress();
  const [isCopied, setIsCopied] = useState(false);
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    toast({
      title: "Copied!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const truncateAddress = (address: string | undefined) => {
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
    }
    return "N/A";
  };

  return (
    <Container maxW="full" p={[4, 6]}>
      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Flex alignItems="center" mt={[4, 4, 0]} mb={[2, 2, 0]}>
          <Text as="b" fontSize={["lg", "xl"]}>
            UID
          </Text>{" "}
        </Flex>
        <Flex alignItems="center" mt={[4, 4, 0]} mb={[2, 2, 0]}>
          <Text
            fontSize={["sm", "md"]}
            border="2px solid black"
            borderRadius={4}
            p={2}
          >
            {truncateAddress(address)}
          </Text>
        </Flex>
        <Flex alignItems="center" mt={[4, 4, 0]} mb={[2, 2, 0]}>
          <Button size="sm" onClick={() => copyToClipboard(address as string)}>
            {isCopied ? "Copied!" : "Copy UID"}
          </Button>
        </Flex>
      </Flex>

      <br />
      <br />

      <DepositForm />
    </Container>
  );
};

export default DepositPage;
