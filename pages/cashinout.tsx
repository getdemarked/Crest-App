import { Container, Flex } from "@chakra-ui/react";
import CashInOutForm from "../components/CashInOutForm";

export default function CashinOutPage() {
    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <CashInOutForm />
            </Flex>
        </Container>
    );
}