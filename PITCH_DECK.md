# Chainlink Runtime Environment (CRE) Settlement Workflow 🔗⚡

> **Submitted to DoraHacks • BLI Legal Tech Hackathon 2 — Chainlink $2,000 USD CRE Bounty (Best Workflow with CRE)**  
> **Live Interactive Visualizer:** [https://liutingqiu.github.io/chainlink-cre-oracle-workflow/](https://liutingqiu.github.io/chainlink-cre-oracle-workflow/)  
> **Open Source GitHub Repository:** [https://github.com/liutingqiu/chainlink-cre-oracle-workflow](https://github.com/liutingqiu/chainlink-cre-oracle-workflow)  
> **Lead Engineer & Author:** Tingqiu Liu (`@liutingqiu`, `tianqi689@gmail.com`)

---

## 🎯 Executive Summary & The Problem

Decentralized prediction markets, real-world asset (RWA) protocols, and autonomous trading engines require automated settlement based on external ground truth. However, conventional settlement approaches suffer from key vulnerabilities:
1. **Centralized Resolver Risk:** Single-oracle or centralized API resolvers create catastrophic points of failure and exploit surfaces.
2. **Disconnected Data & Execution:** Smart contracts cannot natively query multiple off-chain REST/WebSocket APIs, verify LLM natural-language event rules, and aggregate Byzantine fault-tolerant consensus without complex custom middleware.

---

## 💡 The Solution: Chainlink Runtime Environment (CRE) Workflow

**Chainlink Runtime Environment (CRE)** is the next-generation institutional orchestration layer enabling smart contracts to interact seamlessly across on-chain and off-chain systems.

Our project implements an end-to-end **CRE TypeScript Workflow** (`wf_cre_prediction_settlement_v1`) that automates multi-source data ingestion, AI-assisted evidence evaluation, Decentralized Oracle Network (DON) consensus aggregation, and cryptographic on-chain settlement calldata generation.

### Key Architecture:

### 1. Multi-Source Ingestion & Oracle Observation
- Modular step querying **Chainlink Data Feeds (Aggregator V3)** and **Pyth Network** high-fidelity benchmarks.
- Each independent DON node produces a cryptographically signed observation containing observed price, timestamp, and raw outcome (`YES`, `NO`, or `INVALID`).

### 2. Decentralized Oracle Network (DON) Quorum Consensus
- The workflow aggregates observations across 4 independent DON nodes.
- Enforces Byzantine Fault Tolerance (BFT) requiring at least **3 of 4 nodes** to agree on outcome and price.
- Fault-tolerant: tolerates an offline, Byzantine, or divergent node while preserving legitimate execution.

### 3. Institutional On-Chain Settlement Payload Construction
- Converts the aggregated DON consensus report into an institutional-grade calldata payload.
- Compatible with target blockchains: **Solana**, **Ethereum**, **Arbitrum**, and **Base**.
- Generates a 32-byte cryptographic attestation hash protecting against settlement tampering or replay attacks.

### 4. Interactive Visual DAG Workflow Terminal
- Deployed on **GitHub Pages** with zero runtime dependencies.
- Visualizes the 5-step DAG execution pipeline (Trigger -> Ingestion -> AI Parse -> DON Quorum -> Settlement) with an interactive CLI simulation runner.

---

## 🛠️ Architecture & Tech Stack

```text
chainlink-cre-oracle-workflow/
├── src/
│   ├── types.ts                   # CRE workflow configs, observations, DON reports, payloads
│   ├── workflow/
│   │   └── settlement.ts          # CRE TypeScript workflow implementation & calldata builder
│   ├── sim/
│   │   └── don_runner.ts          # DON multi-node simulation runner (CLI compatible)
│   └── index.ts                   # Unified library entrypoint
├── tests/
│   └── cre_workflow.test.js       # 6 automated unit tests (quorum, fault tolerance, calldata)
├── index.html                     # Live interactive DAG visualizer & DON simulator
├── PITCH_DECK.md                  # Hackathon pitch deck & submission document
└── README.md                      # Developer documentation & quickstart
```

- **Runtime:** Node.js (ESM), TypeScript 5.6
- **Test Suite:** `node:test` + `node:assert/strict` (6/6 passed, 100% green)
- **Frontend:** Pure HTML5/CSS/JS (Chainlink Blue & Neon terminal aesthetic, deployed on GitHub Pages)

---

## 🔬 Test Suite Verification

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

## 🏆 Project Deliverables & Links

- **Live Interactive Terminal:** [https://liutingqiu.github.io/chainlink-cre-oracle-workflow/](https://liutingqiu.github.io/chainlink-cre-oracle-workflow/)
- **GitHub Repository:** [https://github.com/liutingqiu/chainlink-cre-oracle-workflow](https://github.com/liutingqiu/chainlink-cre-oracle-workflow)
- **DoraHacks Profile:** [https://dorahacks.io/hacker/liutingqiu](https://dorahacks.io/hacker/liutingqiu)
- **Lead Developer Contact:** Tingqiu Liu (`tianqi689@gmail.com`) / GitHub: `liutingqiu`

---
*Built with ❤️ for Chainlink, Blockchain Legal Institute, and DoraHacks.*
