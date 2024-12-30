import { useAccount, useWriteContract, useReadContract } from "wagmi";
import {
  CONTRACT_ADDRESSES,
  RADISH_CORE_ABI,
  PREDICTION_MARKET_ABI,
  OPTIMISM_SEPOLIA_CHAIN_ID,
} from "@/config/contracts";
import { readContract } from "@wagmi/core";

import { request, gql } from "graphql-request";
import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export interface Market {
  id: string;
  title: string;
  description?: string;
  endDate: string;
  creatorHandle?: string;
  platform?: "youtube" | "twitter" | "tiktok" | "instagram";
  metric?: "followers" | "subscribers" | "views" | "likes";
  target?: number;
  currentMetric?: number;
  yesPrice: number;
  noPrice: number;
  liquidity: number;
  volume24h: number;
  isOnChain: boolean;
  contractAddress?: string;
}

// Mock data for demo purposes
export const mockMarkets: Market[] = [
  {
    id: "mock-1",
    title: "Will MrBeast reach 200M YouTube subscribers by March 2024?",
    description:
      "Prediction market for MrBeast's YouTube channel reaching 200M subscribers",
    endDate: "2024-03-31",
    creatorHandle: "@mrbeast",
    platform: "youtube",
    metric: "subscribers",
    target: 200000000,
    currentMetric: 187000000,
    yesPrice: 0.65,
    noPrice: 0.35,
    liquidity: 250000,
    volume24h: 45000,
    isOnChain: false,
  },
  {
    id: "mock-2",
    title: "Will Elon Musk reach 170M Twitter followers by Q2 2024?",
    description: "Market predicting Elon Musk's Twitter follower growth",
    endDate: "2024-06-30",
    creatorHandle: "@elonmusk",
    platform: "twitter",
    metric: "followers",
    target: 170000000,
    currentMetric: 165000000,
    yesPrice: 0.72,
    noPrice: 0.28,
    liquidity: 180000,
    volume24h: 32000,
    isOnChain: false,
  },
  {
    id: "mock-3",
    title: "Will Khaby Lame hit 200M TikTok followers by May 2024?",
    description: "Prediction market for Khaby Lame's TikTok follower growth",
    endDate: "2024-05-31",
    creatorHandle: "@khabylame",
    platform: "tiktok",
    metric: "followers",
    target: 200000000,
    currentMetric: 162000000,
    yesPrice: 0.45,
    noPrice: 0.55,
    liquidity: 120000,
    volume24h: 28000,
    isOnChain: false,
  },
];

export function useMarkets() {
  const { address } = useAccount();
  const [markets, setMarkets] = useState<Market[]>(mockMarkets); // Start with mock markets
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: marketCount } = useReadContract({
    address: CONTRACT_ADDRESSES[OPTIMISM_SEPOLIA_CHAIN_ID].radishCore,
    abi: RADISH_CORE_ABI,
    functionName: "marketCount",
    chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
  });

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);

      try {
        // Fetch GraphQL data
        const query = `query getMarkets {
          markets {
            id
            creator
            endTime
            marketContract
            question
            resolved
            totalNo
            totalPriceToken
            totalStaked
            totalYes
            won
          }
        }`;

        const data: any = await request(
          "https://api.studio.thegraph.com/query/73364/radish/version/latest",
          query
        );

        const marketsFromGraph = await Promise.all(
          data.markets.map(async (m: any) => {
            try {
              // Fetch yesPrice and noPrice using readContract
              const yesPrice = await readContract(config, {
                address: m.marketContract,
                abi: PREDICTION_MARKET_ABI,
                functionName: "getTokenPrice",
                chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
                args: [true],
              });

              const noPrice = await readContract(config, {
                address: m.marketContract,
                abi: PREDICTION_MARKET_ABI,
                functionName: "getTokenPrice",
                chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
                args: [false],
              });

              return {
                id: m.id,
                title: m.question,
                endDate: m.endTime,
                creatorHandle: m.creator,
                platform: "twitter", // Adjust platform if available
                metric: "followers", // Adjust metric if available
                yesPrice: Number(yesPrice) / 1e18,
                noPrice: Number(noPrice) / 1e18,
                liquidity: m.totalStaked,
                volume24h: m.totalStaked, // Example value
                isOnChain: true,
                contractAddress: m.marketContract,
              } as Market;
            } catch (err) {
              console.error("Error reading contract:", err);
              return null;
            }
          })
        );

        // Filter out null results and merge with mock markets
        const validMarkets = marketsFromGraph.filter((m) => m !== null);
        setMarkets([...mockMarkets, ...validMarkets]);
      } catch (err) {
        console.error("Error fetching markets:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  return {
    markets,
    isLoading: isLoading,
    error: error,
  };
}

