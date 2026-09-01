from fastapi import FastAPI, Depends, UploadFile, File
from sqlalchemy.orm import Session
from .db import Base,engine,get_db
from .models import OfficialProfile,Competency,Course,LearningContent
from .schemas import ProfileIn,AssessmentIn,QuizGenerateIn
from .services.assessment import score_assessment
from .services.recommender import skill_gaps,rank_courses
from .services.quiz import generate_demo_quiz
app=FastAPI(title='SIH 26101 Skill Intelligence API',version='1.0.0')
Base.metadata.create_all(bind=engine)

@app.get('/health')
def health(): return {'status':'ok','prototype':True}

@app.get('/api/profile')
def get_profile(db:Session=Depends(get_db)):
    p=db.query(OfficialProfile).first()
    if not p:return {'name':'Ramesh Kumar','designation':'Senior Statistical Officer','department':'Official Statistics Division','assignment':'Survey data processing & analysis','education':'Postgraduate / Statistics or related field','experience':6,'training':'Excel, Statistics, Data Quality'}
    return {k:getattr(p,k) for k in ['name','designation','department','assignment','education','experience','training']}

@app.put('/api/profile')
def save_profile(payload:ProfileIn,db:Session=Depends(get_db)):
    p=db.query(OfficialProfile).first() or OfficialProfile()
    for k,v in payload.model_dump().items():setattr(p,k,v)
    db.add(p);db.commit();db.refresh(p);return {'saved':True,'id':p.id}

@app.get('/api/competencies')
def competencies(db:Session=Depends(get_db)):
    rows=db.query(Competency).all()
    if not rows:
        rows=[Competency(name='Sampling',category='Statistical',current=50,required=80),Competency(name='Python',category='Technical',current=45,required=75),Competency(name='SQL',category='Technical',current=70,required=75),Competency(name='GIS',category='Technical',current=35,required=60),Competency(name='Data Visualization',category='Technical',current=74,required=80),Competency(name='Data Quality',category='Statistical',current=68,required=75)]
        db.add_all(rows);db.commit()
    return [{'name':r.name,'category':r.category,'current':r.current,'required':r.required} for r in rows]

@app.get('/api/skill-gaps')
def gaps(db:Session=Depends(get_db)): return skill_gaps(competencies(db))

@app.get('/api/courses')
def courses(db:Session=Depends(get_db)):
    rows=db.query(Course).all()
    if not rows:
        rows=[Course(id=1,title='Applied Sampling Methods',skill='Sampling',source='NSSTA',duration='8 hours',level='Intermediate',description='Survey and sampling methods'),Course(id=2,title='Python for Official Statistics',skill='Python',source='iGOT Karmayogi',duration='10 hours',level='Intermediate',description='Python for statistical analysis'),Course(id=3,title='GIS & Geospatial Data Analytics',skill='GIS',source='iGOT Karmayogi',duration='12 hours',level='Beginner',description='Spatial analytics'),Course(id=4,title='SQL for Data Management',skill='SQL',source='iGOT Karmayogi',duration='6 hours',level='Intermediate',description='Data management with SQL'),Course(id=5,title='Data Quality Frameworks',skill='Data Quality',source='NSSTA',duration='5 hours',level='Intermediate',description='Quality assurance')]
        db.add_all(rows);db.commit()
    return [{'id':r.id,'title':r.title,'skill':r.skill,'source':r.source,'duration':r.duration,'level':r.level,'description':r.description} for r in rows]

@app.get('/api/recommendations')
def recommendations(db:Session=Depends(get_db)): return rank_courses(gaps(db),courses(db))

@app.post('/api/assessment')
def assessment(payload:AssessmentIn): return score_assessment(payload.answers)

@app.post('/api/quiz/generate')
def quiz(payload:QuizGenerateIn): return {'mode':'demo-fallback','questions':generate_demo_quiz(payload.content,payload.count),'note':'Use an approved LLM + RAG service in production.'}

@app.post('/api/content/upload')
async def upload_content(file:UploadFile=File(...),db:Session=Depends(get_db)):
    raw=await file.read(); text=raw.decode('utf-8','ignore')
    item=LearningContent(filename=file.filename or 'uploaded.txt',text=text[:200000]);db.add(item);db.commit();db.refresh(item)
    return {'id':item.id,'filename':item.filename,'characters':len(text),'message':'Text stored. Production pipeline can extract PDF/PPT text, chunk, embed and index in pgvector.'}

@app.get('/api/integrations/status')
def integrations(): return {'iGOT':{'status':'mock','ready_for':'approved REST API credentials'},'NSSTA':{'status':'mock','ready_for':'approved integration'}}
