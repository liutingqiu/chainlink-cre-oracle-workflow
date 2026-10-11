import { CREWorkflowConfig, OracleNodeObservation, DONConsensusReport, OnChainSettlementPayload, BlockchainTarget } from '../types.js';
export declare const DEFAULT_WORKFLOW_CONFIG: CREWorkflowConfig;
export declare class CRESettlementWorkflow {
    private config;
    constructor(config?: CREWorkflowConfig);
    getConfig(): CREWorkflowConfig;
    /**
     * Step 1: Query external multi-source APIs and Pyth/Chainlink Data Feeds.
     */
    executeNodeObservation(nodeId: string, marketId: string, targetPriceUSD: number): Promise<OracleNodeObservation>;
    /**
     * Step 2: DON Consensus Aggregation
     * Aggregates observations across decentralized oracle network nodes and verifies quorum.
     */
    aggregateConsensus(observations: OracleNodeObservation[]): DONConsensusReport;
    /**
     * Step 3: On-Chain Settlement Payload Construction
     * Generates institutional-grade calldata payload for execution on target chain.
     */
    buildSettlementPayload(report: DONConsensusReport, targetChain?: BlockchainTarget, contractAddress?: string): OnChainSettlementPayload;
}
