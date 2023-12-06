import { Container, Flex } from "@chakra-ui/react";
import WithdrawalForm from "../components/WithdrawalForm";

export default function WithdrawPage() {
    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <WithdrawalForm />
            </Flex>
        </Container>
    );
}