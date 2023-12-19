import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import WithdrawButton from "./WithdrawButton";
import styles from "../styles/CashInOutForm.module.css";


let nodemailer: any;
if (typeof window === 'undefined') {
  nodemailer = require('nodemailer');
}


export default function WithdrawNowPage() {
  const address = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);
  const [selectedToken, setSelectedToken] = useState("0xf4ED0ba75DfA2D64828e9F6cd280fB660Bc09908");

  

  const {
    data: verifiedTokens,
    isLoading: isVerifiedTokensLoading,
  } = useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9",
    amount: "",
    gcashName: "",
    gcashNumber: "",
    message: "",
  });

  const handleChange = (event: any, name: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleTokenSelection = (tokenAddress: string) => {
    setSelectedToken(tokenAddress);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Error sending email');
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error, e.g., show an error message to the user
    }
  };

  return (
    <Box
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      className={styles.formContainer}
      width={["100%", "100%", "80%", "60%"]} // Adjust the width based on your design needs
      mx="auto"
    >
      <Heading fontSize="xl" mb={4} textAlign="center">
        Withdraw
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Select Asset:</FormLabel>
        <Flex flexDirection="row" mt={2} flexWrap="wrap">
  {!isVerifiedTokensLoading &&
    verifiedTokens.map((token: string) => (
      <Box
        key={token}
        onClick={() => handleTokenSelection(token)}
        className={`${styles.tokenButton} ${
          selectedToken === token ? styles.selectedToken : ""
        }`}
        flexBasis={["100%", "50%", "30%", "20%"]}
        padding={2}
      >
        <TokenSelection
          tokenAddress={token}
          isSelected={selectedToken === token}
        />
      </Box>
    ))}
</Flex>
      </FormControl>

      <TokenBalance tokenAddress={selectedToken} />
      <FormControl mb={4}>
  <FormLabel></FormLabel>
  <Input
    placeholder="0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9"
    type="text"
    value="0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9"
    required
    onChange={(event) => handleChange(event, "receiver")}
    readOnly
  />
</FormControl>

<FormControl mb={4}>
  <FormLabel>From:</FormLabel>
  <Input
    placeholder={address}
    type="text"
    value={address}
    required
    readOnly
  />
</FormControl>


      <FormControl mb={4}>
        <FormLabel>Amount:</FormLabel>
        <Input
          placeholder="0.0"
          type="number"
          value={formData.amount}
          required
          onChange={(event) => handleChange(event, "amount")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>GCash Name</FormLabel>
        <Input
          placeholder="Enter GCash name here"
          type="text"
          required
          value={formData.gcashName}
          onChange={(event) => handleChange(event, "gcashName")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>GCash Number</FormLabel>
        <Input
          placeholder="09....."
          type="number"
          required
          value={formData.gcashNumber}
          onChange={(event) => handleChange(event, "gcashNumber")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Message: (Optional)</FormLabel>
        <Input
          placeholder="Add a short message here."
          type="text"
          value={formData.message}
          onChange={(event) => handleChange(event, "message")}
        />
      </FormControl>

      <Flex justifyContent="center" mt={4}>
        {address ? (
          <WithdrawButton
          tokenAddress={selectedToken}
          receiver={formData.receiver}
          amount={formData.amount.toString()}
          message={formData.message}
          onSubmit={handleSubmit}
        />
        ) : (
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Click Me to Withdraw"}
            modalTitle={"Login"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              img: {
                src:
                  "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                width: 150,
                height: 150,
              },
              subtitle: "Login to withdraw assets",
            }}
            modalTitleIconUrl={
              "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
            }
            detailsBtn={() => {
              return <Text></Text>;
            }}
          />
        )}
      </Flex>
    </Box>
  );
}
