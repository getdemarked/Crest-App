import React from "react";
import { Container, Flex, Text, Button, useToast } from "@chakra-ui/react";
import WithdrawalForm from "../components/WithdrawalForm";

const WithdrawalFormPage = () => {

  return (
    <Container maxW="full" p={[4, 6]}>
      <br />
      <br />
      <WithdrawalForm />
    </Container>
  );
};

export default WithdrawalFormPage;
