import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDollarSign,
  Cpu,
  Factory,
  Gauge,
  Handshake,
  Leaf,
  Lightbulb,
  MapPinned,
  Menu,
  Network,
  PackageCheck,
  PanelsTopLeft,
  Play,
  Recycle,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Volume2,
  VolumeX,
  Workflow,
  X,
} from "lucide-react";
import "./styles.css";

function playTone(type = "tap", enabled = true) {
  if (!enabled || typeof window === "undefined") return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const frequencies = type === "success" ? [660, 880] : [420];

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequencies[0], now);
  if (frequencies[1]) oscillator.frequency.setValueAtTime(frequencies[1], now + 0.08);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(type === "success" ? 0.045 : 0.025, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (type === "success" ? 0.18 : 0.09));
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + (type === "success" ? 0.2 : 0.1));
  oscillator.onended = () => context.close();
}

const stockImages = {
  intro: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  planning: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  team: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
  strategy: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
  process: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  finance: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80",
  sustainability: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  risk: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
};

function imageForItem(item) {
  const title = item.title.toLowerCase();
  if (item.image) return item.image;
  if (title.includes("sustain")) return stockImages.sustainability;
  if (title.includes("finance") || title.includes("value delivery")) return stockImages.finance;
  if (title.includes("artificial") || title.includes("ai") || title.includes("data")) return stockImages.data;
  if (title.includes("risk")) return stockImages.risk;
  if (title.includes("stakeholder") || title.includes("culture") || title.includes("leader")) return stockImages.team;
  if (title.includes("process") || title.includes("itto") || title.includes("quality")) return stockImages.process;
  if (title.includes("schedule") || title.includes("scope") || title.includes("focus") || title.includes("planning")) return stockImages.planning;
  return stockImages.strategy;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 640px)").matches;
  });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

