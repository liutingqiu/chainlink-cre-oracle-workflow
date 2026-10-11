// SPDX-License-Identifier: MIT
import test from 'node:test';
import assert from 'node:assert/strict';
import { CRESettlementWorkflow, CRESnapshotRunner, DEFAULT_WORKFLOW_CONFIG } from '../dist/index.js';

test('1. CRESettlementWorkflow initializes with institutional DON configuration', () => {
  const wf = new CRESettlementWorkflow();
  const cfg = wf.getConfig();

  assert.equal(cfg.workflowId, 'wf_cre_prediction_settlement_v1');
  assert.equal(cfg.donConfig.minQuorumNodes, 3);
  assert.equal(cfg.donConfig.totalNodes, 4);
  assert.equal(cfg.trigger.type, 'CRON_SCHEDULE');
});

test('2. executeNodeObservation produces signed oracle node observation', async () => {
  const wf = new CRESettlementWorkflow();
  const obs = await wf.executeNodeObservation('don_node_01', 'mkt_sol_500', 520.0);

  assert.equal(obs.nodeId, 'don_node_01');
  assert.equal(obs.marketId, 'mkt_sol_500');
  assert.equal(obs.observedData.rawOutcome, 'YES');
  assert.equal(obs.observedData.settlementValueUSD, 520.0);
  assert.ok(obs.nodeSignature.startsWith('sig_don_node_'));
});

test('3. aggregateConsensus reaches quorum with 4 unanimous nodes', async () => {
  const wf = new CRESettlementWorkflow();
  const observations = [
    await wf.executeNodeObservation('don_node_01', 'mkt_sol_500', 525.0),
    await wf.executeNodeObservation('don_node_02', 'mkt_sol_500', 524.5),
    await wf.executeNodeObservation('don_node_03', 'mkt_sol_500', 525.5),
    await wf.executeNodeObservation('don_node_04', 'mkt_sol_500', 525.0)
  ];

  const report = wf.aggregateConsensus(observations);
  assert.equal(report.quorumReached, true);
  assert.equal(report.consensusOutcome, 'YES');
  assert.equal(report.participatingNodes.length, 4);
  assert.equal(report.consensusValueUSD, 525.0);
});

test('4. aggregateConsensus tolerates 1 Byzantine/outlier node and preserves 3/4 quorum', async () => {
  const wf = new CRESettlementWorkflow();
  const observations = [
    await wf.executeNodeObservation('don_node_01', 'mkt_sol_500', 525.0), // YES
    await wf.executeNodeObservation('don_node_02', 'mkt_sol_500', 525.0), // YES
    await wf.executeNodeObservation('don_node_03', 'mkt_sol_500', 525.0), // YES
    await wf.executeNodeObservation('don_node_04', 'mkt_sol_500', 450.0)  // NO (outlier)
  ];

  const report = wf.aggregateConsensus(observations);
  assert.equal(report.quorumReached, true);
  assert.equal(report.consensusOutcome, 'YES');
});

test('5. buildSettlementPayload constructs target calldata and attestation hash', async () => {
  const wf = new CRESettlementWorkflow();
  const observations = [
    await wf.executeNodeObservation('don_node_01', 'mkt_sol_500', 525.0),
    await wf.executeNodeObservation('don_node_02', 'mkt_sol_500', 525.0),
    await wf.executeNodeObservation('don_node_03', 'mkt_sol_500', 525.0)
  ];

  const report = wf.aggregateConsensus(observations);
  const payload = wf.buildSettlementPayload(report, 'Solana', 'PantaSettlementContract');

  assert.equal(payload.targetChain, 'Solana');
  assert.equal(payload.outcome, 'YES');
  assert.ok(payload.attestationHash.startsWith('0x'));
  assert.ok(payload.calldataHex.startsWith('0x5c79234101'));
});

test('6. CRESnapshotRunner simulates end-to-end DON execution in sub-100ms', async () => {
  const runner = new CRESnapshotRunner();
  const result = await runner.runSimulation('mkt_sol_500', 530.0, true);

  assert.equal(result.donNodesTested, 4);
  assert.equal(result.quorumSatisfied, true);
  assert.equal(result.consensusOutcome, 'YES');
  assert.ok(result.executionDurationMs < 100, 'DON simulation latency must be sub-100ms');
  assert.ok(result.onChainPayload.calldataHex.length > 20);
});
