import React, { useState, useEffect} from "react";
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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    // Display a toast message when the component mounts
    if (!isToastShown) {
      toast.info("This project is under development and still in the alpha phase.", {
        position: "top-center",
        autoClose: false, // Set to false to allow manual closing
        closeOnClick: false, // Set to false to prevent closing on click
      });
      setIsToastShown(true);
    }
  }, [isToastShown]);

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
              <Link href={"/claim"}>
                <Text mr={8}>Claim</Text>
              </Link>
              <Link href={"/deposit"}>
                <Text mr={8}>Deposit</Text>
              </Link>
              <Link href={"/withdraw"}>
                <Text mr={8}>Wihtdraw</Text>
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
                <ConnectWallet
                  theme={"dark"}
                  btnTitle={"Login"}
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
                {address && (
                  <>
                    <Link href={"/transfer"}>
                      <Text onClick={closeMenu}>Transfer</Text>
                    </Link>
                    <Link href={"/claim"}>
                      <Text onClick={closeMenu}>Claim</Text>
                    </Link>
                    <Link href={"/deposit"}>
                      <Text onClick={closeMenu}>Deposit</Text>
                    </Link>
                    <Link href={"/withdraw"}>
                      <Text onClick={closeMenu}>Withdraw</Text>
                    </Link>
                    <Link href={`/profile/${address}`}>
                      <Text onClick={closeMenu}>My Wallet</Text>
                    </Link>
                  </>
                )}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <ToastContainer />
    </Container>
  );
}
