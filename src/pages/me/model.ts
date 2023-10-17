import { useCallback, useState } from 'react';

export default function () {
  const [layoutchgSign, setLayoutchgSign] = useState<string>('');

  const udLayoutchgSign = useCallback((sign: string) => {
    setLayoutchgSign(sign);
  }, []);

  return {
    layoutchgSign,
    udLayoutchgSign,
  };
}