export function useCreateMarket() {
  const {
    writeContractAsync,
    isPending: isLoading,
    error,
  } = useWriteContract();

  const createMarket = async (question: string, endDate: string) => {
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);
    await writeContractAsync({
      abi: RADISH_CORE_ABI,
      address: CONTRACT_ADDRESSES[OPTIMISM_SEPOLIA_CHAIN_ID].radishCore,
      functionName: "createMarket",
      chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
      args: [question, BigInt(endTimestamp)],
    });
  };

  return {
    createMarket,
    isLoading,
    error,
  };
}

export function useMarket(marketId: string) {
  const [markets, setMarkets] = useState<Market[]>(mockMarkets); // Start with mock markets
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // For mock markets, return mock data
  if (marketId.startsWith("mock-")) {
    const mockMarket = mockMarkets.find((m) => m.id === marketId);
    return {
      market: mockMarket,
      isLoading: false,
      error: null,
    };
  }

  // For real markets, fetch from chain

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);

      try {
        // Fetch GraphQL data
        const query = `query getMarkets {
          markets {
            id
            creator
            endTime
            marketContract
            question
            resolved
            totalNo
            totalPriceToken
            totalStaked
            totalYes
            won
          }
        }`;

        const data: any = await request(
          "https://api.studio.thegraph.com/query/73364/radish/version/latest",
          query
        );

        const marketsFromGraph = await Promise.all(
          data.markets.map(async (m: any) => {
            try {
              // Fetch yesPrice and noPrice using readContract
              const yesPrice = await readContract(config, {
                address: m.marketContract,
                abi: PREDICTION_MARKET_ABI,
                functionName: "getTokenPrice",
                chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
                args: [true],
              });

              const noPrice = await readContract(config, {
                address: m.marketContract,
                abi: PREDICTION_MARKET_ABI,
                functionName: "getTokenPrice",
                chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
                args: [false],
              });

              return {
                id: m.id,
                title: m.question,
                endDate: m.endTime,
                creatorHandle: m.creator,
                platform: "twitter", // Adjust platform if available
                metric: "followers", // Adjust metric if available
                yesPrice: Number(yesPrice) / 1e18,
                noPrice: Number(noPrice) / 1e18,
                liquidity: m.totalStaked,
                volume24h: m.totalStaked, // Example value
                isOnChain: true,
                contractAddress: m.marketContract,
              } as Market;
            } catch (err) {
              console.error("Error reading contract:", err);
              return null;
            }
          })
        );

        // Filter out null results and merge with mock markets
        const validMarkets = marketsFromGraph.filter((m) => m !== null);
        setMarkets([...mockMarkets, ...validMarkets]);
      } catch (err) {
        console.error("Error fetching markets:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  // This is a placeholder - in a real app, you'd implement proper fetching
  return {
    market: markets.find((m) => m.id === marketId),
    isLoading: isLoading,
    error: error,
  };
}

export function useMarketActions(marketId: string) {
  const { address } = useAccount();

  // For real markets, implement contract interactions
  const {
    writeContractAsync: buyAsync,
    isPending: buyIsPending,
    error: buyError,
  } = useWriteContract();
  const {
    writeContractAsync: sellAsync,
    isPending: sellIsPending,
    error: sellError,
  } = useWriteContract();

  // For mock markets, return mock actions
  if (marketId.startsWith("mock-")) {
    return {
      buy: async (isYes: boolean, amount: number) => {
        console.log("Mock buy:", { isYes, amount });
      },
      sell: async (isYes: boolean, amount: number) => {
        console.log("Mock sell:", { isYes, amount });
      },
      isLoading: false,
      error: null,
    };
  }

  return {
    buy: async (isYes: boolean, amount: number, address: `0x${string}`) => {
      console.log("Buy:", { isYes, amount, address });
      await buyAsync({
        address: address,
        abi: PREDICTION_MARKET_ABI,
        functionName: "buy",
        chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
        args: [isYes, BigInt(amount * 1e18)],
      });
    },
    sell: async (isYes: boolean, amount: number, address: `0x${string}`) => {
      await sellAsync({
        address: address,
        abi: PREDICTION_MARKET_ABI,
        functionName: "sell",
        chainId: OPTIMISM_SEPOLIA_CHAIN_ID,
        args: [isYes, BigInt(amount * 1e18)],
      });
    },
    isLoading: buyIsPending || sellIsPending,
    error: buyError || sellError,
  };
}
