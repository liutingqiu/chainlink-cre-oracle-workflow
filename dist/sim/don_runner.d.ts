import { CRESettlementWorkflow } from '../workflow/settlement.js';
import { OnChainSettlementPayload, DONConsensusReport } from '../types.js';
export interface SimulationResult {
    workflowId: string;
    donNodesTested: number;
    quorumSatisfied: boolean;
    consensusOutcome: string;
    consensusPriceUSD: number;
    executionDurationMs: number;
    report: DONConsensusReport;
    onChainPayload: OnChainSettlementPayload;
}
export declare class CRESnapshotRunner {
    private workflow;
    constructor(workflow?: CRESettlementWorkflow);
    /**
     * Simulates full end-to-end CRE Workflow execution across a Decentralized Oracle Network.
     */
    runSimulation(marketId: string, truePriceUSD: number, simulateFaultyNode?: boolean): Promise<SimulationResult>;
}
