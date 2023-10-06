import type { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { MediaRenderer, ConnectWallet } from "@thirdweb-dev/react";
import { FEATURES_IMAGE_URL, HERO_IMAGE_URL } from "../const/addresses";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"} >
      <Flex
        flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens, align in a row on medium screens and above
        px={{ base: 4, md: 20 }} // Reduce horizontal padding on small screens
        py={8} // Add vertical padding
        borderRadius={20}
      >
        <Box flex={{ base: 1, md: 1 }} mb={{ base: 4, md: 0 }}>
          <MediaRenderer src={HERO_IMAGE_URL} height="100%" width="100%" />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="center"
          w={{ base: "100%", md: "60%" }} // Occupy full width on small screens, 60% width on medium screens and above
        >
          
          <Stack spacing={4}>
            <Heading bgGradient='linear(to-l, #000000, #007639)' bgClip='text' fontWeight='extrabold' fontSize={{ base: "5xl", md: "6xl" }}>
              Send Money to your Filipino Friends and Family from any Country with ease.
            </Heading>
            <Text fontSize={{ base: "md", md: "xl" }}>
              Select from a selection of currency to transfer to your friends and
              family. Write a message to go along with your fund transfer.
              Login in your wallet to get started now!
            </Text>
            <ConnectWallet 
        theme={"dark"}
        btnTitle={"Create an Account Now!"}
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
          </Stack>
        </Flex>
      </Flex>
      <br></br><br></br><br></br>
      <Center><Heading>How to Transfer?</Heading></Center>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        <Box>
          <MediaRenderer src={FEATURES_IMAGE_URL} height="100%" width="100%" />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={4}>
            <FeatureCard
              step={"01"}
              title={"Select an Asset"}
              description={
                "Select from a list of verified Asset to send to your friends and family."
              }
            />
            <FeatureCard
              step={"02"}
              title={"Who to Send To"}
              description={
                "Enter the UID of the recipient. Double-check the address as it's non-reversible."
              }
            />
            <FeatureCard
              step={"03"}
              title={"Write a Message"}
              description={
                "Add an optional message to your asset transfer."
              }
            />
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Home;