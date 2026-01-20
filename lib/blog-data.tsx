import type { JSX } from "react";


interface Article {
  content: JSX.Element;
  date: string;
  excerpt: string;
  slug: string;
  title: string;
}

const articles: Article[] = [
  {
    content: (
      <>
        <p>
          When I started building superinbox.com, the goal was clear: predict
          and generate the next email. Given a conversation thread, draft a
          response that sounds like you, references the right context, and moves
          the conversation forward. I made what seemed like an obvious choice:
          use RAG to give the AI the context it needed. Vector embeddings,
          semantic search, a reranker to boost relevance—the standard playbook.
          It worked, but something was off.
        </p>
        <p>
          The more I used it, the more I noticed the cracks. The agent would
          draft a reply referencing details from the wrong email thread. It
          would confuse two different Johns. It would miss crucial context from
          an earlier message in the thread because the embeddings ranked some
          tangentially related email higher.
        </p>
        <p>
          I needed a different approach. I'd been watching tools like Claude
          Code represent codebases as filesystems—giving AI agents access to{" "}
          <code>ls</code>, <code>grep</code>, and <code>cat</code> to navigate
          and understand code. The pattern intrigued me. What if I applied the
          same idea to email? Represent the inbox as a filesystem and let the
          agent navigate it with standard Unix commands.
        </p>

        <h2>The problem with RAG for structured data</h2>
        <p>
          RAG works beautifully for unstructured content. Ask a question about a
          corpus of documents, and semantic search surfaces relevant passages.
          But email inboxes aren't unstructured—they're deeply structured.
          Senders, recipients, dates, subjects, threads, folders. This structure
          matters.
        </p>
        <p>Here's what I kept running into:</p>
        <p>
          <strong>Semantic search loses precision for exact lookups.</strong>{" "}
          When you search for "emails from john@acme.com", you want exact
          matches, not semantically similar senders. Vector embeddings don't
          understand that email addresses are identifiers, not concepts.
        </p>
        <p>
          <strong>Embeddings flatten hierarchical relationships.</strong> A
          reply to a reply to a reply is structurally related to its parent
          emails. That relationship gets lost when you chunk emails into
          vectors. The thread context evaporates.
        </p>
        <p>
          <strong>Latency and cost add up.</strong> Every query meant embedding
          the question, searching the vector database, fetching candidates,
          running them through a reranker. Each step costs time and money. For
          an interactive inbox agent, this latency was noticeable.
        </p>
        <p>
          <strong>Chunks lose context.</strong> RAG retrieves fragments. But
          emails often reference other emails—"as I mentioned in my previous
          email" or "see the attachment from yesterday." A chunk retrieved in
          isolation misses these connections.
        </p>

        <h2>Why filesystems work better</h2>
        <p>
          Here's an insight that changed my approach: LLMs are trained on
          massive amounts of code, documentation, and technical content. They've
          seen countless examples of filesystem navigation. They understand{" "}
          <code>ls</code>, <code>grep</code>, <code>cat</code>, and file paths
          natively.
        </p>
        <p>
          When you give an LLM access to a filesystem, you're not teaching it
          something new. You're meeting it where it already lives.
        </p>
        <p>The advantages became clear:</p>
        <p>
          <strong>Exact retrieval.</strong> Want emails from john@acme.com?
          That's a <code>grep</code> for the email address or a directory
          lookup. No semantic approximation, no reranking needed. You get
          exactly what you asked for.
        </p>
        <p>
          <strong>Preserved structure.</strong> Email threads become
          directories. Replies become files in chronological order. The
          hierarchy is explicit and navigable. The agent can <code>ls</code> a
          thread directory to see the conversation flow.
        </p>
        <p>
          <strong>On-demand loading.</strong> Instead of retrieving everything
          that might be relevant, the agent fetches only what it needs. Read the
          subject lines first, then dive into specific emails. This keeps the
          context window focused.
        </p>
        <p>
          <strong>Debuggability.</strong> When something goes wrong with RAG,
          you're debugging opaque embedding spaces and similarity scores. With a
          filesystem, you can trace exactly which files the agent read and why.
          It's deterministic.
        </p>

        <h2>Representing an inbox as a filesystem</h2>
        <p>
          I settled on a directory structure that mirrors how people think about
          email:
        </p>
        <pre>
          <code>
            {`/mailbox/
├── inbox/
│   ├── 2025-01-15_meeting-followup_john@acme.com.json
│   ├── 2025-01-14_invoice-attached_billing@vendor.com.json
│   └── ...
├── sent/
│   └── ...
├── threads/
│   ├── thread_abc123/
│   │   ├── 001_2025-01-10_original.json
│   │   ├── 002_2025-01-11_reply.json
│   │   └── 003_2025-01-12_re-reply.json
│   └── ...
├── contacts/
│   ├── john@acme.com/
│   │   ├── profile.json
│   │   └── recent.json
│   └── ...
└── indexes/
    ├── by-sender.json
    ├── by-date.json
    └── by-subject.json`}
          </code>
        </pre>
        <p>
          Each email file contains structured metadata alongside the content:
        </p>
        <pre>
          <code>
            {`{
  "id": "msg_12345",
  "thread_id": "thread_abc123",
  "from": "john@acme.com",
  "to": ["me@example.com"],
  "subject": "Meeting Followup",
  "date": "2025-01-15T09:30:00Z",
  "labels": ["inbox", "important"],
  "snippet": "Thanks for the call yesterday...",
  "body": "Full email content here..."
}`}
          </code>
        </pre>
        <p>
          The naming convention—date, subject slug, sender—makes files scannable
          with <code>ls</code>. The index files provide quick lookups without
          reading every email.
        </p>

        <h2>Sandbox-based agent access</h2>
        <p>
          Security matters when you're giving an AI access to someone's email. I
          run the agent in an isolated sandbox with read-only filesystem access.
          It can navigate and read, but it can't modify or delete.
        </p>
        <p>The agent workflow for generating a reply becomes intuitive:</p>
        <ol>
          <li>
            <strong>Identify the thread.</strong> Which conversation is the user
            replying to?
          </li>
          <li>
            <strong>Load the full thread.</strong>{" "}
            <code>ls /mailbox/threads/thread_abc123/</code> to see all messages
          </li>
          <li>
            <strong>Read the conversation.</strong> <code>cat</code> each email
            in order to understand the full context
          </li>
          <li>
            <strong>Gather related context.</strong> Check previous emails from
            the same sender, related threads, or referenced topics
          </li>
          <li>
            <strong>Generate the reply.</strong> Draft a response that
            accurately references the conversation history
          </li>
        </ol>
        <p>
          Here's what this looks like in practice. The user wants to reply to an
          email from the Acme team about a project timeline.
        </p>
        <p>The agent might:</p>
        <ul>
          <li>
            <code>ls /mailbox/threads/thread_abc123/</code> to see the full
            conversation
          </li>
          <li>
            <code>cat</code> each email in the thread to understand what's been
            discussed
          </li>
          <li>
            <code>grep -r "deadline" /mailbox/contacts/john@acme.com/</code> to
            find what deadlines were mentioned in past conversations
          </li>
          <li>
            <code>cat /mailbox/sent/</code> recent replies to match the user's
            writing style
          </li>
          <li>
            Draft a reply that references the correct timeline and context
          </li>
        </ul>
        <p>
          Each step is transparent. Each step is auditable. And the generated
          reply is grounded in the actual email content—not some semantically
          similar approximation.
        </p>
        <p>
          This approach also enables querying your inbox ("What did John email
          me about last week?"), but email generation is where the precision
          really matters.
        </p>

        <h2>The sync problem</h2>
        <p>
          There's a catch with this approach: you need to get the emails into
          the filesystem first. This means syncing data from the Gmail API into
          the sandbox every time you spin one up.
        </p>
        <p>
          For small inboxes, this is fine. Pull down a few thousand emails,
          write them to disk, and you're ready. But email inboxes grow. Power
          users have tens of thousands of emails spanning years. Some inboxes
          I've tested against are hundreds of megabytes of raw data.
        </p>
        <p>
          Syncing hundreds of megabytes every time you spawn a sandbox isn't
          practical. The latency kills the user experience—nobody wants to wait
          30 seconds before they can ask about their inbox. And if you're
          running sandboxes at scale, the bandwidth costs add up fast.
        </p>
        <p>
          The solution I'm exploring involves incremental sync and intelligent
          caching. Only pull new emails since the last sync. Keep hot data
          (recent emails, frequently accessed threads) ready to go. Fetch older
          emails on-demand when the agent actually needs them. It's a tradeoff
          between completeness and responsiveness—and for most queries, recent
          context is enough.
        </p>

        <h2>Results and comparison</h2>
        <p>
          After switching from RAG to the filesystem approach, the improvements
          in email generation were clear:
        </p>
        <p>
          <strong>More accurate replies.</strong> Generated emails now reference
          the correct details from the conversation. No more confusing threads
          or pulling in context from unrelated emails. The agent reads exactly
          what it needs.
        </p>
        <p>
          <strong>Better thread awareness.</strong> By loading the entire thread
          as a directory of ordered files, the agent understands the flow of
          conversation. It knows who said what, in what order, and can craft
          replies that feel like natural continuations.
        </p>
        <p>
          <strong>Lower latency.</strong> File reads are fast. No embedding
          computation, no vector similarity search, no reranking API calls.
          Email drafts appear faster.
        </p>
        <p>
          <strong>Reduced costs.</strong> Vector databases and reranker APIs
          charge per query. Filesystem access is essentially free. At scale,
          this difference matters.
        </p>
        <p>
          <strong>Easier debugging.</strong> When a generated reply is off, I
          can see exactly which files the agent read. The retrieval path is
          deterministic and reproducible. With RAG, I'd be staring at embedding
          similarity scores trying to understand why irrelevant emails
          influenced the draft.
        </p>

        <h2>Conclusion</h2>
        <p>
          The lesson I keep relearning in software: the best solution is often
          simpler than the trendy one. RAG is powerful, but it's also complex.
          Vector embeddings, similarity search, reranking pipelines—each adds
          latency, cost, and opacity.
        </p>
        <p>
          For generating email replies, precision matters more than semantic
          similarity. You need the actual conversation history, not
          approximately related content. Filesystems are boring technology.
          They're also technology that LLMs understand deeply. When I gave the
          agent a directory structure and basic Unix commands, it generated
          better email drafts than any semantic search pipeline I built.
        </p>
        <p>Sometimes the best path forward is a literal one.</p>
      </>
    ),
    date: "2025-01-19",
    excerpt:
      "How representing an inbox as a filesystem helps AI generate better email replies than traditional RAG approaches.",
    slug: "give-your-inbox-a-path",
    title: "Give your inbox a path",
  },
];

export const getAllArticles = (): Article[] => articles;

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);
