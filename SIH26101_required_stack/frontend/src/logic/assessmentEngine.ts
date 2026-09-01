export type Question = {
  id: string; topic: string; subtopic?: string; difficulty?: string;
  question: string; options: string[]; correctIndex: number; explanation?: string;
}

export type TopicResult = {
  topic: string; totalQuestions: number; correctAnswers: number; score: number;
  category: string; description: string;
}

export type EvaluationReport = {
  timestamp: string; totalQuestions: number; attemptedCount: number; correctCount: number;
  incorrectCount: number; overallScore: number; topicBreakdown: TopicResult[];
  primarySkillGaps: TopicResult[]; primarySkillGap: TopicResult; strongestCompetency: TopicResult;
  subtopicWeaknesses: string[]; detailedResults: any[];
}

export function getPerformanceCategory(score:number) {
  if (score >= 80) return { name:'STRONG', description:'Demonstrates comprehensive proficiency and mastery in this domain.' }
  if (score >= 60) return { name:'GOOD', description:'Solid conceptual foundation with minor areas for refinement.' }
  if (score >= 40) return { name:'NEEDS IMPROVEMENT', description:'Moderate knowledge gap. Targeted module completion required.' }
  return { name:'CRITICAL SKILL GAP', description:'Significant knowledge gap detected. Immediate intervention and training required.' }
}

export function evaluateAssessment(questions:Question[], answers:Record<string,number>):EvaluationReport {
  const topicStats:Record<string,{total:number;correct:number}> = {}
  const weak = new Set<string>(); let correctCount = 0; const detailedResults:any[]=[]
  questions.forEach((q,index)=>{
    const selected=answers[q.id]; const attempted=selected!==undefined; const isCorrect=attempted && selected===q.correctIndex
    if(isCorrect) correctCount++; else if(q.subtopic) weak.add(q.subtopic)
    topicStats[q.topic] ??= {total:0,correct:0}; topicStats[q.topic].total++; if(isCorrect) topicStats[q.topic].correct++
    detailedResults.push({questionNumber:index+1,...q,userAnswerIndex:selected,userAnswerText:attempted?q.options[selected]:'Not Attempted',correctAnswerText:q.options[q.correctIndex],isCorrect})
  })
  const topicBreakdown=Object.entries(topicStats).map(([topic,s])=>{const score=Math.round(s.correct/s.total*100);const c=getPerformanceCategory(score);return {topic,totalQuestions:s.total,correctAnswers:s.correct,score,category:c.name,description:c.description}})
  const lowest=Math.min(...topicBreakdown.map(x=>x.score)); const highest=Math.max(...topicBreakdown.map(x=>x.score))
  const primarySkillGaps=topicBreakdown.filter(x=>x.score===lowest); const strongest=topicBreakdown.find(x=>x.score===highest)!
  const overallScore=questions.length?Math.round(correctCount/questions.length*100):0
  return {timestamp:new Date().toISOString(),totalQuestions:questions.length,attemptedCount:Object.keys(answers).length,correctCount,incorrectCount:questions.length-correctCount,overallScore,topicBreakdown,primarySkillGaps,primarySkillGap:primarySkillGaps[0],strongestCompetency:strongest,subtopicWeaknesses:[...weak],detailedResults}
}
