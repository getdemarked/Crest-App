import React from "react";
import { Container, Flex, Text, Image } from "@chakra-ui/react";
import { ConnectWallet, useAddress, } from "@thirdweb-dev/react";
import Link from "next/link";

export default function Navbar() {
  const address = useAddress();
  return (
    <Container maxW={"1440px"} py={4}>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Image
            src="/crest_horizontal_logo_black_nobg.png" // Replace with the actual logo image path
            alt="Crest Logo"
            boxSize="auto"
            maxW="120px" // Adjust the maximum width of the logo
          />
        </Link>
        {address && (
          <Flex flexDirection={"row"}>
            <Link href={"/transfer"}>
              <Text mr={8}>Transfer</Text>
            </Link>
            <Link href={`/profile/${address}`}>
              <Text>My Wallet</Text>
            </Link>
          </Flex>
        )}
        <ConnectWallet 
        btnTitle="Login" 
        modalTitle="Login"
        detailsBtn={() => {
            return <Text></Text>;
        }}

        />
      </Flex>
    </Container>
  );
}