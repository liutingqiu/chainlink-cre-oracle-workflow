# Chainlink CRE Settlement Workflow 🔗⚡

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-6%2F6%20Passed-brightgreen)](tests/cre_workflow.test.js)
[![Chainlink CRE](https://img.shields.io/badge/Chainlink-CRE%20Workflow-blue)](https://docs.chain.link/)
[![Live Terminal](https://img.shields.io/badge/Live%20Visualizer-GitHub%20Pages-success)](https://liutingqiu.github.io/chainlink-cre-oracle-workflow/)

**Chainlink Runtime Environment (CRE) Automated Verification & Settlement Workflow for AI Prediction Markets and Real-World Assets.**

Submitted to the **DoraHacks • BLI Legal Tech Hackathon 2 — Chainlink $2,000 USD CRE Bounty (Best Workflow with CRE)**.

---

## 🌟 Overview

The **Chainlink Runtime Environment (CRE)** provides an institutional-grade orchestration layer to connect smart contracts across blockchains and off-chain data sources.

This project delivers a complete CRE TypeScript workflow (`wf_cre_prediction_settlement_v1`):
1. **Multi-Source Ingestion:** Ingests external API data, Pyth benchmarks, and Chainlink Data Feeds.
2. **AI & Evidence Parsing:** Evaluates natural-language market resolution conditions.
3. **Decentralized Oracle Network (DON) Quorum:** Requires 3-of-4 node consensus with Byzantine fault tolerance.
4. **On-Chain Settlement Payload:** Builds tamper-proof calldata with cryptographic attestation hashes for Solana, Ethereum, Arbitrum, and Base contracts.
5. **Interactive DAG Visualizer:** Visualizes the entire workflow execution pipeline live in the browser.

---

## 🌐 Live Interactive DAG Visualizer

Test the CRE simulation runner and inspect generated calldata directly online:  
👉 **[https://liutingqiu.github.io/chainlink-cre-oracle-workflow/](https://liutingqiu.github.io/chainlink-cre-oracle-workflow/)**

---

## 📦 Quick Start & Usage

```bash
git clone https://github.com/liutingqiu/chainlink-cre-oracle-workflow.git
cd chainlink-cre-oracle-workflow
npm install
npm test
```

### TypeScript / ESM Example

```typescript
import { CRESettlementWorkflow, CRESnapshotRunner } from 'chainlink-cre-oracle-workflow';

// 1. Initialize CRE Simulation Runner
const runner = new CRESnapshotRunner();

// 2. Simulate DON Multi-Node Consensus Execution
const result = await runner.runSimulation('mkt_sol_500', 525.0, true);

console.log(`Workflow: ${result.workflowId}`);
console.log(`DON Nodes Tested: ${result.donNodesTested} (Quorum: ${result.quorumSatisfied})`);
console.log(`Consensus Outcome: ${result.consensusOutcome} ($${result.consensusPriceUSD})`);
console.log(`Generated Calldata: ${result.onChainPayload.calldataHex}`);
```

---

## 🧪 Automated Test Suite

Run the unit tests covering workflow configuration, node observations, DON quorum, fault tolerance, and calldata construction:

```bash
node --test tests/cre_workflow.test.js
```

Output:
```text
✔ 1. CRESettlementWorkflow initializes with institutional DON configuration (0.6ms)
✔ 2. executeNodeObservation produces signed oracle node observation (0.2ms)
✔ 3. aggregateConsensus reaches quorum with 4 unanimous nodes (0.2ms)
✔ 4. aggregateConsensus tolerates 1 Byzantine/outlier node and preserves 3/4 quorum (0.1ms)
✔ 5. buildSettlementPayload constructs target calldata and attestation hash (0.2ms)
✔ 6. CRESnapshotRunner simulates end-to-end DON execution in sub-100ms (0.2ms)

ℹ pass 6
ℹ fail 0
```

---

## 📖 Hackathon Documentation

Read the full project pitch deck, architectural rationale, and market impact analysis:  
👉 **[PITCH_DECK.md](PITCH_DECK.md)**

---

## 📄 License

Released under the [MIT License](LICENSE).
