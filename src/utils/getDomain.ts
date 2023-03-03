export function extractDomains(text: string): string[] {
  // 正则表达式匹配所有链接
  const regex = /https?:\/\/([\w\d.-]+\.[\w]+)/gi;
  const matches = text.matchAll(regex);

  // 提取链接中的域名
  const domains = new Set<string>();
  for (const match of matches) {
    const [, domain] = match;
    domains.add(domain);
  }

  return [...domains];
}
