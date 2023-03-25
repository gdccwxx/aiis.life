import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';
import QYWechat from './qy-wechat.jpg';

type payModalType = {
  isOpen: boolean;
  onClose: () => void;
};

function PaymentPopUp({ isOpen, onClose }: payModalType) {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalBody paddingTop={0}>
          <div className="m-auto mt-[10px] w-[208px]">
            请扫码添加企业微信开通会员
          </div>
          <div className="m-auto h-[200px] w-[200px]">
            <img
              src={QYWechat}
              alt="企业微信"
              className="h-[200px] w-[200px]"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => onClose()}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default React.memo(PaymentPopUp);
