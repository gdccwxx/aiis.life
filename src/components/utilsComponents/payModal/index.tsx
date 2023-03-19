import React from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import PayPackage from './package';

type payModalType = {
  isOpen: boolean;
  onClose: () => void;
};

function PaymentPopUp({ isOpen, onClose }: payModalType) {
  const theme = localStorage.getItem('theme');
  const bgColor = theme === 'light' ? 'gray.200' : 'gray.700';
  const btnColor = theme === 'light' ? 'gray.300' : 'gray.600';
  const textColor = theme === 'light' ? 'gray.700' : 'gray.300';

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={bgColor} color={textColor}>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            套餐选项
            <IconButton
              aria-label="关闭"
              bg={btnColor}
              _hover={{
                bg: theme === 'light' ? 'gray.100' : 'blue.500',
                transition: 'background-color 0.3s ease-out'
              }}
              icon={<FaTimes />}
              onClick={onClose}
              size="sm"
              border="none"
            />
          </ModalHeader>
          <ModalBody paddingTop={0}>
            {/* 套餐包 */}
            <PayPackage />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(PaymentPopUp);
