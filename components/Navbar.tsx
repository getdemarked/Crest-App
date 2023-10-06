import React, { useState } from "react";
import {
  Container,
  Flex,
  Text,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ThirdwebProvider,
  ConnectWallet,
  useAddress,
  darkTheme,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Container maxW={"1440px"} py={4}>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Image
            src="/crest_horizontal_logo_black_nobg.png"
            alt="Crest Logo"
            boxSize="auto"
            maxW="120px"
          />
        </Link>
        {isSmallerScreen ? (
          <IconButton
            aria-label="Toggle menu"
            icon={<FaBars />}
            onClick={toggleMenu}
            variant="ghost"
          />
        ) : (
          address && (
            <Flex flexDirection={"row"}>
              <Link href={"/transfer"}>
                <Text mr={8}>Transfer</Text>
              </Link>
              <Link
                target="_blank"
                href={"https://www.facebook.com/messages/t/129861473549398"}
              >
                <Text mr={8}>Cash in</Text>
              </Link>
              <Link
                target="_blank"
                href={"https://www.facebook.com/messages/t/129861473549398"}
              >
                <Text mr={8}>Cash out</Text>
              </Link>
              <Link href={`/profile/${address}`}>
                <Text>My Wallet</Text>
              </Link>
            </Flex>
          )
        )}
        <Modal isOpen={isOpen} onClose={closeMenu} size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Menu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                {address && (
                  <>
                    <Link href={"/transfer"}>
                      <Text onClick={closeMenu}>Transfer</Text>
                    </Link>
                    <Link
                      target="_blank"
                      href={"https://www.facebook.com/messages/t/129861473549398"}
                    >
                      <Text onClick={closeMenu}>Cash in</Text>
                    </Link>
                    <Link
                      target="_blank"
                      href={"https://www.facebook.com/messages/t/129861473549398"}
                    >
                      <Text onClick={closeMenu}>Cash out</Text>
                    </Link>
                    <Link href={`/profile/${address}`}>
                      <Text onClick={closeMenu}>My Wallet</Text>
                    </Link>
                    <ConnectWallet
                      theme={"dark"}
                      btnTitle={"Login"}
                      modalTitle={"Login"}
                      switchToActiveChain={true}
                      modalSize={"wide"}
                      welcomeScreen={{
                        subtitle: "Login to access your account",
                      }}
                      modalTitleIconUrl={"#"}
                      detailsBtn={() => {
                        return <Text></Text>;
                      }}
                    />
                  </>
                )}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Container>
  );
}
