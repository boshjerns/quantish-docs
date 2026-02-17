import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quantish Skills - Claude Code Skills for Prediction Markets',
  description: 'Install prediction market trading skills for Claude Code. One command to set up Polymarket, Kalshi, Limitless, and Discovery MCP servers.',
};

const InstallBlock = ({ label, command }: { label: string; command: string }) => (
  <div className="mb-3">
    <span className="text-[10px] font-bold block mb-1 uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>{label}</span>
    <pre className="code-block">{command}</pre>
  </div>
);

const SkillCard = ({
  name,
  command,
  description,
  details,
  installUrl,
  prereq,
}: {
  name: string;
  command: string;
  description: string;
  details: string[];
  installUrl: string;
  prereq?: string;
}) => (
  <div className="card mb-6">
    <div className="flex items-start justify-between gap-4 mb-3">
      <div>
        <h3 className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{name}</h3>
        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{description}</p>
      </div>
      <code className="text-xs shrink-0 px-2 py-1" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>
        /{command}
      </code>
    </div>
    {prereq && (
      <p className="text-xs mb-3" style={{ color: 'var(--yellow)' }}>
        requires: <code>/{prereq}</code>
      </p>
    )}
    <ul className="text-xs space-y-1 mb-4" style={{ color: 'var(--fg-muted)' }}>
      {details.map((d, i) => (
        <li key={i} className="flex items-start gap-2">
          <span style={{ color: 'var(--cyan)' }}>&gt;</span>
          {d}
        </li>
      ))}
    </ul>
    <InstallBlock
      label="install"
      command={`mkdir -p ~/.claude/skills/${command}\ncurl -o ~/.claude/skills/${command}/SKILL.md \\\n  ${installUrl}`}
    />
  </div>
);

export default function SkillsPage() {
  const ghRaw = 'https://raw.githubusercontent.com/joinQuantish/skills/main/skills';

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'>'} skills.list() :: claude_code_extensions
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Skills
        </h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Claude Code skills for prediction market trading.
          <br />
          <span style={{ color: 'var(--fg-dim)' }}>Install a skill, run the slash command.</span>
        </p>
      </div>

      {/* Quick install all */}
      <div className="card mb-10" style={{ borderColor: 'var(--cyan-dim)' }}>
        <h2 className="text-sm font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ color: 'var(--cyan)' }}>&gt;</span> Quick install (all skills)
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Clone the entire skills repo to get all four at once:
        </p>
        <pre className="code-block">
{`git clone https://github.com/joinQuantish/skills.git ~/.claude/skills/quantish`}
        </pre>
        <p className="text-xs mt-3" style={{ color: 'var(--fg-dim)' }}>
          Restart Claude Code. Run <code style={{ color: 'var(--cyan)' }}>/quantish-mcp-setup</code> to connect to all servers.
        </p>
      </div>

      {/* Individual skills */}
      <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span style={{ color: 'var(--cyan)' }}>## </span>Available Skills
      </h2>

      <SkillCard
        name="Quantish MCP Setup"
        command="quantish-mcp-setup"
        description="One command to connect to all prediction market servers."
        details={[
          'Generates API keys for Discovery, Polymarket, Kalshi, and Limitless',
          'Sets up 4 MCP servers via `claude mcp add`',
          'Deploys Polymarket Safe wallet, Kalshi Solana wallet, and Limitless Base wallet',
          'Configures authentication headers automatically',
        ]}
        installUrl={`${ghRaw}/quantish-mcp-setup/SKILL.md`}
      />

      <SkillCard
        name="Polymarket Trading"
        command="polymarket-trading"
        description="Complete Polymarket trading guide with all tool calls."
        prereq="quantish-mcp-setup"
        details={[
          'Wallet setup and balance checking',
          'Market discovery via semantic search',
          'Order book inspection (best bid/ask spread)',
          'Order placement (GTC, FOK, FAK, GTD)',
          'Position management and P&L tracking',
          'Copy trading and trader discovery',
          'Claiming winnings from resolved markets',
          'Token merging (YES + NO -> USDC)',
        ]}
        installUrl={`${ghRaw}/polymarket-trading/SKILL.md`}
      />

      <SkillCard
        name="Kalshi Trading"
        command="kalshi-trading"
        description="Trade CFTC-regulated prediction markets on Kalshi via Solana/DFlow."
        prereq="quantish-mcp-setup"
        details={[
          'Solana wallet management (generate or import)',
          'Market search with Discovery -> DFlow mapping',
          'Buy YES/NO outcome tokens',
          'Token holdings and position verification',
          'Redemption after market settlement',
          'SOL/USDC swaps via Jupiter',
          'Market initialization handling',
        ]}
        installUrl={`${ghRaw}/kalshi-trading/SKILL.md`}
      />

      <SkillCard
        name="Limitless Trading"
        command="limitless-trading"
        description="Trade prediction markets on Base chain via Limitless Exchange."
        prereq="quantish-mcp-setup"
        details={[
          'Base wallet management and funding',
          'CLOB limit orders on prediction markets',
          'Multi-outcome and binary market trading',
          'Position tracking and P&L monitoring',
          'Token swaps and Base meme coin trading',
          'Cross-chain bridging (Base to Polygon)',
          'Winnings redemption after settlement',
        ]}
        installUrl={`${ghRaw}/limitless-trading/SKILL.md`}
      />

      {/* What gets set up */}
      <div className="card mb-10">
        <h2 className="text-sm font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ color: 'var(--cyan)' }}>## </span>What gets set up
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>MCP Server</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Platform</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>What you can do</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4" style={{ color: 'var(--cyan)' }}>quantish-discovery</td>
                <td className="py-2 pr-4">All</td>
                <td className="py-2" style={{ color: 'var(--fg-muted)' }}>Search 50k+ markets, get prices, find arbitrage, related markets</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4" style={{ color: 'var(--cyan)' }}>quantish-polymarket</td>
                <td className="py-2 pr-4">Polymarket</td>
                <td className="py-2" style={{ color: 'var(--fg-muted)' }}>Place trades, manage positions, copy trading, bridge funds</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4" style={{ color: 'var(--cyan)' }}>quantish-kalshi</td>
                <td className="py-2 pr-4">Kalshi</td>
                <td className="py-2" style={{ color: 'var(--fg-muted)' }}>Trade US-regulated markets via Solana/DFlow</td>
              </tr>
              <tr>
                <td className="py-2 pr-4" style={{ color: 'var(--cyan)' }}>quantish-limitless</td>
                <td className="py-2 pr-4">Limitless</td>
                <td className="py-2" style={{ color: 'var(--fg-muted)' }}>Trade Base chain markets, token swaps, cross-chain bridges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Example commands */}
      <div className="card mb-10">
        <h2 className="text-sm font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ color: 'var(--cyan)' }}>## </span>Example commands
        </h2>
        <pre className="code-block">
{`"Search for government shutdown markets"
"Show my Polymarket balance"
"Buy $2 of YES on the Fed Chair market"
"Show my Kalshi positions"
"Search Limitless markets for crypto events"
"Copy trade the top Polymarket whale"
"Claim my winnings from resolved markets"`}
        </pre>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/joinQuantish/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          [GITHUB] &rarr;
        </a>
        <Link href="/agent" className="btn-ghost">
          [AGENT DOCS]
        </Link>
        <Link href="/" className="btn-ghost">
          [GET API KEYS]
        </Link>
      </div>
    </div>
  );
}
