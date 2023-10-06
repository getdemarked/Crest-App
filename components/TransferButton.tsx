import { Web3Button, useContract } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import styles from "../styles/CashInOutForm.module.css";

type Props = {
  tokenAddress: string;
  receiver: string;
  amount: string;
  message: string;
};

export default function TransferButton({
  tokenAddress,
  receiver,
  amount,
  message,
}: Props) {
  const toast = useToast();

  const { contract: tokenContract } = useContract(tokenAddress, "token");

  const { contract: transferContract } = useContract(
    TRANSFER_CONTRACT_ADDRESS
  );

  const handleTransfer = async () => {
    try {
      // Set the allowance and initiate the transfer
      await tokenContract?.setAllowance(
        TRANSFER_CONTRACT_ADDRESS,
        ethers.utils.parseEther(amount).toString()
      );

      await transferContract?.call("transfer", [
        tokenAddress,
        receiver,
        ethers.utils.parseEther(amount),
        message,
      ]);

      // Display a success toast
      toast({
        title: "Transfer Successful",
        description: "You have successfully transferred an asset",
        status: "success",
        duration: 5000000000000, // Adjust the duration as needed
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during transfer:", error);
      // Display an error message
      toast({
        title: "Transfer Error",
        description: "Something went wrong while transferring.",
        status: "error",
        duration: 5000000000000, // Adjust the duration as needed
        isClosable: true,
      });
    }
  };

  return (
    <Web3Button
      theme="dark"
      contractAddress={TRANSFER_CONTRACT_ADDRESS}
      action={handleTransfer} // Use the handleTransfer function
      onSubmit={() => console.log("Transaction submitted")}
      onError={(error) => alert("Something went wrong!")}
      className={styles.submitButton}
    >
      Transfer
    </Web3Button>
  );
}
