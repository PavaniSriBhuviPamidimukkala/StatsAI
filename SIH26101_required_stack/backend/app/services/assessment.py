QUESTIONS=[
 {'skill':'Sampling','answer':1}, {'skill':'Python','answer':0}, {'skill':'SQL','answer':1}, {'skill':'GIS','answer':0}
]
def score_assessment(answers):
    total=len(QUESTIONS); correct=sum(i<len(answers) and answers[i]==q['answer'] for i,q in enumerate(QUESTIONS))
    return {'score':round(correct/total*100),'correct':correct,'total':total,'competencies':{q['skill']:100 if i<len(answers) and answers[i]==q['answer'] else 50 for i,q in enumerate(QUESTIONS)}}
