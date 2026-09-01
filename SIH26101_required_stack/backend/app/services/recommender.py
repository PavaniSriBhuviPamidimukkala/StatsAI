from sklearn.metrics.pairwise import cosine_similarity

def skill_gaps(skills):
    out=[]
    for s in skills:
        gap=max(0,s['required']-s['current'])
        priority='HIGH' if gap>=25 else 'MEDIUM' if gap>=10 else 'LOW'
        out.append({**s,'gap':gap,'priority':priority})
    return sorted(out,key=lambda x:x['gap'],reverse=True)

def rank_courses(gaps,courses):
    by={g['name']:g for g in gaps}
    result=[]
    for c in courses:
        g=by.get(c['skill'],{'gap':0})
        match=min(99,60+round(g['gap']*.8)+(10 if c['source']=='NSSTA' else 8))
        result.append({**c,'match':match})
    return sorted(result,key=lambda x:x['match'],reverse=True)

def semantic_similarity(query,documents,model=None):
    if not documents:return []
    if model is None:return [(d,0.0) for d in documents]
    q=model.encode([query]); ds=model.encode(documents); scores=cosine_similarity(q,ds)[0]
    return sorted(zip(documents,scores),key=lambda x:x[1],reverse=True)
