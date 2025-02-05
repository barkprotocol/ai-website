export interface Suggestion {
  id: string;
  title: string;
  subtitle: string;
}

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 'launch-token',
    title: 'Launch a new token',
    subtitle: 'Deploy a new token on pump.fun',
  },
  {
    id: 'swap-sol-usdc',
    title: 'Swap 1 SOL for USDC',
    subtitle: 'Using Jupiter to swap on Solana',
  },
  {
    id: 'solana-trends',
    title: "What's trending on Solana?",
    subtitle: 'Find the current market trends',
  },
  {
    id: 'price-feed',
    title: "What's the price of SOL?",
    subtitle: 'Find the current price of SOL',
  },
  {
    id: 'top-gainers-last-24h',
    title: 'Top gainers in the last 24h',
    subtitle: 'Find the top gainers in the last 24 hours',
  },
  {
    id: 'check-my-wallet',
    title: 'Check my wallet',
    subtitle: 'Check the portfolio of your wallet',
  },
  {
    id: 'bark-token',
    title: 'Get $BARK Token',
    subtitle: 'Acquire and stake $BARK token for rewards and access',
  },
  {
    id: 'charity-support',
    title: 'Support Charity via NFT',
    subtitle: 'Use your NFTs to contribute to charitable causes',
  },
  {
    id: 'nft-collections',
    title: 'Explore NFT Collections',
    subtitle: 'Browse exclusive and limited-edition NFT collections on Solana',
  },
  {
    id: 'solana-blinks',
    title: 'Create and Share Solana Blinks',
    subtitle: 'Utilize the Solana blockchain for interactive NFT experiences',
  },
  {
    id: 'swap-sol-to-bark',
    title: 'Swap SOL for $BARK',
    subtitle: 'Swap your SOL for $BARK to stake and earn rewards',
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  // Ensure we don't request more items than available
  const safeCount = Math.min(count, SUGGESTIONS.length);
  const startIndex = Math.floor(Date.now() / 1000) % SUGGESTIONS.length;

  // Create a rotated copy of the array starting from startIndex
  const rotatedSuggestions = [
    ...SUGGESTIONS.slice(startIndex),
    ...SUGGESTIONS.slice(0, startIndex),
  ];

  // Return only the first safeCount items
  return rotatedSuggestions.slice(0, safeCount);
}