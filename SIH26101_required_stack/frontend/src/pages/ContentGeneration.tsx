import React, { useState } from "react";
import {
  Upload,
  FileText,
  Presentation,
  Video,
  CheckCircle2,
  Loader2,
  Brain,
  Target,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

type Stage = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const stages: Stage[] = [
  {
    title: "Content Extraction",
    description: "Extracting text and learning concepts",
    icon: <FileText size={20} />,
  },
  {
    title: "Topic Identification",
    description: "Identifying key statistical and technical topics",
    icon: <Brain size={20} />,
  },
  {
    title: "Competency Mapping",
    description: "Mapping content to official competency areas",
    icon: <Target size={20} />,
  },
  {
    title: "Question Generation",
    description: "Generating competency-based questions",
    icon: <Sparkles size={20} />,
  },
  {
    title: "Quality Validation",
    description: "Checking difficulty, relevance and answer quality",
    icon: <ShieldCheck size={20} />,
  },
];

const generatedQuestions = [
  {
    question:
      "Which sampling method divides a population into homogeneous groups before selecting samples?",
    topic: "Survey Design",
    difficulty: "Medium",
  },
  {
    question:
      "Which measure is most appropriate for describing the central tendency of highly skewed data?",
    topic: "Statistics",
    difficulty: "Easy",
  },
  {
    question:
      "Which factor is most important when evaluating the quality of an official statistical dataset?",
    topic: "Data Quality",
    difficulty: "Hard",
  },
];

export default function ContentGeneration() {
  const [fileName, setFileName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setCompleted(false);
    setProcessing(true);
    setProgress(0);

    let current = 0;

    const interval = setInterval(() => {
      current += 20;
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setProcessing(false);
        setCompleted(true);
      }
    }, 600);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const resetGeneration = () => {
    setFileName("");
    setProcessing(false);
    setCompleted(false);
    setProgress(0);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">AI LEARNING INTELLIGENCE</div>
          <h1>AI Content Generation</h1>
          <p>
            Convert learning materials into competency-aligned assessments
            using an AI-powered generation pipeline.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <section className="card generation-upload">
        <div className="section-heading">
          <div>
            <h2>Upload Learning Material</h2>
            <p>
              Upload official learning content to generate a targeted
              assessment.
            </p>
          </div>
        </div>

        <label className="upload-box">
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.mp4,.webm,.mov"
            onChange={handleInputChange}
            hidden
          />

          <div className="upload-icon">
            <Upload size={28} />
          </div>

          <h3>
            {fileName ? fileName : "Drop your learning material here"}
          </h3>

          <span>
            {fileName
              ? "Material selected successfully"
              : "PDF, PPT, PPTX or supported video files"}
          </span>

          <button
            type="button"
            className="primary-btn"
            onClick={(e) => {
              e.preventDefault();
              (
                e.currentTarget.parentElement?.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement
              )?.click();
            }}
          >
            {fileName ? "Choose Another File" : "Select Material"}
          </button>
        </label>

        <div className="format-row">
          <div>
            <FileText size={17} />
            PDF
          </div>
          <div>
            <Presentation size={17} />
            PPT / PPTX
          </div>
          <div>
            <Video size={17} />
            Video
          </div>
        </div>
      </section>

      {/* Generation Pipeline */}
      <section className="card">
        <div className="section-heading">
          <div>
            <h2>Generation Pipeline</h2>
            <p>
              AI processes the learning material through multiple validation
              stages.
            </p>
          </div>

          {processing && (
            <div className="processing-badge">
              <Loader2 size={16} className="spin" />
              Processing {progress}%
            </div>
          )}
        </div>

        <div className="pipeline">
          {stages.map((stage, index) => {
            const stageProgress = (index + 1) * 20;
            const isDone = completed || progress >= stageProgress;
            const isActive =
              processing &&
              progress < stageProgress &&
              progress >= index * 20;

            return (
              <React.Fragment key={stage.title}>
                <div
                  className={`pipeline-stage ${
                    isDone ? "completed" : ""
                  } ${isActive ? "active" : ""}`}
                >
                  <div className="pipeline-icon">
                    {isDone ? <CheckCircle2 size={20} /> : stage.icon}
                  </div>

                  <div>
                    <strong>{stage.title}</strong>
                    <span>{stage.description}</span>
                  </div>
                </div>

                {index < stages.length - 1 && (
                  <div className="pipeline-arrow">
                    <ArrowRight size={18} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Results */}
      {completed && (
        <section className="card generated-result">
          <div className="result-header">
            <div>
              <div className="success-label">
                <CheckCircle2 size={17} />
                Assessment Generated
              </div>

              <h2>Generated Assessment</h2>

              <p>
                Questions have been mapped to relevant competency areas and
                calibrated across difficulty levels.
              </p>
            </div>

            <button className="secondary-btn" onClick={resetGeneration}>
              <RefreshCw size={17} />
              Generate Again
            </button>
          </div>

          <div className="result-stats">
            <div>
              <strong>10</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>4</strong>
              <span>Competencies</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Difficulty Levels</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Generated</span>
            </div>
          </div>

          <div className="question-list">
            {generatedQuestions.map((item, index) => (
              <div className="question-card" key={index}>
                <div className="question-number">
                  Q{index + 1}
                </div>

                <div className="question-content">
                  <h3>{item.question}</h3>

                  <div className="question-meta">
                    <span>{item.topic}</span>
                    <span>{item.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button className="primary-btn">
              Start AI Quiz
              <ArrowRight size={17} />
            </button>

            <button className="secondary-btn" onClick={resetGeneration}>
              Generate New Assessment
            </button>
          </div>
        </section>
      )}

      {!fileName && !completed && (
        <div className="generation-info">
          <Sparkles size={18} />
          <span>
            Upload learning material to activate the AI generation pipeline.
          </span>
        </div>
      )}
    </div>
  );
}