const sections = [
  {
    eyebrow: "Lesson Overview",
    title: "Lesson Overview",
    subtitle: "This lesson is a click-through experience. Each section uses the interaction that best fits the idea — cards, selectors, hotspots, checks, timelines, or flashcards.",
    cards: [
      {
        title: "How This Lesson Works",
        preview: "Each section uses the interaction that fits the content.",
        body: "This lesson is still a click-through reading experience, but the interaction changes by section. Some screens use modal cards, some use principle selectors, hotspots, checklists, timelines, or flashcards. Work through the required interactions to unlock the next screen.",
        points: [
          "GUIDED PROGRESSION — Each section shows only the interaction you need for that idea. Complete it to enable the next screen.",
          "VARIED INTERACTIONS — Expect modal learning cards, principle selectors, domain hotspots, ITTO checks, timelines, and flashcards.",
          "NAVIGATION BUTTONS — Use the arrows at the top-right or the bottom buttons to move backward and forward when the section is unlocked.",
          "KNOWLEDGE ANCHOR — A short reminder appears after you complete the required interaction for that section.",
        ],
      },
      {
        title: "What You'll Learn",
        preview: "The five outcomes listed in the lesson.",
        points: [
          "Six refined Project Management Principles — and the three-part mindset that frames them.",
          "Seven Performance Domains — and how they operate as interconnected gears.",
          "Forty non-prescriptive processes with ITTOs — and how to use them without memorizing them.",
          "Why Process Groups were renamed Focus Areas — and what that means for your exam mindset.",
          "Four updated terms — value delivery, sustainability, business environment, and tailoring.",
        ],
      },
    ],
    anchor: "Start Section 1 — Overview.",
  },
  {
    eyebrow: "Section 1",
    title: "Why PMBOK 8 Exists",
    subtitle: "PMBOK® 8 corrects a swing. Here's the arc in one diagram — then two things to understand about why it matters for how you study.",
    icon: Route,
    visual: "arc",
    cards: [
      {
        title: "What this means for your vocabulary",
        preview: "You need fluency in PMBOK® 8 terms — even though the exam follows the ECO.",
        body: "Trainers, question banks, and study guides now speak in PMBOK® 8 terms — principles, performance domains, Focus Areas, processes. You need fluency in that language even though the exam itself follows the ECO. The two are not the same thing.",
        exam: "If an answer option uses the old language (12 principles, 8 domains, 49 processes, Process Groups), it is wrong after 9 July 2026.",
      },
      {
        title: "What this means for your mindset",
        preview: "PMBOK® 8 is non-prescriptive and tailoring-first — structure you adapt, not rules you follow.",
        body: "PMBOK® 8 does not tell you to run every process on every project. It offers structure to adapt. That single idea — structure you tailor, rather than rules you follow — is the thread running through everything in this lesson. It is exactly the judgement the 2026 exam rewards.",
        exam: "When two answers both seem correct, the one that involves adapting to context is usually right.",
      },
    ],
    anchor: "PMBOK® 8 (Nov 2025) is a synthesis: keeps PMBOK® 7's principles + domains, restores PMBOK® 6-style processes and ITTOs — now non-prescriptive and tailorable. Headline counts: 12 → 6 principles · 8 → 7 domains · 49 → 40 processes · Process Groups → Focus Areas.",
  },
  {
    eyebrow: "Section 2",
    title: "Six Principles, One Mindset",
    subtitle: "PMBOK® 7 had twelve principles. PMBOK® 8 consolidates them into six — each absorbing related ideas from the old list. A principle is not a rule. It is a norm that guides behaviour.",
    icon: Brain,
    visual: "mindset",
    cards: [
      {
        title: "Adopt a Holistic View",
        preview: "See the project as part of a larger system — look up and outward before acting.",
        body: "Absorbs systems thinking and complexity. See the project as a node in a larger organizational, social, and environmental system. 'Look up and outward' before optimizing locally. This is the principle that justifies escalation.",
        exam: "When a PM optimizes locally and harms the wider program — Adopt a Holistic View is the answer.",
      },
      {
        title: "Focus on Value",
        preview: "Did the deliverable produce the result the organization needed? Not just: was it shipped?",
        body: "Elevates outcomes and benefits over mere deliverables. The question is not 'did we ship the feature?' but 'did it produce the result the organization needed?'",
        exam: "When a deliverable ships but the benefit is missing — Focus on Value is the discriminator.",
      },
      {
        title: "Embed Quality into Processes and Deliverables",
        preview: "Quality is built in — not inspected in afterward.",
        body: "Quality is not a final checkpoint. It is built into every process and every deliverable from the start.",
        exam: "Quality defect found late in the project → the answer involves earlier quality integration, not more inspection.",
      },
      {
        title: "Be an Accountable Leader",
        preview: "Integrity, self-awareness, and shared leadership across the team.",
        body: "Merges stewardship and leadership — integrity, self-awareness, and shared leadership. Accountability means owning outcomes, not just delegating tasks.",
        exam: "Leadership questions favour engagement and accountability over control or reassignment.",
      },
      {
        title: "Integrate Sustainability within All Project Areas",
        preview: "★ New standalone principle — environmental, social, and economic responsibility.",
        body: "The Eighth Edition's biggest philosophical addition. A standalone principle — not a footnote. Covers the triple bottom line: environmental, social, and economic sustainability.",
        exam: "Sustainability is first-class on this exam. Do not skip it as background context.",
      },
      {
        title: "Build an Empowered Culture",
        preview: "Psychological safety, diversity, and empowerment — broader than the old team principle.",
        body: "Evolves the old collaborative-team principle into something broader. Covers psychological safety, diversity, and the empowerment of the whole team and its stakeholders.",
        exam: "Team conflict questions → favour empowerment and understanding over escalation or reassignment.",
      },
    ],
    anchor: "Six principles (was 12). Read each as a lens, not a fact. The three-part mindset — proactive, ownership, value-driven — frames all six. Sustainability is standalone and first-class.",
  },
  {
    eyebrow: "Section 3",
    title: "Seven Performance Domains",
    subtitle: "PMBOK® 7 had eight outcome-focused domains with no processes. PMBOK® 8 reorganizes them into seven function-oriented domains — each embedding its own processes with ITTOs, operating as interconnected gears rather than isolated chapters.",
    icon: Network,
    visual: "domains",
    cards: [
      {
        title: "Do not confuse two vocabularies",
        preview: "PMBOK 8 has 7 domains. The ECO has 3 domains.",
        body: "PMBOK 8 domains are Governance, Scope, Schedule, Finance, Stakeholders, Resources, and Risk. The ECO exam domains are People, Process, and Business Environment.",
        exam: "A conflict scenario may test ECO People while drawing from PMBOK 8 Stakeholders and Resources.",
      },
      {
        title: "Note on Procurement",
        preview: "Tactical procurement moved to Appendix X4.",
        body: "Strategic sourcing stays under Governance, while detailed procurement processes are de-emphasized and moved to Appendix X4.",
        exam: "Procurement process detail sits in Appendix X4, not a main performance domain.",
      },
    ],
    anchor: "Seven performance domains (8 → 7): Governance (largest, ~9 processes), Scope, Schedule, Finance, Stakeholders (~7 processes), Resources, Risk. Each embeds ITTOs. Don't confuse with ECO's 3 exam domains (People / Process / Business Environment).",
  },
  {
    eyebrow: "Section 4",
    title: "Forty Non-Prescriptive Processes",
    subtitle: "Processes are back — but they are different. The 40 processes are illustrative, not prescriptive. The ITTOs show how work commonly flows, not what you must do on every project.",
    icon: Workflow,
    visual: "itto",
    cards: [
      {
        title: "The project management plan — the most central artifact",
        preview: "The project management plan appears almost everywhere.",
        body: "The project management plan is an input to virtually every Executing, Monitoring & Controlling, and Closing process. If a scenario asks what the PM should consult, reference, or update — the project management plan is almost always part of the answer.",
        exam: "Whenever a question feels ambiguous, ask yourself: would consulting the project management plan help? Usually yes.",
      },
      {
        title: "How to study ITTOs in 2026 — the right way",
        preview: "Memorizing lists is low-value. Understanding the logic is high-value.",
        body: "The old era rewarded rote recall of hundreds of specific ITTOs. That era is over. For each process, ask three questions: What does it need to start? What technique does the real work? What does it produce for the next process? Understand the chain and you can reason your way to the right answer on a scenario you have never seen.",
        exam: "ITTO questions reward logic, not lists. If you find yourself memorizing dozens of specific inputs — stop and ask why the input is needed instead.",
      },
    ],
    anchor: "40 non-prescriptive processes (49 → 40). ITTOs are illustrative samples, not a mandatory checklist. Learn the logic of the flow. The project management plan is the most central artifact across all processes.",
  },
  {
    eyebrow: "Section 5",
    title: "Process Groups Become Focus Areas",
    subtitle: "The five buckets are unchanged. What changed is the framing — and the framing changes how you answer exam questions.",
    icon: PanelsTopLeft,
    visual: "focus",
    cards: [
      {
        title: "What changed — and why it's not just cosmetic",
        preview: "'Process Group' = a stage you pass through once. 'Focus Area' = a kind of attention you bring repeatedly.",
        body: "'Process Group' suggested a stage you pass through once, in order. 'Focus Area' suggests a kind of attention you bring repeatedly, tailored to your approach. In a Scrum project, you initiate, plan, execute, monitor, and close work every sprint. The Focus Areas name those activities without forcing a waterfall.",
        exam: "Rule out answers that treat the lifecycle as rigidly sequential. In adaptive scenarios, the iterative answer is almost always right.",
      },
      {
        title: "The full architecture — how it all connects",
        preview: "Mindset → Principles → Domains → Processes → Focus Areas. One coherent stack.",
        body: "Mindset frames the six principles, principles explain why, domains define what, processes explain how, and Focus Areas organize when.",
        exam: "PMBOK 8 is the reference you reason from. The ECO 2026 is the blueprint you are tested on.",
      },
    ],
    anchor: "Focus Areas = the five Process Groups reintroduced as approach-agnostic. Rule out rigidly sequential answers; favour iterative ones in adaptive scenarios. Stack: mindset → principles (why) → domains (what) → processes (how) → Focus Areas (when), with tailoring throughout.",
  },
  {
    eyebrow: "Section 6",
    title: "Updated Terminology",
    subtitle: "These terms carry real weight on the 2026 exam. Know the definition and the exam implication.",
    icon: Sparkles,
    visual: "terms",
    cards: [
      {
        title: "Value Delivery",
        preview: "Success means outcomes and benefits realized.",
        body: "Traditional measures like on time, on budget, and in scope are necessary but no longer sufficient. Success means value worth the effort and expense.",
        exam: "Expect questions about whether a deliverable enabled the intended outcome, not merely whether it was completed.",
      },
      {
        title: "Sustainability",
        preview: "A standalone principle covering the triple bottom line.",
        body: "Environmental, social, and economic responsibility all count. Sustainability is not a passing mention anymore.",
        exam: "Look for the answer that accounts for long-term impact, not short-term delivery alone.",
      },
      {
        title: "Business Environment",
        preview: "The bridge between project, organization, and external world.",
        body: "Covers governance, compliance, strategy alignment, and external factors. It is also the ECO domain that grew most for 2026.",
        exam: "Connect the project upward to strategy and outward to the changing environment.",
      },
      {
        title: "Tailoring",
        preview: "The expected discipline, not optional garnish.",
        body: "Tailoring is deliberate adaptation of approach, governance, and processes to the specific project context.",
        exam: "There is no one-size-fits-all answer. Use the scenario's predictive, agile, or hybrid context.",
      },
      {
        title: "Artificial Intelligence",
        preview: "A tool and technique with Appendix X3.",
        body: "AI appears as a tool and technique, with Appendix X3 covering adoption, ethics, and use cases like predictive analytics in risk and scheduling.",
        exam: "Know how a PM uses AI responsibly. You are not expected to build AI.",
      },
    ],
    anchor: "Value delivery, sustainability, business environment, tailoring, and AI are exam-significant terms.",
  },
];

