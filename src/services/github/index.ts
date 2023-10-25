import { message } from 'antd';
import dayjs from 'dayjs';
import { Octokit } from 'octokit';

export type CatalogItem = {
  id: number;
  title: string;
  tags: string[];
  dir: string;
  createTime: string;
  updateTime: string;
  publish: boolean;
};

function sortCatalogItems(items: CatalogItem[]) {
  // 升序 [oldest, ..., latest]
  const dateMap: Record<string, CatalogItem[]> = {};

  items.forEach((item) => {
    if (dateMap[item.updateTime] === undefined) {
      dateMap[item.updateTime] = [];
    }

    dateMap[item.updateTime].push(item);
  });

  const sortedKey = Object.keys(dateMap).sort((a, b) => {
    const adateunix = dayjs(a, 'YYYY-MM-DD').unix();
    const bdateunix = dayjs(b, 'YYYY-MM-DD').unix();

    return adateunix - bdateunix;
  });

  const sortedItems: CatalogItem[] = [];

  sortedKey.forEach((key) => {
    const cts = dateMap[key];
    sortedItems.push(...cts);
  });

  return sortedItems;
}

export async function GetBlogsCatalog() {
  const octokit = new Octokit({});

  return octokit
    .request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'duganlx',
      repo: 'datahub',
      path: 'blogs/catalog.json',
    })
    .then((res) => {
      if (res.status !== 200) {
        message.info('获取目录数据失败');
        return;
      }

      const base64_str = (res.data as { content: string | undefined }).content || '';
      const decoded_content = Buffer.from(base64_str, 'base64').toString();
      const catalogjson = JSON.parse(decoded_content);
      const procItems = sortCatalogItems(catalogjson);

      return procItems;
    });
}
