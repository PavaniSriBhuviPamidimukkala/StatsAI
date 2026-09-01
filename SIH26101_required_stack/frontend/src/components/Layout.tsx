import { NavLink } from 'react-router-dom'
import { BarChart3, ClipboardCheck, GraduationCap, LayoutDashboard, UserRound, BrainCircuit } from 'lucide-react'

const nav=[['/dashboard','Dashboard',LayoutDashboard],['/profile','Official Profile',UserRound],['/assessment','Assessment',ClipboardCheck],['/skill-gap','Skill Gap',BarChart3],['/learning','Learning Path',GraduationCap]] as const
export default function Layout({children}:{children:React.ReactNode}){
 return <div className="shell"><aside className="sidebar"><div className="brand"><div className="brandIcon"><BrainCircuit size={22}/></div><div><div className="brandName">Stats AI</div><div className="brandSub">SIH 26101 • Prototype</div></div></div><nav>{nav.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>`navItem ${isActive?'active':''}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav><div className="sideNote"><b>AI Skill Intelligence</b><span>Official Statistics workforce upskilling</span></div></aside><main className="main">{children}</main></div>
}
