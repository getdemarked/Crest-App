import { Container, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import WithdrawalForm from "../components/WithdrawalForm";

const WithdrawalPage = () => {


  return (
    <Container maxW="full" p={[4, 6]}>
      <WithdrawalForm />
    </Container>
  );
};

export default WithdrawalPage;
