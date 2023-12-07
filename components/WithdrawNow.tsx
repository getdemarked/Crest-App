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
import TransferButton from "./TransferButton";
import styles from "../styles/CashInOutForm.module.css";
import QRScanner from "../components/QRScanner";



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
    receiver: "",
    amount: "",
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
          <TransferButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
          />
        ) : (
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Click Me to Transfer"}
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
              subtitle: "Login to transfer assets",
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
