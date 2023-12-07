import React, { useState } from "react";
import {
  Container,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import WithdrawalForm from "../components/WithdrawalForm";
import WithdrawNow from "../components/WithdrawNow";

const WithdrawalPage = () => {
  const [withdrawalFormModal, setWithdrawalFormModal] = useState(false);
  const [withdrawNowModal, setWithdrawNowModal] = useState(false);

  const openWithdrawalFormModal = () => {
    setWithdrawalFormModal(true);
  };

  const closeWithdrawalFormModal = () => {
    setWithdrawalFormModal(false);
  };

  const openWithdrawNowModal = () => {
    setWithdrawNowModal(true);
  };

  const closeWithdrawNowModal = () => {
    setWithdrawNowModal(false);
  };

  return (
    <Container maxW="full" p={[4, 6]}>
      <Flex direction="column" align="center" justify="center">
      <Button onClick={openWithdrawNowModal} mb={[2, 4]}>
          Withdraw Now
        </Button>
        <Button onClick={openWithdrawalFormModal} mb={[2, 4]}>
          Withdrawal Form
        </Button>
      </Flex>

      {/* Withdrawal Form Modal */}
      <Modal
        isOpen={withdrawalFormModal}
        onClose={closeWithdrawalFormModal}
        motionPreset="none"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdrawal Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WithdrawalForm />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Withdraw Now Modal */}
      <Modal
        isOpen={withdrawNowModal}
        onClose={closeWithdrawNowModal}
        motionPreset="none"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Now</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WithdrawNow />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default WithdrawalPage;
