import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import ImageComponent from '@/ui/loadingImage';

type payModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonTitle?: string | undefined;
};

function PaymentPopUp({ isOpen, onOpen, onClose, buttonTitle }: payModalType) {
  return (
    <>
      {buttonTitle ? <Button onClick={onOpen}>{buttonTitle}</Button> : ''}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>付款选项</ModalHeader>
          <ModalBody>
            <p>请选择一个套餐进行付款：</p>
            <div className="flex">
              <ul>
                <li>19.9 一个月</li>
                <li>54 一个季度</li>
                <li>188 一年</li>
              </ul>
              <ImageComponent
                src="https://robohash.org/aboutmydreams@163.com.png"
                alt="example image"
                width="w-48"
                height="h-48"
              />
            </div>
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

export default PaymentPopUp;
