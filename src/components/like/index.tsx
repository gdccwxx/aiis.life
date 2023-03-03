import { FC, useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './like.json'; // Lottie 动效文件 https://lottiefiles.com/88788-like-icon
import toast from '@/ui/toast/toast';
import request from '@/utils/request';
import { getCookie } from '@/utils/cookie';

export const LikeCell: FC<{ liked: boolean; role: string; roleId: number }> = ({
  liked,
  role,
  roleId
}) => {
  const [like, setLike] = useState(liked ?? false);

  useEffect(() => {
    initSeek();
  }, [liked]);

  const initSeek = () => {
    if (animationRef.current) {
      animationRef.current.setSeeker(liked ? animationData.op - 1 : 0);
    }
  };

  const animationRef = useRef<Player>(null);

  const playLike = (likeIt: boolean) => {
    if (animationRef.current) {
      animationRef.current.setPlayerDirection(likeIt ? 1 : -1);
      if (likeIt) {
        animationRef.current.setPlayerSpeed(1.1);
        animationRef.current.setSeeker(1);
        animationRef.current.play();
        setTimeout(() => {
          animationRef.current?.pause();
        }, 1500);
      } else {
        animationRef.current.setPlayerSpeed(1.6);
        animationRef.current.setSeeker(animationData.op - 30);
        animationRef.current.play();
      }
    }
  };

  // 点赞或取消点赞
  const toggleLike = async () => {
    // 发送请求给 API
    const newStatus = !like;
    setLike(newStatus);
    playLike(newStatus);
    sendLikeRequest(newStatus);
  };

  const sendLikeRequest = async (likeIt: boolean) => {
    if (!(getCookie('role') && getCookie('roleId'))) {
      toast.warning('please login first');
      return;
    } else if (likeIt) {
      await request(`/api/be/like`, {
        method: 'POST',
        body: {
          role: getCookie('role') || '',
          roleId: +(getCookie('roleId') || 0),
          target: {
            role: role,
            roleId: roleId
          }
        }
      }).catch((e: Response) => {
        // 如果请求失败，则重新渲染动效回到之前的状态
        setTimeout(() => {
          toast.warning(e.status.toString());
          playLike(!likeIt);
        }, 3000);
      });
    } else {
      await request(`/api/be/like`, {
        method: 'DELETE',
        body: {
          role: getCookie('role') || '',
          roleId: +(getCookie('roleId') || 0),
          target: {
            role: role,
            roleId: roleId
          }
        }
      }).catch((e: Response) => {
        // 如果请求失败，则重新渲染动效回到之前的状态
        setTimeout(() => {
          toast.warning(e.status.toString());
          playLike(!likeIt);
        }, 3000);
      });
    }
  };

  return (
    <div
      onClick={toggleLike}
      className="rounded-full bg-white"
      style={{ height: '44px', width: '44px' }}
    >
      {/* 渲染 Lottie 动效 */}
      <Player
        ref={animationRef}
        autoplay={false}
        loop={false}
        src={animationData}
        style={{ height: '44px', width: '44px' }}
      ></Player>
    </div>
  );
};
