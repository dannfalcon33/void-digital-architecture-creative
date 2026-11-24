import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060606',
          border: '4px solid rgba(245, 244, 240, 0.14)',
        }}
      >
        <div
          style={{
            width: 78,
            height: 78,
            backgroundColor: '#FF4D2E',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
