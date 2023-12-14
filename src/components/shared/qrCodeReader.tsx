import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrCodeReader = (props:any) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        constraints={
          { facingMode: 'user' }
        }
        onResult={(result:any, error:any) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        // style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};

export default QrCodeReader;