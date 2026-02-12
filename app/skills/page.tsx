import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quantish Skills - Claude Code Skills for Prediction Markets',
  description: 'Install prediction market trading skills for Claude Code. One command to set up Polymarket, Kalshi, and Discovery MCP servers.',
};

const InstallBlock = ({ label, command }: { label: string; command: string }) => (
  <div className="mb-3">
    <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] block mb-1">{label}</span>
    <pre className="p-3 bg-zinc-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto">{command}</pre>
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
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
      </div>
      <code className="text-xs bg-[hsl(var(--muted))] px-2 py-1 rounded shrink-0 font-mono">
        /{command}
      </code>
    </div>
    {prereq && (
      <p className="text-xs text-amber-600 dark:text-amber-400 mb-3">
        Requires: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded">/{prereq}</code>
      </p>
    )}
    <ul className="text-sm text-[hsl(var(--muted-foreground))] space-y-1 mb-4">
      {details.map((d, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[hsl(var(--primary))] mt-0.5">&bull;</span>
          {d}
        </li>
      ))}
    </ul>
    <InstallBlock
      label="Install"
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
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Skills
        </h1>
        <p className="text-base text-[hsl(var(--muted-foreground))]">
          Claude Code skills for prediction market trading. Install a skill and run the slash command to get started.
        </p>
      </div>

      {/* Quick install all */}
      <div className="card mb-10 border-[hsl(var(--primary))] border-opacity-30">
        <h2 className="text-lg font-bold mb-2">Quick install (all skills)</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Clone the entire skills repo to get all three skills at once:
        </p>
        <pre className="p-4 bg-zinc-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto">
{`git clone https://github.com/joinQuantish/skills.git ~/.claude/skills/quantish`}
        </pre>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">
          Then restart Claude Code. Run <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded">/quantish-mcp-setup</code> to connect to all servers.
        </p>
      </div>

      {/* Individual skills */}
      <h2 className="text-xl font-bold mb-6">Available Skills</h2>

      <SkillCard
        name="Quantish MCP Setup"
        command="quantish-mcp-setup"
        description="One command to connect to all prediction market servers."
        details={[
          'Generates API keys for Discovery, Polymarket, and Kalshi',
          'Sets up 3 MCP servers via `claude mcp add`',
          'Deploys Polymarket Safe wallet + Kalshi Solana wallet',
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
          'Claiming winnings from resolved markets',
          'Token merging (YES + NO → USDC)',
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
          'Market search with Discovery → DFlow mapping',
          'Buy YES/NO outcome tokens',
          'Token holdings and position verification',
          'Redemption after market settlement',
          'SOL/USDC swaps via Jupiter',
          'Market initialization handling',
        ]}
        installUrl={`${ghRaw}/kalshi-trading/SKILL.md`}
      />

      {/* What gets set up */}
      <div className="card mb-10">
        <h2 className="text-lg font-bold mb-4">What gets set up</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">MCP Server</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Platform</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">What you can do</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono text-xs">quantish-discovery</td>
                <td className="py-2 pr-4">All</td>
                <td className="py-2 text-[hsl(var(--muted-foreground))]">Search 50k+ markets, get prices, find arbitrage</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono text-xs">quantish</td>
                <td className="py-2 pr-4">Polymarket</td>
                <td className="py-2 text-[hsl(var(--muted-foreground))]">Place trades, manage positions, transfer funds</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">quantish-kalshi</td>
                <td className="py-2 pr-4">Kalshi</td>
                <td className="py-2 text-[hsl(var(--muted-foreground))]">Trade US-regulated markets via Solana/DFlow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Example commands */}
      <div className="card mb-10">
        <h2 className="text-lg font-bold mb-4">Example commands (after setup)</h2>
        <pre className="p-4 bg-zinc-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto">
{`"Search for government shutdown markets"
"Show my Polymarket balance"
"Buy $2 of YES on the Fed Chair market"
"Show my Kalshi positions"
"Claim my winnings from resolved markets"`}
        </pre>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/joinQuantish/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm font-medium border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
        >
          View on GitHub &rarr;
        </a>
        <Link
          href="/agent"
          className="px-4 py-2 text-sm font-medium border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
        >
          Agent Docs
        </Link>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
        >
          Get API Keys
        </Link>
      </div>
    </div>
  );
}
