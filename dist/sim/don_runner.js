// SPDX-License-Identifier: MIT
import { CRESettlementWorkflow } from '../workflow/settlement.js';
export class CRESnapshotRunner {
    workflow;
    constructor(workflow) {
        this.workflow = workflow ?? new CRESettlementWorkflow();
    }
    /**
     * Simulates full end-to-end CRE Workflow execution across a Decentralized Oracle Network.
     */
    async runSimulation(marketId, truePriceUSD, simulateFaultyNode = false) {
        const startTime = Date.now();
        const config = this.workflow.getConfig();
        const nodeCount = config.donConfig.totalNodes;
        const observations = [];
        for (let i = 1; i <= nodeCount; i++) {
            const nodeId = `don_node_0${i}`;
            // If simulateFaultyNode, node 4 reports a divergent price/outcome
            const priceForNode = (simulateFaultyNode && i === 4) ? 400.0 : truePriceUSD;
            const obs = await this.workflow.executeNodeObservation(nodeId, marketId, priceForNode);
            observations.push(obs);
        }
        const report = this.workflow.aggregateConsensus(observations);
        const onChainPayload = this.workflow.buildSettlementPayload(report, 'Solana', 'PantaSettlement111111111111111111111111111111');
        const executionDurationMs = Date.now() - startTime;
        return {
            workflowId: config.workflowId,
            donNodesTested: nodeCount,
            quorumSatisfied: report.quorumReached,
            consensusOutcome: report.consensusOutcome,
            consensusPriceUSD: report.consensusValueUSD,
            executionDurationMs: Math.max(12, executionDurationMs),
            report,
            onChainPayload
        };
    }
}
