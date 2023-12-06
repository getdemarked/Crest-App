import React, { useEffect, useState } from 'react';
import { CovalentClient, BlockTransactionWithContractTransfers } from "@covalenthq/client-sdk";
import { useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { Heading, Flex, Text, Box, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react";
import styles from '../styles/TransactionHistory.module.css';
import { CALIM_TOKEN_CONTRACT_ADDRESS } from "../const/addresses";

const formatAmount = (delta: string) => {
  const parsedDelta = BigInt(delta);
  const above18Decimals = parsedDelta / BigInt(10 ** 18);
  return above18Decimals.toString();
};

const TransactionHistoryPage: React.FC = () => {
  const { contract } = useContract(CALIM_TOKEN_CONTRACT_ADDRESS, "token-drop");

  const { data: contractMetadata } = useContractMetadata(contract);
  const [transactions, setTransactions] = useState<any[]>([]);
  const address = useAddress();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const covalentApiKey = 'ckey_8fb0fa176c3a4ff7ba218b0862a';

        if (!covalentApiKey) {
          console.error('API key is missing.');
          return;
        }

        if (address === undefined) {
          console.error('Wallet address is undefined.');
          return;
        }

        const client = new CovalentClient(covalentApiKey);
        const walletAddress: string = address;

        const contractAddress = "0xf4ED0ba75DfA2D64828e9F6cd280fB660Bc09908";

        const response: BlockTransactionWithContractTransfers[] = [];
        for await (const item of await client.BalanceService.getErc20TransfersForWalletAddress(
          "base-mainnet",
          walletAddress,
          { "contractAddress": contractAddress }
        )) {
          const filteredTransfers = item.transfers?.filter(
            (transfer) => transfer.transfer_type === "OUT" && transfer.delta !== undefined
          );

          if (filteredTransfers && filteredTransfers.length > 0) {
            response.push({
              ...item,
              transfers: filteredTransfers,
            });
          }
        }

        setTransactions(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unknown error occurred.');
        }
      }
    };

    fetchTransactionHistory();
  }, [address]);

  const getTransactionType = (toAddress: string, amount: string): string => {
    if (toAddress === '0x723a159b280e23889e78ae3c397b52cca21ecd3b' && amount === '10') {
      return 'fee';
    } else if (toAddress === '0x504b92cc567a334eb8c5c021e91f3f84a2c5f7a7') {
      return 'withdraw';
    } else {
      return 'transfer';
    }
  };

  const getTransactionTypeText = (toAddress: string, amount: string): string => {
    const transactionType = getTransactionType(toAddress, amount);

    switch (transactionType) {
      case 'fee':
        return 'Fee';
      case 'withdraw':
        return 'Withdraw';
      case 'transfer':
        return 'Transfer';
      default:
        return 'Unknown';
    }
  };

  return (
    <Flex direction="column" align="center" p={4} width="100%" height="100%">
      <Heading mb={4}>Transaction History</Heading>
      {transactions.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <Box overflowX="auto" width="100%">
          <SimpleGrid columns={[1, 1, 2]} spacing={4}>
            {transactions.map((transaction) => (
              <Box key={transaction.tx_hash} className={styles.transactionItem}>
                <Flex
                  className={styles.indicatorContainer}
                  align="center"
                  mb={2}
                >
                  <span
                    className={`${styles.indicator} ${styles[getTransactionType(
                      transaction.transfers[0].to_address,
                      formatAmount(transaction.transfers[0].delta)
                    )]}`}
                  />
                  <Text ml={2} fontSize={["xs", "sm"]} whiteSpace="nowrap">
                    {getTransactionTypeText(
                      transaction.transfers[0].to_address,
                      formatAmount(transaction.transfers[0].delta)
                    )}
                  </Text>
                </Flex>
                <Flex direction="column" alignItems="left" textAlign="left">
                  <div>
                    <span className={styles.label}>Transaction ID:</span>
                    <br />
                    <ChakraLink
                      fontSize={["xs", "sm"]}
                      isTruncated
                      href={`https://basescan.org/tx/${transaction.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="blue.500" // Set the link color
                      textDecoration="underline" // Add underline to the link
                    >
                      Show Transaction ID
                    </ChakraLink>
                  </div>
                  <div>
                    <span className={styles.label}>Amount:</span>{' '}
                    <Text fontSize={["xs", "sm"]} isTruncated>
                      {formatAmount(transaction.transfers[0].delta)} {contractMetadata?.symbol}
                    </Text>
                  </div>
                  <div>
                    <span className={styles.label}>To UID:</span>{' '}
                    <Text fontSize={["xs", "sm"]} isTruncated>
                      {transaction.transfers[0].to_address}
                    </Text>
                  </div>
                  <div>
                    <span className={styles.label}>Date:</span>{' '}
                    <Text fontSize={["xs", "sm"]} isTruncated>
                      {new Date(transaction.block_signed_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                      })}
                    </Text>
                  </div>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};

export default TransactionHistoryPage;