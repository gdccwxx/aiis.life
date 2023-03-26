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
    <Modal isOpen={isOpen} onClose={() => onClose()} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody paddingTop={'20px'}>
          <div
            style={{
              color: 'rgb(0, 0, 0)',
              // fontFamily: 'Poppins',
              fontSize: '30px',
              fontWeight: 700,
              textAlign: 'left'
            }}
          >
            请选择您的会员方案
          </div>
          <div
            style={{
              color: 'rgba(0, 0, 0, 0.7)',
              fontSize: '16px',
              fontWeight: '400',
              textAlign: 'left',
              paddingTop: '12px'
            }}
          >
            无穷AI仅VIP可使用
            <br />
            选择不同的会员方案，享受最高30%的折扣
          </div>
          <div className="mt-[10px] flex h-[267px] w-full flex-row">
            <div className="flex w-[350px] flex-col">
              <div className="mb-[20px] w-full rounded-lg border border-slate-600 p-[12px]">
                <div className="text-base font-medium text-black">每月</div>
                <div className="text-base text-slate-600">
                  ￥20/月 <span className="ml-[20px]">包含200次请求</span>
                </div>
              </div>
              <div className="mb-[20px] w-full rounded-lg	border border-slate-600 p-[12px]">
                <div className="text-base font-medium text-black">每年</div>
                <div className="text-base text-slate-600">
                  ￥200 / 年 (便宜30%)
                  <span className="ml-[20px]">包含2400次请求</span>
                </div>
              </div>
              <div className="mb-[20px] w-full rounded-lg	border border-slate-600 p-[12px]">
                <div className="text-base font-medium text-black">每月</div>
                <div className="text-base text-slate-600">
                  加量包（仅会员可购买）
                  <span className="ml-[20px]">包含220次请求</span>
                </div>
              </div>
            </div>
            <div className="ml-[20px] h-[260px] w-[260px] border border-slate-600">
              <img src={QYWechat} alt="企业微信" className="h-full w-full" />
            </div>
          </div>
          <div className="m-auto mt-[20px] h-[50px] w-full text-center text-2xl	">
            添加微信，发送登录和希望购买的套餐，立即开通VIP
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
