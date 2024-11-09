'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import style from './Upload.module.scss';
import Button from '../common/button/Button';

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const { clipRQId } = useParams();

  // 클릭 핸들러
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소 클릭
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 최대 9개까지만 추가
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews((prev) => {
        const combinedPreviews = [...prev, ...newPreviews];
        return combinedPreviews.slice(0, 9); // 최대 9개까지만 유지
      });
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = async () => {
    const formData = new FormData();

    // previews 배열을 순회하며 blob: URL을 fetch로 변환 후 FormData에 추가
    await Promise.all(
      previews.map(async (preview, index) => {
        const response = await fetch(preview); // blob: URL로부터 Blob 가져오기
        const blob = await response.blob();
        const file = new File([blob], `image${index}.png`, { type: blob.type }); // Blob을 File로 변환
        formData.append('files', file); // FormData에 추가
      }),
    );

    // // FormData에 추가된 파일 확인
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    // //[todo] 입주민 이미지 업로드 api 호출 로직 작성
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/picture/upload?clipRQId=${clipRQId}`,
    //   {
    //     method: 'POST',
    //     body: formData, // FormData 객체를 사용합니다.
    //   },
    // );
    // const data = await response.json();
    console.log(previews);
  };

  return (
    <div className={style.uploadContainer}>
      <div className={style.previews}>
        {previews.map((preview, index) => (
          <div key={index} className={style.previewWrapper}>
            <img
              src={preview}
              alt={`Preview ${index}`}
              className={style.previewImage}
            />
            <div
              className={style.deleteButton}
              onClick={() => handleRemoveImage(index)}
            >
              x
            </div>
          </div>
        ))}
        {previews.length < 9 && ( // 9개 미만일 때만 업로드 버튼 표시
          <div
            className={previews.length === 0 ? style.upload : style.uploadSmall}
            onClick={handleClick}
          >
            <img
              src="/icons/camera.png"
              alt="Upload"
              className={style.uploadIcon}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: 'none' }} // 파일 입력 요소 숨기기
        onChange={handleFileChange}
      />
      <div className={style.button}>
        <Button
          size="appBig"
          color={previews.length >= 5 ? 'blue' : 'gray'}
          onClick={handleUploadClick}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
