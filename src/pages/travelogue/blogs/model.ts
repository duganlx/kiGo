import { CatalogItem } from '@/services/github';
import { useCallback, useState } from 'react';

export default function () {
  const [accatalog, setAccatalog] = useState<CatalogItem | null>(null);

  const udAccatalog = useCallback((cl: CatalogItem) => {
    setAccatalog(cl);
  }, []);

  return {
    accatalog,
    udAccatalog,
  };
}
