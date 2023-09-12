import React, { useState } from "react";
import { Box, Card, Flex, Heading, Input, Text, Select } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/Home.module.css";

export default function TransferCard() {
    
  const address = useAddress();

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);

  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } =
    useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
  });

  const [selectedToken, setSelectedToken] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleTokenSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToken(event.target.value);
  };

  return (
    <Card p={4} mx="row" width="100%" maxW="400px">
      <Heading size="md">Transfer Asset</Heading>

      <Text mt={2} fontWeight="bold">
        Select Asset:
      </Text>
      <Select
        mt={2}
        onChange={handleTokenSelection}
        value={selectedToken}
      >
        {!isVerifiedTokensLoading &&
          verifiedTokens.map((token: string) => (
            <option key={token} value={token}>
              <TokenSelection
                tokenAddress={token}
                isSelected={selectedToken === token}
              />
            </option>
          ))}
      </Select>

      <TokenBalance tokenAddress={selectedToken} />

      <Text mt={2} fontWeight="bold">
        Send To:
      </Text>
      <Input
        placeholder="Enter UID here"
        type="text"
        value={formData.receiver}
        onChange={(event) => handleChange(event, "receiver")}
      />
      <Text mt={2} fontWeight="bold">
        Amount:
      </Text>
      <Input
        placeholder="0.0"
        type="number"
        value={formData.amount}
        onChange={(event) => handleChange(event, "amount")}
      />
      <Text mt={2} fontWeight="bold">
        Message:
      </Text>
      <Input
        placeholder="Add short message here."
        type="text"
        value={formData.message}
        onChange={(event) => handleChange(event, "message")}
      />
      <Box mt={4}>
        {address ? (
          <TransferButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
          />
        ) : (
          <Text>Please login to make a transfer.</Text>
        )}
      </Box>
    </Card>
  );
}
