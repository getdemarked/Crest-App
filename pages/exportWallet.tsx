import { Container, Flex } from "@chakra-ui/react";
import TransferCard from "../components/TransferCard";
import Events from "../components/Events";

export default function ExportWallet() {
    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <iframe
                    src="https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=c118bdd32635b3929f8d1aa32c0e5548"
                    style={{
                        width: "100%",
                        height: "400px",
                        // Add more styles for mobile optimization if needed
                    }}
                />
            </Flex>
        </Container>
    );
}
