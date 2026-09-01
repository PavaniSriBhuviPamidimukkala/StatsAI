# Deterministic fallback used when no approved LLM is configured.
def generate_demo_quiz(content,count=5):
    text=' '.join(content.split())[:220]
    qs=[
      {'question':'What is the main topic of the supplied learning material?','options':[text,'An unrelated topic','A random dataset','None of these'],'answer':0,'explanation':'Prototype fallback uses the extracted text as grounded context.'},
      {'question':'Why should learning recommendations be competency-based?','options':['To target skill gaps','To remove assessments','To ignore job roles','To avoid learning history'],'answer':0,'explanation':'Competency gaps help prioritize relevant learning.'}
    ]
    return qs[:max(1,min(count,len(qs)))]
