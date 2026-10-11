// SPDX-License-Identifier: MIT

export type TriggerType = 'CRON_SCHEDULE' | 'ON_CHAIN_EVENT' | 'HTTP_WEBHOOK';
export type BlockchainTarget = 'Ethereum' | 'Solana' | 'Arbitrum' | 'Base';
export type MarketOutcome = 'YES' | 'NO' | 'INVALID';

export interface CREWorkflowConfig {
  workflowId: string;
  name: string;
  version: string;
  trigger: {
    type: TriggerType;
    cronSchedule?: string; // e.g. "0 */4 * * *"
    sourceEventTopic?: string;
  };
  donConfig: {
    minQuorumNodes: number;    // e.g. 3 of 4 nodes
    totalNodes: number;
    donNetworkId: string;
  };
}

export interface OracleNodeObservation {
  nodeId: string;
  marketId: string;
  observedData: {
    rawOutcome: MarketOutcome;
    settlementValueUSD: number;
    sourceTimestamp: number;
    dataSource: string;
  };
  nodeSignature: string;
}

export interface DONConsensusReport {
  workflowExecutionId: string;
  timestamp: number;
  marketId: string;
  consensusOutcome: MarketOutcome;
  consensusValueUSD: number;
  participatingNodes: string[];
  quorumReached: boolean;
  aggregatedSignature: string;
}

export interface OnChainSettlementPayload {
  targetChain: BlockchainTarget;
  contractAddress: string;
  marketId: string;
  outcome: MarketOutcome;
  settlementTimestamp: number;
  attestationHash: string;
  calldataHex: string;
}