const lessonList = [
  "Lesson Overview",
  "Why PMBOK 8 Exists",
  "Six Principles, One Mindset",
  "Seven Performance Domains",
  "Forty Non-Prescriptive Processes",
  "Process Groups to Focus Areas",
  "Updated Terminology",
];

function ProgressDot({ state = "idle" }) {
  return (
    <span className={`progress-dot ${state}`} aria-hidden="true">
      {state === "done" ? <Check size={10} strokeWidth={3} /> : <span />}
    </span>
  );
}

function TopBar({ soundOn, onToggleSound }) {
  const dots = Array.from({ length: 19 }, (_, index) =>
    index === 0 ? "done" : index === 1 ? "active" : "idle",
  );

  return (
    <header className="topbar">
      <button className="course-select" type="button" aria-label="Select certificate">
        <Award size={24} />
        <span>PMP Project Management Professional</span>
        <ChevronDown size={20} />
      </button>

      <div className="module-progress" aria-label="Course progress">
        <div>{dots.slice(0, 10).map((state, index) => <ProgressDot key={index} state={state} />)}</div>
        <div>{dots.slice(10).map((state, index) => <ProgressDot key={index + 10} state={state} />)}</div>
      </div>

      <div className="top-actions">
        <button className="ghost-button" type="button" onClick={onToggleSound} aria-pressed={soundOn} aria-label={soundOn ? "Turn sound off" : "Turn sound on"}>
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span>{soundOn ? "Sound on" : "Sound off"}</span>
        </button>
        <button className="ghost-button" type="button">
          <X size={20} />
          <span>Quit</span>
        </button>
      </div>
    </header>
  );
}

