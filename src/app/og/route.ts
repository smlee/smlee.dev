import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET() {
  const title = 'smlee.dev';
  const element = React.createElement(
    'div',
    {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'black',
        fontSize: 64,
        fontWeight: 700,
      },
    },
    title
  );
  return new ImageResponse(element, { width: 1200, height: 630 });
}
