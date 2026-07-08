# web3-researcher

> Web3-native research routing for AI agents — finds the right data source automatically instead of relying on general search engines.

An [Agent Skill](https://agentskills.io/) that routes any Web3 research query to the most accurate native source: DeFiLlama for DeFi data, CoinGecko for prices, Dune for onchain metrics, chain explorers for contracts, Farcaster for community sentiment, and more.

---

## What it does

1. **Classifies the query** — identifies what type of Web3 research is needed
2. **Routes to the right source** — picks the best Web3-native data source, not Google
3. **Combines sources** — for complex queries that need multiple angles
4. **Outputs a structured report** — findings, sources used, and confidence level

---

## Sources covered

| Category | Sources |
|---|---|
| Onchain metrics | Dune Analytics, Flipside |
| DeFi data | DeFiLlama (TVL, yields, revenue) |
| Token prices | CoinGecko, CoinMarketCap |
| Block explorers | Basescan, Etherscan, Polygonscan, Arbiscan, Solscan |
| Smart contracts | Etherscan verified code, GitHub, Solodit audits |
| NFT data | OpenSea, Blur, Magic Eden |
| Community | Farcaster, X, Lens |
| News | The Block, Decrypt, CoinDesk, Bankless |
| ProductClank | productclank.com, covariance-network GitHub |
| Fallback | DuckDuckGo with Web3 site: operators |

---

## Install

```
https://github.com/vivu16/multi-search-engine/blob/main/SKILL.md
```

Or fetch raw:

```bash
curl -s https://github.com/vivu16/multi-search-engine/blob/main/SKILL.md
```

---

## Quick start

Load the skill then ask:

> "Research how Aerodrome is performing on Base right now."

> "What are the best USDC yields on Base?"

> "Is this contract safe? 0x1234...abcd on Base"

> "What are Web3 builders saying about Superfluid?"

---

## File structure

```
web3-researcher/
├── SKILL.md                           # Core skill — load this into your agent
├── README.md                          # You are here
├── QUICKSTART.md                      # Get running in 5 minutes
├── CHANGELOG.md                       # Version history
└── references/
    ├── SOURCE_DIRECTORY.md            # Full directory of all Web3 sources
    ├── QUERY_ROUTING.md               # Decision trees for complex queries
    └── OPERATORS.md                   # Advanced search operators per source
```

---

## Built for the ProductClank ecosystem

Registered with the [ProductClank Skill Registry](https://www.productclank.com/superfluid/skills) and follows the [Agent Skills](https://agentskills.io/) standard (v1, Anthropic).

**Useful links:**
- [ProductClank Agents](https://www.productclank.com/agents)
- [Skill Registry — Season 6](https://www.productclank.com/superfluid/skills)
- [Official ProductClank agent skills](https://github.com/covariance-network/productclank-agent-skill)

---

## Author

**ELARA VOSS**

---

## License

MIT
