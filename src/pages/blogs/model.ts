import { useCallback, useState } from 'react';

export type CatalogItem = {
  id: number;
  title: string;
  tags: string[];
  dir: string;
  createTime: string;
  updateTime: string;
};

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
