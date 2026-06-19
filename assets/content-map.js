// assets/content-map.js

const siteConfig = {
  baseUrl: "https://appsite-i-game.com.cn",
  primaryKeyword: "爱游戏",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["游戏", "爱游戏", "推荐"],
    description: "平台首页展示热门游戏与推荐内容"
  },
  {
    id: "news",
    title: "新闻",
    tags: ["爱游戏", "更新", "公告"],
    description: "最新游戏资讯与版本更新"
  },
  {
    id: "guides",
    title: "攻略",
    tags: ["攻略", "爱游戏", "技巧"],
    description: "提供游戏攻略与玩法技巧"
  },
  {
    id: "download",
    title: "下载",
    tags: ["下载", "爱游戏", "客户端"],
    description: "游戏客户端下载与安装说明"
  }
];

const keywordIndex = {
  "爱游戏": ["home", "news", "guides", "download"],
  "游戏": ["home", "news"],
  "攻略": ["guides"],
  "下载": ["download"],
  "更新": ["news"],
  "技巧": ["guides"],
  "推荐": ["home"],
  "公告": ["news"],
  "客户端": ["download"]
};

/**
 * 根据关键词匹配内容分区
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配到的分区对象数组
 */
function searchSectionsByKeyword(keyword) {
  const normalized = keyword.trim().toLowerCase();
  const matchedIds = keywordIndex[normalized] || [];

  return contentSections.filter(section =>
    matchedIds.includes(section.id) ||
    section.tags.some(tag => tag.toLowerCase().includes(normalized)) ||
    section.title.toLowerCase().includes(normalized)
  );
}

/**
 * 获取所有分区标题与标签的摘要列表
 * @returns {Array} 包含id、标题和标签的数组
 */
function getSectionSummaries() {
  return contentSections.map(section => ({
    id: section.id,
    title: section.title,
    tags: section.tags
  }));
}

/**
 * 对搜索结果进行简单排序：优先匹配标题和标签
 * @param {Array} results - 搜索结果数组
 * @param {string} keyword - 原始关键词
 * @returns {Array} 排序后的结果
 */
function sortSearchResults(results, keyword) {
  const kw = keyword.toLowerCase();
  return results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(kw) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(kw) ? 1 : 0;
    const aTag = a.tags.some(t => t.toLowerCase().includes(kw)) ? 1 : 0;
    const bTag = b.tags.some(t => t.toLowerCase().includes(kw)) ? 1 : 0;
    return (bTitle + bTag) - (aTitle + aTag);
  });
}

// 导出供模块化使用（适用于支持ES Module的环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    keywordIndex,
    searchSectionsByKeyword,
    getSectionSummaries,
    sortSearchResults
  };
}