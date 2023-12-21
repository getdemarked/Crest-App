import { useRef } from "react";
import domtoimage from "dom-to-image";
import Link from 'next/link';
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
  useContractMetadata,
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import WithdrawButton from "./WithdrawButton";
import styles from "../styles/CashInOutForm.module.css";
import QRScanner from "../components/QRScanner";

export default function WithdrawNowPage() {
  const address = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef(null);

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);
  const [selectedToken, setSelectedToken] = useState("0xf4ED0ba75DfA2D64828e9F6cd280fB660Bc09908");
  const { data: contractMetadata } = useContractMetadata(contract);

  const {
    data: verifiedTokens,
    isLoading: isVerifiedTokensLoading,
  } = useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9",
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

  const saveTransactionImage = () => {
    if (modalContentRef.current) {
      const options = {
        style: {
          transform: 'scale(.7)', // Adjust the scale factor as needed
          transformOrigin: 'top left',
        },
      };
  
      domtoimage.toBlob(modalContentRef.current, options).then(function (blob) {
        if (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "transaction-info.png";
          link.click();
        }
      });
    }
  };

  return (
    <Box
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      className={styles.formContainer}
      width={["100%", "100%", "80%", "60%"]}
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
          <WithdrawButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
            onSuccess={() => {
              setIsModalOpen(true);
            }}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent ref={modalContentRef}>
          <ModalHeader>Withdrawal Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <b>Here is the withdrawal information:</b> 
            </Text>
            <br></br>
            <Text>Selected Asset: <b>{contractMetadata?.symbol}</b></Text>
            <Text>Receiver: {formData.receiver}</Text>
            <Text>Amount: XPHP {formData.amount}</Text>
            <Text>Message: {formData.message}</Text>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={saveTransactionImage}>Save as Image</Button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Text>
              <center><i>Please wait for 5 minutes to an hour to process your withdrawal</i></center>
            </Text>
            <br></br>
            <br></br>
            <Text>
              <center><i>While waiting you need to fill up the form below to process the transaction faster. But first you need to save this withdrawal receipt.</i></center>
            </Text>
            <br></br>
            <br></br>
            <div style={{ textAlign: 'center' }}>
            <Link href="/withdrawForm">
                  <Button>Withdrawal Form</Button>
            </Link>
            </div>
            <br></br>
            <br></br>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
