import type {Course,Profile,Skill} from './types';
export const profile:Profile={name:'Ramesh Kumar',designation:'Senior Statistical Officer',department:'Official Statistics Division',assignment:'Survey data processing & analysis',education:'Postgraduate / Statistics or related field',experience:6,training:'Excel, Statistics, Data Quality'};
export const skills:Skill[]=[
{name:'Sampling',current:50,required:80,category:'Statistical'}, {name:'Python',current:45,required:75,category:'Technical'}, {name:'SQL',current:70,required:75,category:'Technical'}, {name:'GIS',current:35,required:60,category:'Technical'}, {name:'Data Visualization',current:74,required:80,category:'Technical'}, {name:'Data Quality',current:68,required:75,category:'Statistical'}];
export const courses:Course[]=[
{id:1,title:'Applied Sampling Methods',skill:'Sampling',source:'NSSTA',duration:'8 hours',match:94,level:'Intermediate',reason:'High competency gap and strong role relevance.'},
{id:2,title:'Python for Official Statistics',skill:'Python',source:'iGOT Karmayogi',duration:'10 hours',match:91,level:'Intermediate',reason:'Builds data-analysis capability required for the current role.'},
{id:3,title:'GIS & Geospatial Data Analytics',skill:'GIS',source:'iGOT Karmayogi',duration:'12 hours',match:88,level:'Beginner',reason:'Addresses a high-priority emerging technical skill.'},
{id:4,title:'SQL for Data Management',skill:'SQL',source:'iGOT Karmayogi',duration:'6 hours',match:83,level:'Intermediate',reason:'Small remaining gap; efficient targeted learning.'},
{id:5,title:'Data Quality Frameworks',skill:'Data Quality',source:'NSSTA',duration:'5 hours',match:79,level:'Intermediate',reason:'Strengthens quality assurance in statistical workflows.'}];
export const questions=[
{q:'Which method gives each population unit an equal known chance of selection?',skill:'Sampling',options:['Convenience sampling','Simple random sampling','Snowball sampling','Purposive sampling'],answer:1},
{q:'Which Python library is commonly used for tabular data analysis?',skill:'Python',options:['Pandas','Flask','Requests','Pygame'],answer:0},
{q:'Which SQL clause filters rows before grouping?',skill:'SQL',options:['ORDER BY','WHERE','HAVING','JOIN'],answer:1},
{q:'GIS is primarily used to work with data that has what characteristic?',skill:'GIS',options:['Spatial/geographic reference','Only audio','Only images','No metadata'],answer:0}];
