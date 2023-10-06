import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  ConnectWallet
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/CashInOutForm.module.css";

export default function TransferCard() {
  const address = useAddress();

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);

  const {
    data: verifiedTokens,
    isLoading: isVerifiedTokensLoading,
  } = useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
  });

  const [selectedToken, setSelectedToken] = useState("");

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
    <div className={styles.formContainer}>
      <Card p={4}>
        <Heading className={styles.title}>Transfer:</Heading>

        <Text className={styles.label}>Select Asset:</Text>
        <Flex flexDirection="row" mt={4} flexWrap="wrap">
          {!isVerifiedTokensLoading &&
            verifiedTokens.map((token: string) => (
              <Box
                key={token}
                onClick={() => handleTokenSelection(token)}
                className={styles.tokenButton}
                flexBasis={["50%", "30%", "20%"]}
                padding={2}
              >
                <TokenSelection
                  tokenAddress={token}
                  isSelected={selectedToken === token}
                />
              </Box>
            ))}
        </Flex>

        <TokenBalance tokenAddress={selectedToken} />
        
        <div className={styles.inputGroup}>
          <Text className={styles.label}>Send To:</Text>
          <Input
            placeholder="e.g., 0x1234567890abcdef..."
            type="text"
            value={formData.receiver}
            required
            className={styles.input}
            onChange={(event) => handleChange(event, "receiver")}
          />
        </div>

        <div className={styles.inputGroup}>
          <Text className={styles.label}>Amount:</Text>
          <Input
            placeholder="0.0"
            type="number"
            value={formData.amount}
            required
            className={styles.input}
            onChange={(event) => handleChange(event, "amount")}
          />
        </div>

        <div className={styles.inputGroup}>
          <Text className={styles.label}>Message: (Optional)</Text>
          <Input
            placeholder="Add a short message here."
            type="text"
            value={formData.message}
            className={styles.input}
            onChange={(event) => handleChange(event, "message")}
          />
        </div>

        <Box mt={4}>
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
                    src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                    width: 150,
                    height: 150,
                  },
                  subtitle:
                    "Login to transfer assets",
                }}
                modalTitleIconUrl={
                  "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
                }
                detailsBtn={() => {
                    return <Text></Text>;
                }}
        
                />
            
          )}
        </Box>
      </Card>
    </div>
  );
}
