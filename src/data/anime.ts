/**
 * 追番录数据 —— 记录看过的/在追的番剧
 * rating 为 1~5 星；emoji 会作为卡片封面占位图案
 */
export interface AnimeItem {
  title: string;
  /** 播出季度，如 2026 夏 */
  year: string;
  /** 观看进度 */
  progress: string;
  /** 评分 1~5 */
  rating: number;
  /** 一句话感想 */
  comment: string;
  /** 相关链接（如 Bangumi 条目） */
  link?: string;
  /** 封面占位 emoji */
  emoji?: string;
}

export const animeList: AnimeItem[] = [
  {
    title: '葬送的芙莉莲',
    year: '2023 秋',
    progress: '二刷完',
    rating: 5,
    comment:
      '勇者传说结束之后的故事，像一首长长的散文诗。看完只想说：时间原来是有味道的。',
    emoji: '⚔️',
  },
  {
    title: '孤独摇滚！',
    year: '2022 秋',
    progress: '全剧 + 剧场版',
    rating: 5,
    comment: '社恐人的摇滚赞歌！live 部分的演出力直接封神，吉他英雄波奇酱我永远的宝。',
    emoji: '🎸',
  },
  {
    title: '紫罗兰永恒花园',
    year: '2018 冬',
    progress: '全剧 + 外传',
    rating: 5,
    comment: '京阿尼的画面每一帧都能当壁纸，「爱のletter」一集哭一包纸巾。',
    emoji: '💌',
  },
  {
    title: '间谍过家家 第三季',
    year: '2026 春',
    progress: '追更中',
    rating: 4,
    comment: '阿尼亚 wakuwaku！一家人整整齐齐的日常真的百看不厌。',
    emoji: '🥜',
  },
  {
    title: '药屋少女的呢喃',
    year: '2023 秋',
    progress: '看到 S2 中期',
    rating: 4,
    comment: '宫廷 + 药理 + 推理的组合意外上头，猫猫聪明的样子太可爱了。',
    emoji: '🌿',
  },
  {
    title: '夏日口袋 / Summer Pockets',
    year: '2025 春',
    progress: '已完结',
    rating: 4,
    comment: '海岛、蝉鸣与鸟白岛的秘密，key 社的催泪弹一如既往，OP 循环了一整个夏天。',
    emoji: '🌊',
  },
];
