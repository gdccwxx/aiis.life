import React, { useEffect, useRef, useState } from 'react';
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
import { apiPayCodeGet } from '@/apis/pay';
import toast from '@/ui/toast/toast';
import { apiMeGet } from '@/apis/login';
import { getCookie } from '@/utils/cookie';

type payModalType = {
  isOpen: boolean;
  onClose: () => void;
};

function PaymentPopUp({ isOpen, onClose }: payModalType) {
  const theme = localStorage.getItem('theme');
  const bgColor = theme === 'light' ? 'gray.200' : 'gray.700';
  const btnColor = theme === 'light' ? 'gray.300' : 'gray.600';
  const textColor = theme === 'light' ? 'gray.700' : 'gray.300';

  const [payCodeUrl, setPayCodeUrl] = useState<string | undefined>(undefined);
  const [callTimes, setCallTimes] = useState<number>(0);
  const [isClose, setIsClose] = useState<boolean>(false);

  const pollInterval = useRef<any>(null);

  useEffect(() => {
    if (isOpen && !isClose) {
      setCallTimes(0); // Reset the call time
      pollInterval.current = setInterval(() => {
        // TODO: 发起api请求
        pollPay();
      }, 3000);
    } else if (isOpen) {
      // 第一次打开关闭后 isClose 是 false, 第二次打开 需要设置成 false
      clearInterval(pollInterval.current);
      setIsClose(false);
    } else {
      clearInterval(pollInterval.current);
    }
  }, [isOpen, isClose]);

  useEffect(() => {
    if (isOpen) getCode();
  }, []);

  const getCode = async () => {
    const res = await apiPayCodeGet();
    if (res.data.qrcode === 'error') {
      toast.warning('为了保证安全，本次支付需要请重新登录');
      const currentUrl = window.location.href;
      window.location.replace(
        `/login?redirectUrl=${encodeURIComponent(currentUrl)}`
      );
    } else if (isOpen && !isClose) {
      setPayCodeUrl(res.data.qrcode);
    }
  };

  const callStopOnClose = () => {
    setIsClose(true);
    setTimeout(() => onClose(), 20);
  };

  const pollPay = async () => {
    if (isClose) return false;
    const ifPaySuccess = await apiMeGet().then((res) => {
      const paySuccess = getCookie('lastPaidAt') !== res.data.last_paid_at;
      if (paySuccess) {
        // 如果支付成功直接返回结果
        toast.success('支付成功');
        return paySuccess;
      } else {
        // 如果未支付成功，则继续轮询
        setCallTimes((prevCount) => prevCount + 1);
        if (isClose) return false;
      }
    });
    if (ifPaySuccess) {
      return true;
    } else if (!ifPaySuccess && !isClose) {
      if (callTimes > 90) {
        toast.warning('支付超时');
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={callStopOnClose} size="xl">
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
              onClick={callStopOnClose}
              size="sm"
              border="none"
            />
          </ModalHeader>
          <ModalBody paddingTop={0}>
            {/* 套餐包 */}
            <PayPackage payCodeUrl={payCodeUrl} />
          </ModalBody>
          <ModalFooter>
            <Button
              className="mr-3"
              colorScheme="blue"
              onClick={() =>
                window.open('https://github.com/aiis-life/chat-api')
              }
            >
              企业服务
            </Button>
            <div className="grow"></div>
            <Button colorScheme="blue" onClick={callStopOnClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(PaymentPopUp);
