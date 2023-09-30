import { Web3Button, useContract } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

type Props = {
    tokenAddress: string;
    receiver: string;
    amount: string;
    message: string;
};

export default function TransferButton({ tokenAddress, receiver, amount, message }: Props) {
    const toast = useToast();

    const {
        contract: tokenContract
    } = useContract(tokenAddress, 'token');

    const {
        contract: transferContract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    return (
        <Web3Button
            theme="dark"
            contractAddress={TRANSFER_CONTRACT_ADDRESS}
            action={async (contract) => {
                await tokenContract?.setAllowance(
                    TRANSFER_CONTRACT_ADDRESS,
                    ethers.utils.parseEther(amount).toString()
                );
                
                await transferContract?.call(
                    "transfer",
                    [
                        tokenAddress,
                        receiver,
                        ethers.utils.parseEther(amount),
                        message
                    ]
                );
            }}
            onSubmit={() => console.log("Transaction submitted")}
            onSuccess={() => toast({
                title: 'Transfer Successful',
                description: "You have successfully transferred an asset",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })}
            onError={(error) => alert("Something went wrong!")}
        >Transfer</Web3Button>
    );
}