function OutlinePanel({ open, activeIndex, highestUnlocked, onToggle, onSelect }) {
  return (
    <aside className={`outline ${open ? "open" : ""}`}>
      <button className="menu-button" type="button" onClick={onToggle} aria-label="Toggle study outline">
        <Menu size={24} />
      </button>

      {open && (
        <div className="outline-panel">
          <div className="outline-summary">
            <div>
              <strong>Lesson 1.4 Progress</strong>
              <span>{Math.round(((activeIndex + 1) / sections.length) * 100)}%</span>
            </div>
            <span className="summary-track"><span style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} /></span>
          </div>

          <section className="study-block">
            <div className="study-heading">
              <span>
                <BookOpen size={18} />
                PMBOK 8 Foundations
              </span>
              <span className="block-status active">{activeIndex + 1}</span>
            </div>

            <div className="lesson-list">
              {lessonList.map((lesson, index) => (
                <button
                  className={`lesson ${index === activeIndex ? "current" : ""}`}
                  type="button"
                  key={lesson}
                  onClick={() => onSelect(index)}
                  disabled={index > highestUnlocked}
                >
                  <Play size={18} fill="currentColor" />
                  <span>{lesson}</span>
              <small>{index + 1}/{lessonList.length}</small>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </aside>
  );
}

function ArcVisual() {
  const editions = [
    {
      name: "PMBOK 6",
      year: "2017",
      lines: ["49 processes", "10 Knowledge Areas", "5 Process Groups"],
      icon: Workflow,
      tone: "orange",
    },
    {
      name: "PMBOK 7",
      year: "2021",
      lines: ["0 processes", "12 Principles", "8 Domains"],
      icon: ShieldCheck,
      tone: "blue",
    },
    {
      name: "PMBOK 8",
      year: "2025",
      lines: ["40 processes + ITTOs", "6 Principles", "7 Performance Domains", "5 Focus Areas"],
      icon: Target,
      tone: "green",
    },
  ];

  return (
    <div className="arc-visual" aria-label="PMBOK edition arc">
      {editions.map((item, index) => {
        const Icon = item.icon;
        return (
        <React.Fragment key={item.name}>
          <motion.div className={`edition-card edition-${index} ${item.tone}`} whileHover={{ y: -4 }}>
            <div className="edition-icon"><Icon size={24} /></div>
            <div>
              <strong>{item.name}</strong>
              <span>{item.year}</span>
              <ul>
                {item.lines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
          </motion.div>
          {index < 2 && <span className={`arc-arrow ${item.tone}`}><ArrowRight size={22} /></span>}
        </React.Fragment>
        );
      })}
    </div>
  );
}

function MindsetVisual() {
  return (
    <div className="mindset-visual">
      {[
        [Gauge, "Proactive", "Anticipate rather than react"],
        [ShieldCheck, "Ownership", "Own outcomes, not just tasks"],
        [Target, "Value-driven", "Measure success by value delivered"],
      ].map(([Icon, title, text]) => (
        <motion.div className="mindset-pill" key={title} whileHover={{ scale: 1.03 }}>
          <Icon size={24} />
          <strong>{title}</strong>
          <span>{text}</span>
        </motion.div>
      ))}
    </div>
  );
}

function DomainVisual() {
  const domains = [
    [Factory, "Governance", "~9 processes"],
    [PackageCheck, "Scope", "requirements"],
    [Route, "Schedule", "sequencing"],
    [CircleDollarSign, "Finance", "first-class"],
    [Handshake, "Stakeholders", "~7 processes"],
    [Users, "Resources", "people/assets"],
    [Scale, "Risk", "threats/opportunities"],
  ];
  return (
    <div className="domain-wheel">
      {domains.map(([Icon, title, meta]) => (
        <motion.div className="domain-node" key={title} whileHover={{ rotate: -1, y: -3 }}>
          <Icon size={22} />
          <strong>{title}</strong>
          <span>{meta}</span>
        </motion.div>
      ))}
    </div>
  );
}

function IttoVisual() {
  return (
    <div className="itto-visual">
      {[
        [MapPinned, "Inputs", "What does it need to start?"],
        [Factory, "Tools & Techniques", "What does the real work?"],
        [PackageCheck, "Outputs", "What does it produce next?"],
      ].map(([Icon, title, text], index) => (
        <React.Fragment key={title}>
          <motion.div className="itto-step" whileHover={{ y: -4 }}>
            <Icon size={24} />
            <strong>{title}</strong>
            <span>{text}</span>
          </motion.div>
          {index < 2 && <ArrowRight className="flow-arrow" size={22} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function FocusVisual() {
  return (
    <div className="focus-visual">
      {["Initiating", "Planning", "Executing", "Monitoring & Controlling", "Closing"].map((item, index) => (
        <motion.div className="focus-step" key={item} whileHover={{ x: 4 }}>
          <span>{index + 1}</span>
          <strong>{item}</strong>
        </motion.div>
      ))}
    </div>
  );
}

function TermsVisual() {
  return (
    <div className="terms-visual">
      {[
        [Target, "Value Delivery"],
        [Leaf, "Sustainability"],
        [BriefcaseBusiness, "Business Environment"],
        [Recycle, "Tailoring"],
        [Cpu, "Artificial Intelligence"],
      ].map(([Icon, label]) => (
        <motion.div className="term-chip" key={label} whileHover={{ scale: 1.04 }}>
          <Icon size={18} />
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function SectionVisual({ type }) {
  if (type === "arc") return <ArcVisual />;
  if (type === "mindset") return <MindsetVisual />;
  if (type === "domains") return <DomainVisual />;
  if (type === "itto") return <IttoVisual />;
  if (type === "focus") return <FocusVisual />;
  return <TermsVisual />;
}

function SlideModal({ item, onClose, soundOn }) {
  const isMobile = useIsMobile();
  if (!item) return null;
  const image = imageForItem(item);
  const panelMotion = isMobile
    ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="modal-scrim" type="button" aria-label="Close detail" onClick={onClose} />
      <motion.aside
        className="slide-modal"
        initial={panelMotion.initial}
        animate={panelMotion.animate}
        exit={panelMotion.exit}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-modal-title"
      >
        <button className="drawer-close" type="button" onClick={onClose} aria-label="Close detail">
          <X size={18} />
        </button>
        <img className="modal-image" src={image} alt="" />
        <p className="mini-label">Detail</p>
        <h3 id="slide-modal-title">{item.title}</h3>
        <p>{item.body}</p>
        <div className="exam-lens compact">
          <Lightbulb size={18} />
          <span>{item.exam}</span>
        </div>
        <button className="modal-close-bottom" type="button" onClick={() => {
          playTone("tap", soundOn);
          onClose();
        }}>
          Mark as read
          <Check size={16} />
        </button>
      </motion.aside>
    </motion.div>
  );
}

function InteractionStatus({ done, total }) {
  const isComplete = done >= total;

  return (
    <div
      className={isComplete ? "interaction-status complete" : "interaction-status"}
      aria-live="polite"
      aria-label={`${done} of ${total} interactions completed`}
    >
      <span>{done}/{total} completed</span>
      <div role="progressbar" aria-valuenow={done} aria-valuemin="0" aria-valuemax={total}>
        <span style={{ width: `${(done / total) * 100}%` }} />
      </div>
    </div>
  );
}

function IntroInteraction({ section, onComplete }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className="intro-screen">
      <section className="intro-visual">
        <img src={stockImages.intro} alt="" />
      </section>

      <section className="intro-block">
        <div>
          <h3>What You'll Learn</h3>
          <ul>
            {section.cards[1].points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <div className="intro-block-icon"><Target size={22} /></div>
      </section>
    </div>
  );
}

function ModalInteraction({ section, onComplete, soundOn }) {
  const [active, setActive] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const required = section.cards.length;

  useEffect(() => {
    if (visited.size >= required) onComplete();
  }, [visited, required, onComplete]);

  const openModal = (card) => {
    playTone("tap", soundOn);
    setActive(card);
    setVisited((items) => new Set(items).add(card.title));
  };

  return (
    <div className="modal-activity">
      <div className="activity-instruction">
        <Sparkles size={18} />
        <span>Click each learning card below to explore the key shifts.</span>
      </div>

      <SectionVisual type={section.visual} />

      <div className="learning-panel">
        <div className="learning-panel-head">
          <div>
            <div>
              <h3>Complete these 2 learning cards to continue</h3>
              <p>Open both cards to unlock the next screen.</p>
            </div>
          </div>
          <span className={visited.size >= required ? "complete" : ""}>{visited.size} of {required} completed</span>
        </div>

        <div className="choice-grid two modal-choice-grid">
          {section.cards.map((card, index) => {
            const isMindset = index === 1;
            return (
              <button className={visited.has(card.title) ? "choice-card learning-card visited" : "choice-card learning-card"} type="button" key={card.title} onClick={() => openModal(card)} aria-label={`${visited.has(card.title) ? "Reviewed" : "Open"} ${card.title}`}>
                <div className="learning-icon">
                  {isMindset ? <Brain size={28} /> : <BookOpen size={28} />}
                </div>
                <div>
                  <strong>{isMindset ? "Mindset Shift" : "Vocabulary Shift"}</strong>
                  <small>{isMindset ? "The new way of thinking that PMBOK 8 promotes." : "How PMBOK 8 changes the language you need to know."}</small>
                  <em>{isMindset ? "Explore mindset changes" : "Explore vocabulary changes"} <ArrowRight size={14} /></em>
                </div>
                <b>{visited.has(card.title) ? "Viewed" : "Not started"}</b>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && <SlideModal item={active} onClose={() => setActive(null)} soundOn={soundOn} />}
      </AnimatePresence>
    </div>
  );
}

function PrincipleExplorerInteraction({ section, onComplete, soundOn }) {
  const principleMeta = [
    { icon: Network, tone: "blue", lens: "System lens" },
    { icon: Target, tone: "blue", lens: "Outcome lens" },
    { icon: ShieldCheck, tone: "blue", lens: "Quality lens" },
    { icon: Award, tone: "blue", lens: "Leadership lens" },
    { icon: Leaf, tone: "blue", lens: "Sustainability lens" },
    { icon: Users, tone: "blue", lens: "Culture lens" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(() => new Set([section.cards[0].title]));
  const active = section.cards[activeIndex];
  const activeMeta = principleMeta[activeIndex] || principleMeta[0];
  const ActiveIcon = activeMeta.icon;

  useEffect(() => {
    if (visited.size >= section.cards.length) onComplete();
  }, [visited, section.cards.length, onComplete]);

  const selectPrinciple = (index) => {
    playTone("tap", soundOn);
    setActiveIndex(index);
    setVisited((items) => new Set(items).add(section.cards[index].title));
  };

  return (
    <div className="principle-explorer">
      <div className="activity-instruction">
        <Sparkles size={18} />
        <span>Select each principle lens to build the six-part mindset.</span>
      </div>

      <MindsetVisual />

      <div className="principle-workbench">
        <div className="principle-picker" aria-label="Project management principles">
          {section.cards.map((card, index) => {
            const meta = principleMeta[index] || principleMeta[0];
            const Icon = meta.icon;
            const isActive = index === activeIndex;
            const isVisited = visited.has(card.title);
            return (
              <button
                className={`principle-tile ${meta.tone} ${isActive ? "active" : ""} ${isVisited ? "visited" : ""}`}
                type="button"
                key={card.title}
                onClick={() => selectPrinciple(index)}
                aria-pressed={isActive}
              >
                <span className="principle-icon">
                  {isVisited ? <Check size={18} /> : <Icon size={20} />}
                </span>
                <span>
                  <strong>{card.title}</strong>
                  <small>{meta.lens}</small>
                </span>
                <ArrowRight size={16} />
              </button>
            );
          })}
        </div>

        <motion.article
          className={`principle-detail ${activeMeta.tone}`}
          key={active.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <span className="principle-detail-icon"><ActiveIcon size={26} /></span>
          <div className="principle-detail-head">
            <div>
              <p className="mini-label">Selected Principle</p>
              <h3>{active.title}</h3>
            </div>
          </div>
          <p className="principle-preview">{active.preview}</p>
          <p>{active.body}</p>
          <div className="exam-lens compact"><Lightbulb size={18} /><span>{active.exam}</span></div>
          <div className="principle-next-row">
            <span className={visited.size >= section.cards.length ? "complete" : ""}>{visited.size} of {section.cards.length} explored</span>
            <button
              type="button"
              onClick={() => selectPrinciple((activeIndex + 1) % section.cards.length)}
            >
              Next lens
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.article>
      </div>

      <InteractionStatus done={visited.size} total={section.cards.length} />
    </div>
  );
}

function DomainHotspotInteraction({ section, onComplete, soundOn }) {
  const domains = [
    { title: "Governance", preview: "Oversight, decisions, authorization.", body: "Oversight, decisions, authorization, and strategic sourcing. It is the largest domain at roughly nine processes.", exam: "Governance is where project decisions connect upward to organizational control.", icon: Factory },
    { title: "Scope", preview: "Requirements and deliverables.", body: "Requirements and deliverables. It keeps the project clear about what is included and what is not.", exam: "Scope answers often involve requirements clarity and deliverable boundaries.", icon: PackageCheck },
    { title: "Schedule", preview: "Timeline and sequencing.", body: "Timeline, sequencing, dependencies, and the practical flow of work.", exam: "Schedule is about the logic of when work happens, not just dates.", icon: Route },
    { title: "Finance", preview: "Budget, funding, value tracking.", body: "Budget, funding, and value tracking. PMBOK 8 promotes Finance to first-class visibility.", exam: "Do not treat finance as background administration.", icon: CircleDollarSign },
    { title: "Stakeholders", preview: "Engagement and communication.", body: "Engagement, communication, expectations, and influence. Roughly seven processes sit here.", exam: "People-facing scenarios often pull from this domain.", icon: Handshake },
    { title: "Resources", preview: "People, teams, physical assets.", body: "People, teams, physical assets, and capacity needed to do the work.", exam: "Resource questions reward balancing people and constraints.", icon: Users },
    { title: "Risk", preview: "Threats and opportunities.", body: "Threats and opportunities, handled continuously rather than once.", exam: "Risk is proactive; wait-and-see answers are usually weak.", icon: Scale },
  ];
  const [active, setActive] = useState(domains[0]);
  const [visited, setVisited] = useState(new Set());

  useEffect(() => {
    if (visited.size >= domains.length) onComplete();
  }, [visited, domains.length, onComplete]);

  const select = (domain) => {
    playTone("tap", soundOn);
    setActive(domain);
    setVisited((items) => new Set(items).add(domain.title));
  };
  const ActiveIcon = active.icon;

  return (
    <div className="module-explorer">
      <aside className="module-list" aria-label="Performance domain selector">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <button
              className={`${active.title === domain.title ? "active" : ""} ${visited.has(domain.title) ? "visited" : ""}`}
              type="button"
              key={domain.title}
              onClick={() => select(domain)}
              aria-pressed={active.title === domain.title}
            >
              <span className="module-list-icon">{visited.has(domain.title) ? <Check size={22} /> : <Icon size={22} />}</span>
              <span>
                <small>Performance Domain</small>
                <strong>{domain.title}</strong>
              </span>
            </button>
          );
        })}
      </aside>
      <article className={visited.has(active.title) ? "module-detail visited" : "module-detail"}>
        <ActiveIcon className="module-detail-icon" size={76} strokeWidth={1.8} />
        <p className="mini-label">Seven Performance Domains</p>
        <h3>{active.title}</h3>
        <p>{active.body}</p>
        <h4>In this domain, remember:</h4>
        <div className="module-bullet-list">
          <div><span>&bull;</span><strong>{active.preview}</strong></div>
          <div><span>&bull;</span><strong>{active.exam}</strong></div>
        </div>
        <h4>Related lesson notes:</h4>
        <div className="module-mini-cards">
          {section.cards.map((card) => (
            <div key={card.title}>
              <strong>{card.title}</strong>
              <p>{card.preview}</p>
            </div>
          ))}
        </div>
      </article>
      <InteractionStatus done={visited.size} total={domains.length} />
    </div>
  );
}

function TimelineInteraction({ section, onComplete, soundOn }) {
  const steps = ["Initiating", "Planning", "Executing", "Monitoring & Controlling", "Closing"].map((title, index) => ({
    title,
    body: `${title} is a Focus Area: a type of project management attention you may bring repeatedly depending on the approach and context.`,
    exam: "Rule out answers that force a rigid sequence in adaptive or hybrid scenarios.",
    icon: [Play, MapPinned, Workflow, Gauge, Check][index] || PanelsTopLeft,
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [checked, setChecked] = useState(new Set());
  const total = steps.length + section.cards.length;
  const done = visited.size + checked.size;

  useEffect(() => {
    if (done >= total) onComplete();
  }, [done, total, onComplete]);

  const select = (index) => {
    playTone("tap", soundOn);
    setActiveIndex(index);
    setVisited((items) => new Set(items).add(index));
  };

  return (
    <div className="module-explorer focus-module">
      <aside className="module-list" aria-label="Focus area selector">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              className={`${index === activeIndex ? "active" : ""} ${visited.has(index) ? "visited" : ""}`}
              type="button"
              key={step.title}
              onClick={() => select(index)}
              aria-pressed={index === activeIndex}
            >
              <span className="module-list-icon">{visited.has(index) ? <Check size={22} /> : <Icon size={22} />}</span>
              <span>
                <small>Focus Area</small>
                <strong>{step.title}</strong>
              </span>
            </button>
          );
        })}
      </aside>
      <article className={visited.has(activeIndex) ? "module-detail visited" : "module-detail"}>
        {React.createElement(steps[activeIndex].icon, { className: "module-detail-icon", size: 76, strokeWidth: 1.8 })}
        <p className="mini-label">Process Groups Become Focus Areas</p>
        <h3>{steps[activeIndex].title}</h3>
        <p>{steps[activeIndex].body}</p>
        <h4>Exam implication:</h4>
        <div className="module-bullet-list">
          <div><span>&bull;</span><strong>{steps[activeIndex].exam}</strong></div>
        </div>
        <h4>Complete these reading checks:</h4>
        <div className="read-checks">
          {section.cards.map((card) => (
            <label key={card.title}>
              <input type="checkbox" checked={checked.has(card.title)} onChange={() => {
                playTone("tap", soundOn);
                setChecked((items) => {
                const next = new Set(items);
                next.has(card.title) ? next.delete(card.title) : next.add(card.title);
                return next;
              });
              }} />
              <span>{card.title}</span>
            </label>
          ))}
        </div>
      </article>
      <InteractionStatus done={done} total={total} />
    </div>
  );
}

function FlipCardInteraction({ section, onComplete, soundOn }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(new Set());
  const activeCard = section.cards[activeIndex];
  const isFlipped = flipped.has(activeCard.title);

  useEffect(() => {
    if (flipped.size >= section.cards.length) onComplete();
  }, [flipped, section.cards.length, onComplete]);

  const flipActiveCard = () => {
    playTone("tap", soundOn);
    setFlipped((items) => new Set(items).add(activeCard.title));
  };

  const goToCard = (index) => {
    playTone("tap", soundOn);
    setActiveIndex(index);
  };

  return (
    <div className="flip-experience">
      <div className="activity-instruction">
        <Sparkles size={18} />
        <span>Flip each term card to reveal the exam implication.</span>
      </div>
      <div className="single-flip-layout">
        <div className="flip-card-shell">
          <motion.button
            className={isFlipped ? "flip-card-3d-button flipped" : "flip-card-3d-button"}
            type="button"
            onClick={flipActiveCard}
            aria-label={`${isFlipped ? "Review" : "Flip"} ${activeCard.title}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.span
              className="flip-card-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flip-face flip-front">
                <span className="flip-orbit" aria-hidden="true"><Sparkles size={28} /></span>
                <span className="flip-kicker">Term card</span>
                <strong>{activeCard.title}</strong>
                <span className="flip-preview">{activeCard.preview}</span>
                <em>Click to flip <ArrowRight size={14} /></em>
              </span>
              <span className="flip-face flip-back">
                <span className="flip-orbit success" aria-hidden="true"><Check size={30} /></span>
                <span className="flip-kicker">Exam implication</span>
                <strong>{activeCard.body}</strong>
                <small>
                  <Lightbulb size={18} />
                  {activeCard.exam}
                </small>
                <em>Revealed</em>
              </span>
            </motion.span>
          </motion.button>
        </div>
        <div className="flip-stepper" aria-label="Term cards">
          {section.cards.map((card, index) => {
            const isVisited = flipped.has(card.title);
            const isActive = index === activeIndex;
            return (
              <button
                className={`${isActive ? "active" : ""} ${isVisited ? "visited" : ""}`}
                type="button"
                key={card.title}
                onClick={() => goToCard(index)}
                aria-current={isActive ? "step" : undefined}
              >
                <span>{card.title}</span>
                {isVisited && <Check size={16} />}
              </button>
            );
          })}
        </div>
        <div className="flip-actions">
          <button
            type="button"
            className="secondary-action"
            onClick={() => goToCard(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
          >
            Previous term
          </button>
          <button
            type="button"
            className="primary-action"
            onClick={() => goToCard(Math.min(activeIndex + 1, section.cards.length - 1))}
            disabled={!isFlipped || activeIndex === section.cards.length - 1}
          >
            Next term
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <InteractionStatus done={flipped.size} total={section.cards.length} />
    </div>
  );
}

function CheckboxInteraction({ section, onComplete, soundOn }) {
  const checks = [
    "Inputs start the process.",
    "Tools and techniques do the real work.",
    "Outputs feed the next process.",
    ...section.cards.map((card) => card.title),
  ];
  const [checked, setChecked] = useState(new Set());

  useEffect(() => {
    if (checked.size >= checks.length) onComplete();
  }, [checked.size, checks.length, onComplete]);

  return (
    <div className="itto-check-layout">
      <div className="prompt-panel">
        <div className="activity-instruction">
          <Sparkles size={18} />
          <span>Review the flow, then tick each idea as read.</span>
        </div>
        <SectionVisual type={section.visual} />
        <div className="callout-line">Learn the logic of the flow, not the lists.</div>
      </div>
      <div className="detail-panel">
        <p className="mini-label">Mark as read</p>
        <h3>Complete the ITTO logic checks</h3>
        <div className="read-checks large">
          {checks.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={checked.has(item)}
                onChange={() => {
                  playTone("tap", soundOn);
                  setChecked((items) => {
                  const next = new Set(items);
                  next.has(item) ? next.delete(item) : next.add(item);
                  return next;
                });
                }}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <InteractionStatus done={checked.size} total={checks.length} />
      </div>
    </div>
  );
}

function SectionActivity({ section, onComplete, soundOn }) {
  if (section.title === "Lesson Overview") return <IntroInteraction section={section} onComplete={onComplete} />;
  if (section.title === "Why PMBOK 8 Exists") return <ModalInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
  if (section.title === "Six Principles, One Mindset") return <PrincipleExplorerInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
  if (section.title === "Seven Performance Domains") return <DomainHotspotInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
  if (section.title === "Forty Non-Prescriptive Processes") return <CheckboxInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
  if (section.title === "Process Groups Become Focus Areas") return <TimelineInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
  return <FlipCardInteraction section={section} onComplete={onComplete} soundOn={soundOn} />;
}

function LessonSection({ section, activeIndex, onComplete, isComplete, soundOn }) {
  const isSectionOne = section.title === "Why PMBOK 8 Exists";

  return (
    <motion.section
      className="lesson-content"
      key={section.title}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className={isSectionOne ? "lesson-hero section-one-hero" : "lesson-hero"}>
        <div className="hero-copy">
          {isSectionOne && <p className="lesson-pill">Lesson 1.4</p>}
          {!isSectionOne && <p className="eyebrow">{section.eyebrow}</p>}
          <h1>{section.title}</h1>
          <p>{section.subtitle}</p>
        </div>
      </div>

      <SectionActivity section={section} onComplete={onComplete} soundOn={soundOn} />

      <AnimatePresence>
        {isComplete && (
          <motion.div className="anchor" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Check size={20} />
            <span>{section.anchor}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [completed, setCompleted] = useState(() => Array(sections.length).fill(false));
  const current = sections[activeIndex];
  const highestUnlocked = completed.findIndex((item) => !item);
  const unlockedLimit = highestUnlocked === -1 ? sections.length - 1 : highestUnlocked;
  const canContinue = completed[activeIndex];

  const markComplete = useCallback((index) => {
    setCompleted((items) => {
      if (items[index]) return items;
      if (index !== 0) playTone("success", soundOn);
      return items.map((item, itemIndex) => (itemIndex === index ? true : item));
    });
  }, [soundOn]);
  const completeCurrentSection = useCallback(() => markComplete(activeIndex), [activeIndex, markComplete]);

  const goNext = () => {
    if (!canContinue) return;
    setActiveIndex((index) => Math.min(index + 1, sections.length - 1));
  };
  const goPrev = () => setActiveIndex((index) => Math.max(index - 1, 0));
  const selectSection = (index) => {
    if (index <= unlockedLimit) setActiveIndex(index);
  };

  return (
    <main className="app-shell">
      <TopBar soundOn={soundOn} onToggleSound={() => setSoundOn((value) => !value)} />
      <section className="workspace">
        <div className="lesson-stage">
          <OutlinePanel
            open={outlineOpen}
            activeIndex={activeIndex}
            highestUnlocked={unlockedLimit}
            onToggle={() => setOutlineOpen((value) => !value)}
            onSelect={selectSection}
          />
          <div className="content-column">
            <article className="lesson-card">
              <div className={activeIndex === 0 ? "lesson-card-top" : "lesson-card-top compact"}>
                {activeIndex === 0 && (
                  <div>
                    <h2>Lesson 1.4: What's New in PMBOK 8</h2>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                <LessonSection
                  section={current}
                  activeIndex={activeIndex}
                  isComplete={completed[activeIndex]}
                  soundOn={soundOn}
                  onComplete={completeCurrentSection}
                  key={current.title}
                />
              </AnimatePresence>

              <footer className="nav-footer">
                <button className="secondary-button" type="button" onClick={goPrev} disabled={activeIndex === 0}>
                  <ArrowLeft size={20} />
                  Prev
                </button>
                <button className="primary-button" type="button" onClick={goNext} disabled={!canContinue}>
                  {!canContinue ? "Complete interactions" : activeIndex === sections.length - 1 ? "Complete" : "Continue"}
                  <ArrowRight size={20} />
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
