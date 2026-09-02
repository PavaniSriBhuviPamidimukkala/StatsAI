import { useEffect,useMemo, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'

import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  GraduationCap,
  History as HistoryIcon,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  X,
} from 'lucide-react'

import { STATS_DATA } from './data/mockData.js'
import { apiRequest } from './api'
import { ROLE_QUESTION_BANKS } from './data/questions.js'
import { COURSE_CATALOG } from './data/courses.js'
import { evaluateAssessment } from './logic/assessmentEngine'
import ContentGeneration from './pages/ContentGeneration'
import './index.css'

type Profile = any
type Report = any

const PKEY = 'stats_ai_profile'
const RKEY = 'stats_ai_report'
const HKEY = 'stats_ai_history'
const AK = 'stats_ai_answers'

const get = (key: string, defaultValue: any) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? defaultValue
  } catch {
    return defaultValue
  }
}

const save = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value))

const defaultProfile = (STATS_DATA as any).profiles[0]

/* =========================================================
   LAYOUT
========================================================= */

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const nav = [
    ['/dashboard', 'Dashboard', LayoutDashboard],
    ['/profile', 'Official Profile', UserRound],
    ['/assessment', 'Assessment', ClipboardCheck],
    ['/skill-profile', 'Skill Profile', BarChart3],
    ['/skill-gap', 'Skill Gap', Target],
    ['/learning', 'Learning Path', GraduationCap],
    ['/content-generation', 'AI Content Generation', Sparkles],
    ['/ai-quiz', 'AI Quiz', FileQuestion],
    ['/performance', 'Performance', Activity],
    ['/history', 'Assessment History', HistoryIcon],
    ['/assistant', 'AI Assistant', Bot],
    ['/admin', 'Admin Analytics', ShieldCheck],
  ] as const

  return (
    <div className="shell">
      <button
        className="mobileMenu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <aside className={'sidebar ' + (open ? 'show' : '')}>
        <div className="brand">
          <div className="brandIcon">
            <BrainCircuit size={22} />
          </div>

          <div>
            <div className="brandName">Stats AI</div>
            <div className="brandSub">Skill Intelligence</div>
          </div>
        </div>

        <nav>
          {nav.map(([to, label, Icon]) => (
            <a
              key={to}
              href={to}
              onClick={() => setOpen(false)}
              className="navItem"
            >
              <Icon size={17} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="sideNote">
          <b>AI Skill Intelligence</b>

          <span>
            Competency-based continuous learning for Official Statistics.
          </span>

          <small>iGOT / NSSTA • API-ready</small>
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  )
}

/* =========================================================
   HEADER / COMMON UI
========================================================= */

function Header({
  title,
  sub,
}: {
  title: string
  sub: string
}) {
  return (
    <div className="header">
      <div>
        <div className="eyebrow">
          STATS AI • OFFICIAL STATISTICS
        </div>

        <h1>{title}</h1>

        <p>{sub}</p>
      </div>

      <div className="status">
        <i /> AI-Powered Platform
      </div>
    </div>
  )
}

function Button({
  children,
  onClick,
  kind = 'primary',
  disabled = false,
}: {
  children: React.ReactNode
  onClick?: () => void
  kind?: 'primary' | 'ghost'
  disabled?: boolean
}) {
  return (
    <button
      className={kind}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: any
}) {
  return (
    <div className="statCard">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  profile,
  report,
}: {
  profile: Profile
  report: Report
}) {
  const nav = useNavigate()

  const score = report?.overallScore ?? 0

  const gaps =
    report?.primarySkillGaps
      ?.map((x: any) => x.topic)
      .join(', ') || 'Complete assessment'

  return (
    <>
      <Header
        title="AI-enabled Skill Intelligence & Learning Platform"
        sub="Personalized competency assessment and learning for India's Official Statistical System."
      />

      <section className="hero">
        <div>
          <div className="eyebrow">
            PERSONALIZED LEARNING
          </div>

          <h2>
            Welcome, {profile?.name || 'Official'}
          </h2>

          <p>
            Role: <b>{profile?.designation}</b>. Stats AI
            compares your current competencies with role
            benchmarks, identifies skill gaps, and creates a
            targeted learning path.
          </p>

          <Button
            onClick={() => nav('/assessment')}
          >
            {report
              ? 'Retake Assessment'
              : 'Start Competency Assessment'}
          </Button>
        </div>

        <div className="heroMetric">
          <strong>
            {report ? score + '%' : '—'}
          </strong>

          <span>Latest assessment score</span>
        </div>
      </section>

      <div className="grid4">
        <Stat
          label="Current Role"
          value={profile?.designation}
        />

        <Stat
          label="Experience"
          value={`${profile?.experienceYears || 0} years`}
        />

        <Stat
          label="Primary Gap"
          value={gaps}
        />

        <Stat
          label="Learning Status"
          value={
            report
              ? 'Path generated'
              : 'Assessment pending'
          }
        />
      </div>

      <div className="grid2">
        <Panel title="Competency Journey">
          <Flow />
        </Panel>

        <Panel title="What Stats AI does">
          <ul className="clean">
            <li>
              <CheckCircle2 />
              Builds a role-aware competency profile
            </li>

            <li>
              <CheckCircle2 />
              Detects knowledge and skill gaps
            </li>

            <li>
              <CheckCircle2 />
              Ranks iGOT / NSSTA learning options
            </li>

            <li>
              <CheckCircle2 />
              Uses quizzes and performance feedback to
              update the profile
            </li>
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* =========================================================
   FLOW
========================================================= */

function Flow() {
  return (
    <div className="flow">
      {[
        'Profile',
        'Assess',
        'Identify Gap',
        'Recommend',
        'Learn',
        'AI Quiz',
        'Update',
      ].map((x, i) => (
        <div key={x} className="flowItem">
          <span>{i + 1}</span>

          <b>{x}</b>

          {i < 6 && <em>→</em>}
        </div>
      ))}
    </div>
  )
}

/* =========================================================
   PROFILE
========================================================= */

function ProfilePage({
  profile,
  setProfile,
}: {
  profile: Profile
  setProfile: (p: Profile) => void
}) {
  const [p, setP] = useState({ ...profile })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const roles = Object.keys(
    (STATS_DATA as any).roleRequirements
  )

  const saveP = async () => {
    setSaving(true)
    setMessage('Saving profile...')

    try {
      const response = await apiRequest(
        '/official/profile',
        {
          method: 'POST',
          body: JSON.stringify({
            name: p.name,
            designation: p.designation,
            department: p.department,
            experience_years:
              p.experienceYears || 0,
            education: p.batch || '',
          }),
        }
      )

      // Store the backend-generated official ID
      const updatedProfile = {
        ...p,
        ...response,
        id: response.id,
      }

      // Update both local and application-wide profile
      setP(updatedProfile)
      setProfile(updatedProfile)

      setMessage(
        'Profile saved successfully.'
      )

      console.log(
        'Official profile saved:',
        updatedProfile
      )
    } catch (error) {
      console.error(
        'Profile backend error:',
        error
      )

      // Keep local saving available
      setProfile(p)

      setMessage(
        'Profile saved locally. Backend could not be reached.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Header
        title="Official Profile"
        sub="Role, experience and training context used for competency mapping."
      />

      <div className="grid2">
        <Panel title="Profile details">
          <div className="profileTop">
            <div className="avatar">
              {(p.name || 'O')
                .split(' ')
                .map(
                  (x: string) => x[0]
                )
                .join('')
                .slice(0, 2)}
            </div>

            <div>
              <h2>{p.name}</h2>
              <p>{p.department}</p>
            </div>
          </div>

          <div className="formGrid">
            {[
              ['name', 'Name'],
              ['email', 'Official Email'],
              ['department', 'Department'],
              [
                'experienceYears',
                'Experience (years)',
              ],
              ['batch', 'Batch'],
              ['zone', 'Location'],
            ].map(([k, l]) => (
              <label key={k}>
                {l}

                <input
                  value={
                    (p as any)[k] ?? ''
                  }
                  onChange={(e) =>
                    setP({
                      ...p,
                      [k]:
                        k ===
                        'experienceYears'
                          ? Number(
                              e.target.value
                            )
                          : e.target.value,
                    })
                  }
                />
              </label>
            ))}

            <label>
              Designation

              <select
                value={p.designation}
                onChange={(e) => {
                  const r =
                    e.target.value

                  const req =
                    (STATS_DATA as any)
                      .roleRequirements[r]

                  setP({
                    ...p,
                    designation: r,
                    currentCompetencies:
                      Object.fromEntries(
                        Object.keys(
                          req
                        ).map(
                          (k) => [
                            k,
                            0,
                          ]
                        )
                      ),
                  })
                }}
              >
                {roles.map((r) => (
                  <option
                    key={r}
                    value={r}
                  >
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="actions">
            <Button
              onClick={saveP}
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : 'Save Official Profile'}
            </Button>
          </div>

          {message && (
            <p
              style={{
                marginTop: '12px',
              }}
            >
              {message}
            </p>
          )}
        </Panel>

        <Panel title="Role competency benchmark">
          <p>
            These benchmarks define the
            expected proficiency for the
            selected role.
          </p>

          <div className="benchmarkGrid">
            {Object.entries(
              (STATS_DATA as any)
                .roleRequirements[
                p.designation
              ] || {}
            ).map(([k, v]) => (
              <div
                className="benchmark"
                key={k}
              >
                <span>{k}</span>
                <b>{String(v)}%</b>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
/* =========================================================
   ASSESSMENT
========================================================= */

function AssessmentPage({
  profile,
  setReport,
  setProfile,
}: {
  profile: Profile
  setReport: (r: Report) => void
  setProfile: (p: Profile) => void
}) {
  const nav = useNavigate()

  const qs: any[] =
    ((ROLE_QUESTION_BANKS as any)[profile.designation] || [])

  const [answers, setAnswers] =
    useState<Record<string, number>>({})

  const [idx, setIdx] = useState(0)

  const [submitting, setSubmitting] =
    useState(false)

  const [apiMessage, setApiMessage] =
    useState('')

  const q = qs[idx]

  if (!q) {
    return (
      <Panel title="Assessment unavailable">
        <p>
          No question bank is configured for this role.
        </p>
      </Panel>
    )
  }

  const finish = async () => {
    const r = evaluateAssessment(qs, answers)

    setReport(r)

    // Save assessment locally
    const hist = get(HKEY, [])

    save(HKEY, [
      {
        id: 'ASSESS-' + Date.now(),
        title:
          'Assessment - ' + profile.designation,
        date: new Date().toLocaleString('en-IN'),
        overallScore: r.overallScore,
        totalQuestions: r.totalQuestions,
        correctAnswers: r.correctCount,
        strongestTopic:
          r.strongestCompetency?.topic,
        strongestScore:
          r.strongestCompetency?.score,
        primarySkillGap:
          r.primarySkillGap?.topic,
        primaryGapScore:
          r.primarySkillGap?.score,
        status: 'COMPLETED',
        topicBreakdown: Object.fromEntries(
          r.topicBreakdown.map((x: any) => [
            x.topic,
            x.score,
          ])
        ),
      },
      ...hist,
    ])

    // Update frontend competency profile
    setProfile({
      ...profile,
      currentCompetencies:
        Object.fromEntries(
          r.topicBreakdown.map((x: any) => [
            x.topic,
            x.score,
          ])
        ),
    })

    save(AK, answers)

    // Send assessment result to FastAPI backend
    setSubmitting(true)
    setApiMessage('Saving assessment to backend...')

    try {
      const officialId =
        (profile as any).id ||
        (profile as any).official_id

      if (!officialId) {
        throw new Error(
          'Official profile ID is missing. Please save the Official Profile first.'
        )
      }

      const topicScores = Object.fromEntries(
        r.topicBreakdown.map((x: any) => [
          x.topic,
          x.score,
        ])
      )

      const skillGaps = r.topicBreakdown
        .filter((x: any) => x.score < 60)
        .map((x: any) => x.topic)

      const response = await apiRequest(
        '/assessment/submit',
        {
          method: 'POST',
          body: JSON.stringify({
            official_id: Number(officialId),
            score: r.overallScore,
            topic_scores: topicScores,
            skill_gaps: skillGaps,
          }),
        }
      )

      console.log(
        'Assessment saved to backend:',
        response
      )

      setApiMessage(
        'Assessment saved successfully.'
      )
    } catch (error) {
      console.error(
        'Assessment backend error:',
        error
      )

      setApiMessage(
        'Assessment saved locally. Backend sync was unavailable.'
      )
    } finally {
      setSubmitting(false)

      setTimeout(() => {
        nav('/skill-gap')
      }, 700)
    }
  }

  return (
    <>
      <Header
        title="AI Competency Assessment"
        sub={`Role-calibrated assessment • ${qs.length} questions • topic tags are hidden during assessment.`}
      />

      <div className="assessment">
        <div className="progressLine">
          <span>
            Question {idx + 1} of {qs.length}
          </span>

          <span>
            {Math.round(
              (idx / qs.length) * 100
            )}
            %
          </span>
        </div>

        <div className="track">
          <i
            style={{
              width: `${((idx + 1) / qs.length) * 100}%`,
            }}
          />
        </div>

        <section className="panel question">
          <div className="questionMeta">
            <span>
              {q.difficulty || 'Role calibrated'}
            </span>

            <small>
              Adaptive competency check
            </small>
          </div>

          <h2>{q.question}</h2>

          <div className="options">
            {q.options.map(
              (o: string, i: number) => (
                <button
                  className={
                    answers[q.id] === i
                      ? 'selected'
                      : ''
                  }
                  key={o}
                  onClick={() =>
                    setAnswers({
                      ...answers,
                      [q.id]: i,
                    })
                  }
                >
                  <b>
                    {String.fromCharCode(
                      65 + i
                    )}
                  </b>

                  <span>{o}</span>
                </button>
              )
            )}
          </div>

          {apiMessage && (
            <p
              style={{
                marginTop: 16,
                fontSize: 14,
                opacity: 0.8,
              }}
            >
              {apiMessage}
            </p>
          )}

          <div className="actions">
            <Button
              kind="ghost"
              disabled={
                idx === 0 || submitting
              }
              onClick={() =>
                setIdx(idx - 1)
              }
            >
              Previous
            </Button>

            {idx === qs.length - 1 ? (
              <Button
                onClick={finish}
                disabled={
                  answers[q.id] === undefined ||
                  submitting
                }
              >
                {submitting
                  ? 'Saving...'
                  : 'Submit Assessment'}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setIdx(idx + 1)
                }
                disabled={
                  answers[q.id] === undefined
                }
              >
                Next Question
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

/* =========================================================
   SKILL GAP
========================================================= */

function SkillGapPage({
  profile,
  report,
}: {
  profile: Profile
  report: Report
}) {
  const nav = useNavigate()

  const [backendGaps, setBackendGaps] =
    useState<string[]>([])

  const [backendScores, setBackendScores] =
    useState<Record<string, number>>({})

  const [loading, setLoading] =
    useState(true)

  const [message, setMessage] =
    useState('')

  useEffect(() => {
    const loadSkillGaps = async () => {
      try {
        const officialId =
          (profile as any).id ||
          (profile as any).official_id

        if (!officialId) {
          throw new Error(
            'Official profile ID is missing.'
          )
        }

        // Get latest skill profile
        const skillProfile =
          await apiRequest(
            `/skills/profile/${officialId}`
          )

        // Get detected skill gaps
        const gaps =
          await apiRequest(
            `/skills/gaps/${officialId}`
          )

        console.log(
          'Skill profile:',
          skillProfile
        )

        console.log(
          'Skill gaps:',
          gaps
        )

        setBackendScores(
          skillProfile.topic_scores || {}
        )

        setBackendGaps(
          gaps.skill_gaps || []
        )
      } catch (error) {
        console.error(
          'Skill gap backend error:',
          error
        )

        setMessage(
          'Showing locally calculated skill gaps.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadSkillGaps()
  }, [profile])

  if (!report && backendGaps.length === 0) {
    if (loading) {
      return (
        <>
          <Header
            title="Skill Gap"
            sub="Your competency gaps appear after completing the assessment."
          />

          <Panel title="Skill-Gap Analysis">
            <p>
              Loading your competency gaps...
            </p>
          </Panel>
        </>
      )
    }

    return (
      <>
        <Header
          title="Skill Gap"
          sub="Your competency gaps appear after completing the assessment."
        />

        <div className="empty panel">
          <Target size={42} />

          <h2>Assessment required</h2>

          <p>
            Take the role-based assessment to
            generate your current skill profile
            and personalized gaps.
          </p>

          <Button
            onClick={() =>
              nav('/assessment')
            }
          >
            Start Assessment
          </Button>
        </div>
      </>
    )
  }

  const req =
    (STATS_DATA as any).roleRequirements[
      profile.designation
    ] || {}

  /*
   * Use backend scores when available.
   * Otherwise use the existing assessment report.
   */
  const getCurrentScore = (
    topic: string
  ) => {
    if (
      backendScores &&
      backendScores[topic] !== undefined
    ) {
      return Number(
        backendScores[topic]
      )
    }

    return (
      report?.topicBreakdown?.find(
        (x: any) =>
          x.topic === topic
      )?.score ??
      profile.currentCompetencies?.[
        topic
      ] ??
      0
    )
  }

  /*
   * Determine primary gaps.
   */
  const calculatedGaps = Object.entries(
    req
  )
    .map(([topic, target]: any) => {
      const current =
        getCurrentScore(topic)

      return {
        topic,
        target: Number(target),
        current,
        gap: Math.max(
          0,
          Number(target) - current
        ),
      }
    })
    .filter(
      (x) => x.gap > 0
    )
    .sort(
      (a, b) =>
        b.gap - a.gap
    )

  const primaryGaps =
    calculatedGaps.length
      ? calculatedGaps
      : []

  return (
    <>
      <Header
        title="Skill-Gap Analysis"
        sub="Current performance compared with the benchmark for your official role."
      />

      <Panel title="Competency gap map">
        <div className="gapTable">
          {Object.entries(req).map(
            ([topic, target]: any) => {
              const current =
                getCurrentScore(topic)

              const gap = Math.max(
                0,
                Number(target) -
                  current
              )

              return (
                <div
                  className="gapRow"
                  key={topic}
                >
                  <div>
                    <strong>
                      {topic}
                    </strong>

                    <span>
                      Target {target}%
                    </span>
                  </div>

                  <div>
                    <div className="barLabels">
                      <span>
                        Current
                      </span>

                      <b>
                        {current}%
                      </b>
                    </div>

                    <div className="miniBar">
                      <i
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              current
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={
                      gap >= 30
                        ? 'high'
                        : gap > 0
                        ? 'medium'
                        : 'none'
                    }
                  >
                    {gap > 0
                      ? `${gap}% gap`
                      : 'On target'}
                  </div>

                  <em>
                    {gap >= 30
                      ? 'Critical'
                      : gap > 0
                      ? 'Improve'
                      : 'Strong'}
                  </em>
                </div>
              )
            }
          )}
        </div>
      </Panel>

      <div className="grid2">
        <Panel title="Primary skill gap">
          {primaryGaps.length > 0 ? (
            <>
              <h2 className="bigGap">
                {primaryGaps
                  .slice(0, 2)
                  .map(
                    (x) =>
                      x.topic
                  )
                  .join(' / ')}
              </h2>

              <p>
                These competencies have the
                largest difference between
                your current proficiency and
                the expected benchmark for
                your role.
              </p>
            </>
          ) : (
            <p>
              No significant skill gap detected.
              Your current competencies meet the
              defined role benchmarks.
            </p>
          )}
        </Panel>

        <Panel title="Detected skill gaps">
          {backendGaps.length > 0 ? (
            <ul className="weakList">
              {backendGaps.map(
                (gap) => (
                  <li key={gap}>
                    {gap}
                  </li>
                )
              )}
            </ul>
          ) : primaryGaps.length > 0 ? (
            <ul className="weakList">
              {primaryGaps.map(
                (gap) => (
                  <li key={gap.topic}>
                    {gap.topic}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              No skill gaps detected.
            </p>
          )}
        </Panel>
      </div>

      {message && (
        <p
          style={{
            marginTop: '12px',
            fontSize: '14px',
            opacity: 0.75,
          }}
        >
          {message}
        </p>
      )}
    </>
  )
}

/* =========================================================
   SKILL PROFILE
========================================================= */

function SkillProfile({
  profile,
  report,
}: {
  profile: Profile
  report: Report
}) {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadSkillProfile = async () => {
      try {
        const officialId =
          (profile as any).id ||
          (profile as any).official_id

        if (!officialId) {
          throw new Error(
            'Official profile ID is missing.'
          )
        }

        const response = await apiRequest(
          `/skills/profile/${officialId}`
        )

        console.log(
          'Skill profile from backend:',
          response
        )

        const backendRows =
          Object.entries(
            response.topic_scores || {}
          ).map(
            ([topic, score]) => ({
              topic,
              score: Number(score),
              category:
                Number(score) >= 80
                  ? 'STRONG'
                  : Number(score) >= 60
                  ? 'GOOD'
                  : Number(score) >= 40
                  ? 'NEEDS IMPROVEMENT'
                  : 'CRITICAL SKILL GAP',
            })
          )

        setRows(backendRows)
      } catch (error) {
        console.error(
          'Skill profile backend error:',
          error
        )

        // Fallback to existing frontend data
        const fallbackRows =
          report?.topicBreakdown ||
          Object.entries(
            profile.currentCompetencies || {}
          ).map(
            ([topic, score]) => ({
              topic,
              score: Number(score),
              category: 'BASELINE',
            })
          )

        setRows(fallbackRows)

        setMessage(
          'Showing locally saved competency data.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadSkillProfile()
  }, [profile, report])

  if (loading) {
    return (
      <>
        <Header
          title="Skill Profile"
          sub="Your latest competency state across role-relevant domains."
        />

        <Panel title="Current competency profile">
          <p>
            Loading competency profile...
          </p>
        </Panel>
      </>
    )
  }

  return (
    <>
      <Header
        title="Skill Profile"
        sub="Your latest competency state across role-relevant domains."
      />

      <Panel title="Current competency profile">
        {rows.length === 0 ? (
          <p>
            No competency assessment data
            available yet. Please complete an
            assessment first.
          </p>
        ) : (
          <div className="bars">
            {rows.map((x: any) => (
              <div
                className="barRow"
                key={x.topic}
              >
                <div>
                  <span>{x.topic}</span>
                  <b>{x.score}%</b>
                </div>

                <div className="track">
                  <i
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          x.score
                        )
                      )}%`,
                    }}
                  />
                </div>

                <small>
                  {x.category || ''}
                </small>
              </div>
            ))}
          </div>
        )}

        {message && (
          <p
            style={{
              marginTop: '14px',
              fontSize: '14px',
              opacity: 0.75,
            }}
          >
            {message}
          </p>
        )}
      </Panel>
    </>
  )
}

/* =========================================================
   LEARNING
========================================================= */

function LearningPage({
  report,
}: {
  report: Report
}) {
  const [done, setDone] = useState<string[]>(
    () => get('stats_ai_courses', [])
  )

  const gaps =
    report?.primarySkillGaps?.map(
      (x: any) => x.topic
    ) || ['Statistics']

  const all: any[] = Object.values(
    COURSE_CATALOG as any
  ).flat()

  const courses = all
    .filter(
      (c) =>
        gaps.includes(c.subtopicMatch) ||
        gaps.includes(c.targetCompetency)
    )
    .slice(0, 6)

  const list = courses.length
    ? courses
    : all.slice(0, 6)

  return (
    <>
      <Header
        title="Personalized Learning Path"
        sub="Personalized recommendations mapped to iGOT Karmayogi / NSSTA learning resources."
      />

      <div className="notice">
        Learning resources are personalized based
        on your competency gaps and role
        requirements.
      </div>

      <div className="courseGrid">
        {list.map((c: any) => (
          <div
            className="panel course"
            key={c.id}
          >
            <div className="courseTop">
              <span className="tag">
                {c.provider}
              </span>

              <span>{c.level}</span>
            </div>

            <h3>{c.title}</h3>

            <p>{c.description}</p>

            <div className="courseMeta">
              <span>{c.duration}</span>
              <span>
                ★ {c.rating || '—'}
              </span>
            </div>

            <Button
              kind={
                done.includes(c.id)
                  ? 'ghost'
                  : 'primary'
              }
              onClick={() => {
                if (!done.includes(c.id)) {
                  const updated = [
                    ...done,
                    c.id,
                  ]

                  setDone(updated)
                  save(
                    'stats_ai_courses',
                    updated
                  )
                }
              }}
            >
              {done.includes(c.id)
                ? 'Marked as Learning'
                : 'Start Learning'}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

/* =========================================================
   AI QUIZ
========================================================= */

function AIQuiz({
  report,
}: {
  report: Report
}) {
  const [started, setStarted] =
    useState(false)

  const [score, setScore] =
    useState<number | null>(null)

  const questions = useMemo(() => {
    const weak =
      report?.subtopicWeaknesses?.[0]

    return [
      {
        q: `Which action best supports improvement in ${
          weak || 'the identified skill gap'
        }?`,
        opts: [
          'Targeted practice and reassessment',
          'Skip the topic',
          'Only read unrelated material',
          'Wait for the next annual review',
        ],
        a: 0,
      },

      {
        q: 'What is the purpose of competency-based learning?',
        opts: [
          'Align learning to required role skills',
          'Use the same course for everyone',
          'Avoid assessment',
          'Remove performance feedback',
        ],
        a: 0,
      },

      {
        q: 'How should generated quiz content be grounded?',
        opts: [
          'Retrieved learning material and validation',
          'Random facts only',
          'Unverified web snippets',
          'No source context',
        ],
        a: 0,
      },
    ]
  }, [report])

  const [ans, setAns] =
    useState<number[]>([])

  return (
    <>
      <Header
        title="AI Quiz & Feedback"
        sub="Grounded MCQ generation from learning material and competency gaps."
      />

      <div className="grid2">
        <Panel title="Generation pipeline">
          <Flow />

          <p>
            Document extraction → topic
            identification → competency mapping
            → question generation → validation →
            adaptive assessment.
          </p>
        </Panel>

        <Panel title="Adaptive quiz">
          {!started && score === null ? (
            <>
              <p>
                Generate a short quiz targeted to
                your current gap:{' '}
                <b>
                  {report?.primarySkillGap?.topic ||
                    'role competencies'}
                </b>
                .
              </p>

              <Button
                onClick={() =>
                  setStarted(true)
                }
              >
                Generate AI Quiz
              </Button>
            </>
          ) : score !== null ? (
            <>
              <div className="quizScore">
                {score}%
              </div>

              <p>
                {score >= 80
                  ? 'Strong understanding. The next learning recommendation can move to the next competency.'
                  : 'Keep learning and reassess the weak subtopics for targeted improvement.'}
              </p>

              <Button
                onClick={() => {
                  setStarted(false)
                  setScore(null)
                  setAns([])
                }}
              >
                Retake Quiz
              </Button>
            </>
          ) : (
            <div className="quizList">
              {questions.map((x, i) => (
                <div
                  className="quizQ"
                  key={i}
                >
                  <b>
                    {i + 1}. {x.q}
                  </b>

                  {x.opts.map((o, j) => (
                    <button
                      className={
                        ans[i] === j
                          ? 'selected'
                          : ''
                      }
                      onClick={() => {
                        const a = [...ans]
                        a[i] = j
                        setAns(a)
                      }}
                      key={o}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ))}

              <Button
                disabled={
                  ans.length !==
                  questions.length
                }
                onClick={() =>
                  setScore(
                    Math.round(
                      (ans.filter(
                        (a, i) =>
                          a ===
                          questions[i].a
                      ).length /
                        questions.length) *
                        100
                    )
                  )
                }
              >
                Submit Quiz
              </Button>
            </div>
          )}
        </Panel>
      </div>
    </>
  )
}

/* =========================================================
   PERFORMANCE
========================================================= */

function Performance({
  report,
}: {
  report: Report
}) {
  if (!report) {
    return (
      <Empty text="Complete an assessment to view performance analytics." />
    )
  }

  return (
    <>
      <Header
        title="Performance Analysis"
        sub="Assessment performance, explanations and feedback."
      />

      <div className="grid4">
        <Stat
          label="Overall Score"
          value={`${report.overallScore}%`}
        />

        <Stat
          label="Correct"
          value={`${report.correctCount}/${report.totalQuestions}`}
        />

        <Stat
          label="Strongest"
          value={`${report.strongestCompetency.topic} • ${report.strongestCompetency.score}%`}
        />

        <Stat
          label="Primary Gap"
          value={`${report.primarySkillGap.topic} • ${report.primarySkillGap.score}%`}
        />
      </div>

      <Panel title="Topic performance">
        <div className="bars">
          {report.topicBreakdown.map(
            (x: any) => (
              <div
                className="barRow"
                key={x.topic}
              >
                <div>
                  <span>{x.topic}</span>

                  <b>
                    {x.score}% • {x.category}
                  </b>
                </div>

                <div className="track">
                  <i
                    style={{
                      width: `${x.score}%`,
                    }}
                  />
                </div>

                <small>
                  {x.description}
                </small>
              </div>
            )
          )}
        </div>
      </Panel>

      <div className="details">
        {report.detailedResults.map(
          (x: any) => (
            <div
              className={
                'result ' +
                (x.isCorrect
                  ? 'ok'
                  : 'bad')
              }
              key={x.id}
            >
              <b>
                Q{x.questionNumber}.{' '}
                {x.isCorrect
                  ? 'Correct'
                  : 'Review'}
              </b>

              <span>{x.question}</span>

              <small>
                Your answer:{' '}
                {x.userAnswerText} •
                Correct:{' '}
                {x.correctAnswerText}
              </small>

              <em>{x.explanation}</em>
            </div>
          )
        )}
      </div>
    </>
  )
}

/* =========================================================
   HISTORY
========================================================= */

function HistoryPage() {
  const h: any[] = get(HKEY, [])

  return (
    <>
      <Header
        title="Assessment History"
        sub="Track repeated assessments and improvement over time."
      />

      {h.length ? (
        <div className="historyList">
          {h.map((x) => (
            <div
              className="panel history"
              key={x.id}
            >
              <div>
                <b>{x.title}</b>
                <small>{x.date}</small>
              </div>

              <strong>
                {x.overallScore}%
              </strong>

              <span>
                Gap: {x.primarySkillGap || '—'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Empty text="No completed assessments yet." />
      )}
    </>
  )
}

/* =========================================================
   AI ASSISTANT
========================================================= */

function Assistant() {
  const [input, setInput] =
    useState('')

  const [messages, setMessages] =
    useState<any[]>([
      {
        role: 'ai',
        text: 'Hello. I can explain your skill gaps, learning path, assessment results, or the Stats AI workflow.',
      },
    ])

  const send = () => {
    if (!input.trim()) return

    const q = input.trim()

    let reply =
      'Use Skill Gap for competency comparison, Learning Path for targeted courses, and AI Quiz for reassessment.'

    if (/gap|weak/i.test(q)) {
      reply =
        'Your primary gap is determined from the lowest topic score in the latest role-calibrated assessment.'
    }

    if (/igot|nssta/i.test(q)) {
      reply =
        'Recommendations are mapped to relevant iGOT / NSSTA learning resources based on competency gaps.'
    }

    if (/quiz|mcq/i.test(q)) {
      reply =
        'The AI Quiz generates targeted competency questions based on learning content and identified skill gaps.'
    }

    setMessages([
      ...messages,
      {
        role: 'user',
        text: q,
      },
      {
        role: 'ai',
        text: reply,
      },
    ])

    setInput('')
  }

  return (
    <>
      <Header
        title="AI Assistant"
        sub="AI-powered learner support assistant."
      />

      <Panel title="Ask Stats AI">
        <div className="chat">
          {messages.map((m, i) => (
            <div
              className={
                'bubble ' + m.role
              }
              key={i}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="chatInput">
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Ask about your skill gap, courses, quiz, or assessment..."
          />

          <Button onClick={send}>
            Ask
          </Button>
        </div>
      </Panel>
    </>
  )
}

/* =========================================================
   ADMIN
========================================================= */

function Admin() {
  const h: any[] = get(HKEY, [])

  const avg = h.length
    ? Math.round(
        h.reduce(
          (s, x) =>
            s + x.overallScore,
          0
        ) / h.length
      )
    : 0

  const completedLearning =
    get('stats_ai_courses', []).length

  return (
    <>
      <Header
        title="Admin Analytics"
        sub="Workforce-level skill and learning analytics."
      />

      <div className="grid4">
        <Stat
          label="Assessments"
          value={h.length}
        />

        <Stat
          label="Average Score"
          value={`${avg}%`}
        />

        <Stat
          label="Completed Learning"
          value={completedLearning}
        />

        <Stat
          label="Integration"
          value="iGOT / NSSTA Ready"
        />
      </div>

      <Panel title="Governance-ready architecture">
        <ul className="clean">
          <li>
            <ShieldCheck />
            RBAC and secure role-based access
            can be added at the API layer.
          </li>

          <li>
            <ShieldCheck />
            OAuth 2.0 / OIDC is planned for
            government SSO integration.
          </li>

          <li>
            <ShieldCheck />
            PostgreSQL + pgvector supports
            structured and semantic search.
          </li>

          <li>
            <ShieldCheck />
            iGOT / NSSTA adapters isolate
            external API dependencies.
          </li>
        </ul>
      </Panel>
    </>
  )
}

/* =========================================================
   EMPTY STATE
========================================================= */

function Empty({
  text,
}: {
  text: string
}) {
  const nav = useNavigate()

  return (
    <>
      <Header
        title="Stats AI"
        sub="Continuous competency intelligence."
      />

      <div className="empty panel">
        <Sparkles size={42} />

        <h2>Nothing to show yet</h2>

        <p>{text}</p>

        <Button
          onClick={() => nav('/assessment')}
        >
          Take Assessment
        </Button>
      </div>
    </>
  )
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [profile, setProfile] =
    useState<Profile>(() =>
      get(PKEY, defaultProfile)
    )

  const [report, setReport] =
    useState<Report>(() =>
      get(RKEY, null)
    )

  const updateProfile = (
    p: Profile
  ) => {
    setProfile(p)
    save(PKEY, p)
  }

  const updateReport = (
    r: Report
  ) => {
    setReport(r)
    save(RKEY, r)
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                profile={profile}
                report={report}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfilePage
                profile={profile}
                setProfile={
                  updateProfile
                }
              />
            }
          />

          <Route
            path="/assessment"
            element={
              <AssessmentPage
                profile={profile}
                setReport={updateReport}
                setProfile={
                  updateProfile
                }
              />
            }
          />

          <Route
            path="/skill-profile"
            element={
              <SkillProfile
                profile={profile}
                report={report}
              />
            }
          />

          <Route
            path="/skill-gap"
            element={
              <SkillGapPage
                profile={profile}
                report={report}
              />
            }
          />

          <Route
            path="/learning"
            element={
              <LearningPage
                report={report}
              />
            }
          />

          {/* NEW AI CONTENT GENERATION PAGE */}
          <Route
            path="/content-generation"
            element={
              <ContentGeneration />
            }
          />

          <Route
            path="/ai-quiz"
            element={
              <AIQuiz
                report={report}
              />
            }
          />

          <Route
            path="/performance"
            element={
              <Performance
                report={report}
              />
            }
          />

          <Route
            path="/history"
            element={
              <HistoryPage />
            }
          />

          <Route
            path="/assistant"
            element={
              <Assistant />
            }
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
