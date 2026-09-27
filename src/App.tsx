import { useState } from 'react'

// ============================================================
// FEXT-EOS v1.4.2 — CANONICAL BASELINE AUDIT DASHBOARD
// Evidence-based. No invention. Verified facts only.
// ============================================================

type Status = 'PASS' | 'FAIL' | 'HOLD' | 'NOT_APPLICABLE' | 'VERIFIED' | 'PARTIAL' | 'MISSING' | 'BLOCKED'
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL'
type RuntimeState = 'OPERATIONAL' | 'SPECIFICATION' | 'CONNECTED_EMPTY' | 'HOLD' | 'DECLARED_PENDING'
type EvidenceLevel = 'HECHO_DOCUMENTADO' | 'CALCULO' | 'PROPUESTA' | 'HIPOTESIS'

// ============================================================
// VERIFIED FACTS FROM PRODUCTION (HTTP 200, 27/09/2026)
// Source: https://firecycle-platform.vercel.app/
// ============================================================

interface RuntimeModule {
  id: string
  name: string
  runtimeState: RuntimeState
  route: string
  evidenceLevel: EvidenceLevel
  note: string
}

// These are VERIFIED from the production HTML response.
// "OPERATIONAL" means the frontend runtime code is present.
// This does NOT imply backend/DB/tests/security are production-ready.
const runtimeModules: RuntimeModule[] = [
  { id: 'M00', name: 'FIREWATCH', runtimeState: 'OPERATIONAL', route: '/firewatch', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M00-SAT', name: 'Satellite Intelligence', runtimeState: 'OPERATIONAL', route: '/firewatch/satellite', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M01', name: 'Territory Digital Twin', runtimeState: 'OPERATIONAL', route: '/territory', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M02', name: 'Evidence Engine', runtimeState: 'OPERATIONAL', route: '/evidence', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified. Human review required.' },
  { id: 'M03', name: 'Risk & Priority Engine', runtimeState: 'OPERATIONAL', route: '/risk', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M04', name: 'Intervention Portfolio', runtimeState: 'OPERATIONAL', route: '/interventions', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M05', name: 'Biomass Intelligence', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M06', name: 'Operations Graph', runtimeState: 'OPERATIONAL', route: '/operations', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M07', name: 'Cost, Logistics & Finance', runtimeState: 'OPERATIONAL', route: '/finance', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M08', name: 'MRV', runtimeState: 'OPERATIONAL', route: '/mrv', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M09', name: 'Predictive Maintenance', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M10', name: 'Command Center', runtimeState: 'OPERATIONAL', route: '/command-center', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
  { id: 'M11', name: 'Bioeconomy Resource Engine', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M12', name: 'REDBIOMASA Marketplace', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M13', name: 'Livestock & Grazing', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M14', name: 'Circular Value Engine', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M15', name: 'Bioeconomy Command Center', runtimeState: 'SPECIFICATION', route: '—', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'No runtime registered. Specification only.' },
  { id: 'M16', name: 'Security', runtimeState: 'OPERATIONAL', route: '/admin', evidenceLevel: 'HECHO_DOCUMENTADO', note: 'Frontend runtime present. Backend/DB not verified.' },
]

// Additional specification-only modules verified in production HTML
const specModules = [
  { id: 'GOV', name: 'Gobernanza', note: 'Specification. No runtime.' },
  { id: 'INST', name: 'Institucional', note: 'Specification. No runtime.' },
  { id: 'GIS', name: 'GIS Core', note: 'Specification. No runtime.' },
  { id: 'S01-S08', name: 'Data Pipeline', note: 'Specification. No runtime.' },
  { id: 'FIELD', name: 'Field App', note: 'Specification. No runtime.' },
  { id: 'OPS-FIN', name: 'Operational Finance', note: 'Specification. No runtime.' },
  { id: 'ROS', name: 'Operación Rosendo', note: 'Specification. No runtime.' },
  { id: 'DB01', name: 'Database Core', note: 'Specification. No runtime.' },
  { id: 'DB02', name: 'Canonical Domains', note: 'Specification. No runtime.' },
  { id: 'DB03', name: 'API Data Layer', note: 'Specification. No runtime.' },
  { id: 'DB04', name: 'Data Governance', note: 'Specification. No runtime.' },
  { id: 'AI01', name: 'Generative Copilot', note: 'Specification. No runtime.' },
  { id: 'AI02', name: 'RAG Engine', note: 'Specification. No runtime.' },
  { id: 'AI03', name: 'Agent Orchestrator', note: 'Specification. No runtime.' },
  { id: 'AI04', name: 'Document AI', note: 'Specification. No runtime.' },
  { id: 'AI05', name: 'AI Governance & Evals', note: 'Specification. No runtime.' },
]

// ============================================================
// VERIFIED FINDINGS (from production HTTP inspection)
// ============================================================

interface Finding {
  id: string
  title: string
  severity: Severity
  category: string
  description: string
  status: Status
  evidence: string
  recommendation: string
}

const findings: Finding[] = [
  { id: 'DB-001', title: 'Divergencia Neon vs Supabase — CONFIRMADA', severity: 'CRITICAL', category: 'Database', description: 'La capa C11 de producción muestra "Neon PostgreSQL" con subpáginas "Proyecto y branch", "Base neondb", "Compute", "Conexión pooled". Esto CONTRADICE el brief arquitectónico que afirma Supabase + PostGIS.', status: 'VERIFIED', evidence: 'HTTP 200 de firecycle-platform.vercel.app — sección C11-P1', recommendation: 'Aclarar si la BD real es Neon o Supabase. Documentar la decisión arquitectónica canónica. Si es Neon, actualizar brief. Si es Supabase, corregir UI.' },
  { id: 'API-001', title: '/api/health devuelve 404 NOT_FOUND', severity: 'CRITICAL', category: 'API', description: 'El endpoint GET /api/health no existe en producción. Devuelve 404 de Vercel. El brief afirma que devuelve HTTP 200 con database.connected=true.', status: 'VERIFIED', evidence: 'HTTP 404 de firecycle-platform.vercel.app/api/health — "This page doesn\'t exist"', recommendation: 'Implementar /api/health con schema canónico: status, service, version, commit, environment, timestamp, database.connected, database.schemaReady, database.schemaVersion.' },
  { id: 'ARCH-001', title: 'Scope del proyecto excede el brief original', severity: 'HIGH', category: 'Architecture', description: 'El brief describe un proyecto GIS/GeoAI post-wildfire con M01-M02. La producción muestra 34 módulos incluyendo bioeconomía, MRV, finanzas, IA generativa, REDBIOMASA, Operación Rosendo, etc.', status: 'VERIFIED', evidence: '34 módulos catalogados en producción: 11 OPERATIONAL, 23 SPECIFICATION', recommendation: 'Documentar el scope real del proyecto. Actualizar el brief arquitectónico o crear un documento de scope separado.' },
  { id: 'SEC-001', title: 'RLS no verificable sin acceso a BD', severity: 'HIGH', category: 'Security', description: 'No es posible auditar RLS sin acceso a la base de datos (Neon o Supabase). El principio DENY BY DEFAULT no puede verificarse.', status: 'HOLD', evidence: 'Sin acceso a BD. Nivel (a) solo permite HTTP anónimo.', recommendation: 'Obtener acceso de lectura a la BD para auditar RLS, policies, roles.' },
  { id: 'SEC-002', title: 'Service role exposure no verificable', severity: 'HIGH', category: 'Security', description: 'No es posible verificar si service_role key está expuesta en NEXT_PUBLIC_* sin acceso al código fuente.', status: 'HOLD', evidence: 'Sin acceso al repo GitLab.', recommendation: 'Inspeccionar .env.example y variables de Vercel.' },
  { id: 'CI-001', title: 'CI/CD pipeline no verificable', severity: 'MEDIUM', category: 'CI/CD', description: 'No es posible verificar el estado del pipeline GitLab CI sin acceso al repo.', status: 'HOLD', evidence: 'Sin acceso a GitLab.', recommendation: 'Obtener acceso de lectura al repo.' },
  { id: 'MOD-001', title: '11 módulos marcados OPERATIONAL sin verificación backend', severity: 'HIGH', category: 'Modules', description: 'El frontend marca 11 módulos como OPERATIONAL. Esto solo confirma que el código runtime está presente. NO confirma persistencia, validación, seguridad, tests ni observabilidad.', status: 'PARTIAL', evidence: 'HTML de producción: "runtime and API are present"', recommendation: 'Para cada módulo OPERATIONAL, verificar: (1) persistencia real en BD, (2) validación de input, (3) RLS, (4) tests, (5) logs. Solo entonces marcar PRODUCTION READY.' },
  { id: 'DATA-001', title: 'Datos territoriales declarados sin verificación', severity: 'MEDIUM', category: 'Data', description: 'La UI muestra RTU-3765, Pinofranqueado-Las Hurdes, 3765.34 ha, €4.525M. La propia UI los marca "DECLARED · PENDING VERIFICATION".', status: 'VERIFIED', evidence: 'HTML: "DECLARED · PENDING VERIFICATION" + truth boundary note', recommendation: 'Registrar evidencia primaria en Evidence Engine para cada dato declarado.' },
  { id: 'ARCH-002', title: 'PostGIS no mencionado en producción', severity: 'MEDIUM', category: 'Database', description: 'La UI muestra Neon PostgreSQL pero NO menciona PostGIS. El brief afirma PostGIS activo. Si la BD es Neon, PostGIS puede no estar disponible.', status: 'PARTIAL', evidence: 'C11-P1 muestra "Neon PostgreSQL" sin mención de PostGIS', recommendation: 'Verificar si Neon tiene PostGIS habilitado. Si no, evaluar migración a Supabase o habilitar PostGIS en Neon.' },
  { id: 'EVID-001', title: 'Evidence Engine presente pero cadena no verificada', severity: 'HIGH', category: 'Evidence', description: 'M02 Evidence Engine está marcado OPERATIONAL en frontend. La cadena SOURCE→ACQUISITION→PROCESSING→DERIVED→REVIEW→VALIDATION→DECISION no puede verificarse sin acceso al código.', status: 'PARTIAL', evidence: 'HTML: "evidence runtime and API are present; human review remains required"', recommendation: 'Inspeccionar código de M02 para verificar implementación de la cadena completa y separación AI OUTPUT ≠ VERIFIED EVIDENCE.' },
]

// ============================================================
// CONTROL MATRIX
// ============================================================

interface ControlItem {
  control: string
  before: string
  action: string
  after: string
  evidence: string
  status: Status
}

const controlMatrix: ControlItem[] = [
  { control: 'Producción activa', before: 'DESCONOCIDO', action: 'GET /', after: 'HTTP 200 VERIFIED', evidence: 'firecycle-platform.vercel.app responde 200', status: 'PASS' },
  { control: '/api/health endpoint', before: 'AFIRMADO HTTP 200', action: 'GET /api/health', after: 'HTTP 404 NOT_FOUND', evidence: 'Vercel 404 page', status: 'FAIL' },
  { control: 'Identidad FEXT-EOS', before: 'DESCONOCIDO', action: 'Inspección HTML', after: 'VERIFIED: FEXT-EOS EU OPERATIONAL TOOL', evidence: 'Title + badge en HTML', status: 'PASS' },
  { control: 'Base de datos canónica', before: 'AFIRMADO Supabase', action: 'Inspección C11', after: 'Neon PostgreSQL (DIVERGENCIA)', evidence: 'C11-P1 "Neon PostgreSQL", "Base neondb"', status: 'FAIL' },
  { control: 'PostGIS activo', before: 'AFIRMADO', action: 'Buscar mención en UI', after: 'NO MENCIONADO', evidence: 'C11 no menciona PostGIS', status: 'FAIL' },
  { control: 'Módulos runtime', before: 'M01+M02 afirmados', action: 'Contar OPERATIONAL', after: '11 OPERATIONAL + 23 SPECIFICATION', evidence: 'HTML module grid', status: 'PARTIAL' },
  { control: 'GitLab main SSOT', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso al repo', status: 'HOLD' },
  { control: 'Commit SHA trazable', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso a Vercel dashboard', status: 'HOLD' },
  { control: 'CI reproducible', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso a GitLab CI', status: 'HOLD' },
  { control: 'RLS auditado', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso a BD', status: 'HOLD' },
  { control: 'Secretos auditados', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso a env vars', status: 'HOLD' },
  { control: 'Migraciones versionadas', before: 'DESCONOCIDO', action: 'Verificar', after: 'HOLD', evidence: 'Sin acceso a migrations/', status: 'HOLD' },
  { control: 'Smoke tests', before: 'INEXISTENTE', action: 'Implementar', after: 'HOLD', evidence: 'Requiere acceso de escritura', status: 'HOLD' },
]

// ============================================================
// COMPONENTS
// ============================================================

function StatusBadge({ status }: { status: Status | string }) {
  const colors: Record<string, string> = {
    'PASS': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'FAIL': 'bg-red-500/20 text-red-300 border-red-500/30',
    'HOLD': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'NOT_APPLICABLE': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'VERIFIED': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'PARTIAL': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'MISSING': 'bg-red-500/20 text-red-300 border-red-500/30',
    'BLOCKED': 'bg-red-500/20 text-red-300 border-red-500/30',
  }
  const colorClass = colors[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function RuntimeBadge({ state }: { state: RuntimeState }) {
  const colors: Record<string, string> = {
    'OPERATIONAL': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'SPECIFICATION': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'CONNECTED_EMPTY': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'HOLD': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'DECLARED_PENDING': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[state]}`}>
      {state.replace(/_/g, ' ')}
    </span>
  )
}

function EvidenceTag({ level }: { level: EvidenceLevel }) {
  const colors: Record<string, string> = {
    'HECHO_DOCUMENTADO': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    'CALCULO': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'PROPUESTA': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    'HIPOTESIS': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  }
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border ${colors[level]}`}>
      [{level.replace(/_/g, ' ')}]
    </span>
  )
}

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <i className="fa-solid fa-fire text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">FIRECYCLE EXTREM</h1>
              <p className="text-xs text-slate-400 font-mono">FEXT-EOS v1.4.2 — Canonical Baseline Audit · Evidence-Based</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">PROD: HTTP 200 VERIFIED</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-red-400">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span className="font-medium">/api/health: 404</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <i className="fa-solid fa-calendar"></i>
              <span>27/09/2026</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Navigation({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const tabs = [
    { id: 'executive', label: 'Executive Status', icon: 'fa-gauge-high' },
    { id: 'verified', label: 'Verified Facts', icon: 'fa-circle-check' },
    { id: 'modules', label: 'Module Registry', icon: 'fa-cubes' },
    { id: 'findings', label: 'Findings', icon: 'fa-magnifying-glass' },
    { id: 'divergences', label: 'Divergences', icon: 'fa-code-branch' },
    { id: 'controls', label: 'Control Matrix', icon: 'fa-table-list' },
    { id: 'remediation', label: 'Remediation', icon: 'fa-list-check' },
  ]
  return (
    <nav className="bg-slate-800/50 border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                active === tab.id
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

function ExecutiveStatus() {
  return (
    <div className="space-y-6">
      {/* Access Level Declaration */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <i className="fa-solid fa-shield-halved text-blue-400"></i>
          <span className="text-sm font-semibold text-blue-300">NIVEL_DE_ACCESO = (a) ACCESO_ANONIMO_HTTP</span>
        </div>
        <p className="text-xs text-slate-300">
          Este informe se basa en verificación HTTP anónima de producción. Se intentaron GET a <code className="text-blue-300">https://firecycle-platform.vercel.app/</code> y <code className="text-blue-300">/api/health</code>. No se dispone de acceso (b) gestión ni (c) escritura.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: 'Prod HTTP', value: '200', sub: 'VERIFIED', color: 'emerald' },
          { label: '/api/health', value: '404', sub: 'NOT FOUND', color: 'red' },
          { label: 'Runtime Modules', value: '11', sub: 'OPERATIONAL', color: 'cyan' },
          { label: 'Spec Modules', value: '23', sub: 'SPECIFICATION', color: 'slate' },
          { label: 'Total Catalogue', value: '34', sub: 'MODULES', color: 'blue' },
          { label: 'DB Provider', value: 'Neon', sub: 'DIVERGENCE', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${
              stat.color === 'emerald' ? 'text-emerald-300' :
              stat.color === 'red' ? 'text-red-300' :
              stat.color === 'cyan' ? 'text-cyan-300' :
              stat.color === 'amber' ? 'text-amber-300' :
              stat.color === 'blue' ? 'text-blue-300' : 'text-slate-300'
            }`}>{stat.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Critical Divergence Alert */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
        <h3 className="text-sm font-bold text-red-300 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i>
          DIVERGENCIA CRÍTICA CONFIRMADA: Neon vs Supabase
        </h3>
        <div className="text-xs text-slate-300 space-y-2">
          <p><strong>Brief arquitectónico afirma:</strong> Supabase PostgreSQL + PostGIS, ACTIVE_HEALTHY, PostgreSQL 17.x</p>
          <p><strong>Producción muestra:</strong> Capa C11 titulada "Neon PostgreSQL" con subpáginas "Proyecto y branch", "Base neondb", "Compute", "Conexión pooled"</p>
          <p className="text-red-300 font-medium">Esto es una contradicción directa. Requiere aclaración inmediata antes de continuar la auditoría.</p>
        </div>
      </div>

      {/* v1.4.1 Criteria */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-3">v1.4.1 Acceptance Criteria — Estado real</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { label: 'GitLab main es SSOT', status: 'HOLD', note: 'Sin acceso al repo' },
            { label: 'Commit productivo identificable', status: 'HOLD', note: 'Sin acceso a Vercel dashboard' },
            { label: 'Vercel deployment trazable', status: 'PARTIAL', note: 'Deployment activo verificado, pero sin commit SHA' },
            { label: 'CI reproducible', status: 'HOLD', note: 'Sin acceso a GitLab CI' },
            { label: 'Build/typecheck/lint limpios', status: 'HOLD', note: 'Sin acceso al código' },
            { label: 'Tests efectivos', status: 'HOLD', note: 'Sin acceso al código' },
            { label: '/api/health coherente', status: 'FAIL', note: 'Endpoint NO existe (404)' },
            { label: 'Migrations versionadas', status: 'HOLD', note: 'Sin acceso a migrations/' },
            { label: 'Schema reconciliado', status: 'FAIL', note: 'Divergencia Neon vs Supabase' },
            { label: 'PostGIS verificado', status: 'FAIL', note: 'No mencionado en UI (Neon)' },
            { label: 'RLS auditado', status: 'HOLD', note: 'Sin acceso a BD' },
            { label: 'Secretos auditados', status: 'HOLD', note: 'Sin acceso a env vars' },
            { label: 'Health/readiness coherentes', status: 'FAIL', note: '/api/health no existe' },
            { label: 'Docs actualizadas', status: 'HOLD', note: 'Sin acceso a README' },
            { label: 'Rollback documentado', status: 'HOLD', note: 'Sin acceso al repo' },
            { label: 'Smoke tests productivos', status: 'FAIL', note: 'No implementados' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs bg-slate-700/20 rounded p-2">
              <StatusBadge status={item.status} />
              <span className="text-slate-300 flex-1">{item.label}</span>
              <span className="text-slate-500 text-[10px]">{item.note}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-red-300 font-medium">
          RESULTADO: 0 PASS · 4 FAIL · 1 PARTIAL · 11 HOLD — v1.4.1 NO CERTIFICABLE
        </div>
      </div>
    </div>
  )
}

function VerifiedFacts() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <i className="fa-solid fa-circle-check text-emerald-400"></i>
        Verified Facts — Con fuente y fecha
      </h2>

      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
        <p className="text-xs text-emerald-300">
          <i className="fa-solid fa-info-circle mr-1"></i>
          Todos los hechos siguientes fueron verificados mediante HTTP GET anónimo el 27/09/2026. Cada hecho incluye fuente exacta.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { fact: 'Producción responde HTTP 200 en /', source: 'GET https://firecycle-platform.vercel.app/', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Título: "FIRECYCLE EXTREM · European Territorial Intelligence Platform"', source: 'HTML <title>', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Badge: "FEXT-EOS / EU OPERATIONAL TOOL / PUBLIC READ / HUMAN-IN-THE-LOOP"', source: 'HTML .eu-badge', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Estadísticas: 12 Layers, 37 Pages, 191 Subpages, 34 Catalogue modules', source: 'HTML .eu-stat', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Estado runtime: 11 Operational, 0 Connected empty, 23 Specification, 0 Hold', source: 'HTML RUNTIME CONTROL panel', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: '/api/health devuelve HTTP 404 NOT_FOUND', source: 'GET https://firecycle-platform.vercel.app/api/health', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Capa C11 titulada "Neon PostgreSQL" con "Base neondb"', source: 'HTML C11 section', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'No se menciona PostGIS en la UI de producción', source: 'Búsqueda en HTML completo', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: '11 módulos marcados OPERATIONAL: M00, M00-SAT, M01, M02, M03, M04, M06, M07, M08, M10, M16', source: 'HTML module grid data-node attributes', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'M02 Evidence Engine: "human review remains required"', source: 'HTML module description', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Truth boundary: "Programme, reference, territory-scale and financial figures... are not represented as awarded funding... unless corresponding primary evidence is registered"', source: 'HTML .eu-note', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Contexto territorial declarado: RTU-3765, Pinofranqueado-Las Hurdes, 3765.34 ha', source: 'HTML fpc-card', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Finanzas declaradas: €4.525M eligible cost, €2.715M EU contribution', source: 'HTML fpc-card', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Programas declarados: FEXT-RESILIENT, EUROHPC 2026', source: 'HTML fpc-card', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Catálogo versión: "Ecosystem catalogue v3.0.0"', source: 'HTML .eu-footer', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
          { fact: 'Vercel deployment region: iad1 (us-east-1)', source: '404 page footer', time: '27/09/2026', level: 'HECHO_DOCUMENTADO' as EvidenceLevel },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <EvidenceTag level={item.level} />
                  <span className="text-[10px] text-slate-500">{item.time}</span>
                </div>
                <p className="text-sm text-white">{item.fact}</p>
                <p className="text-xs text-slate-500 mt-1 font-mono">Source: {item.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModuleRegistry() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-cubes text-cyan-400"></i>
          Module Registry — Verificado desde producción
        </h2>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Operational (11)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span>Specification (23)</span>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
        <p className="text-xs text-amber-300">
          <i className="fa-solid fa-triangle-exclamation mr-1"></i>
          <strong>NOTA ANTI-INVENCIÓN:</strong> "OPERATIONAL" en el frontend solo confirma que el código runtime está presente. NO implica persistencia, validación, seguridad, tests ni observabilidad verificadas. Backend/DB/Tests/Security están HOLD sin acceso al código.
        </p>
      </div>

      {/* Runtime Modules */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">ID</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Name</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Runtime</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Route</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">BE</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">DB</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Tests</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Sec</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Note</th>
            </tr>
          </thead>
          <tbody>
            {runtimeModules.map(mod => (
              <tr key={mod.id} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                <td className="py-2 px-2 font-mono text-cyan-300 font-bold text-xs">{mod.id}</td>
                <td className="py-2 px-2 text-xs text-white">{mod.name}</td>
                <td className="py-2 px-2"><RuntimeBadge state={mod.runtimeState} /></td>
                <td className="py-2 px-2 text-xs text-slate-400 font-mono">{mod.route}</td>
                <td className="py-2 px-2"><StatusBadge status="HOLD" /></td>
                <td className="py-2 px-2"><StatusBadge status="HOLD" /></td>
                <td className="py-2 px-2"><StatusBadge status="HOLD" /></td>
                <td className="py-2 px-2"><StatusBadge status="HOLD" /></td>
                <td className="py-2 px-2 text-[10px] text-slate-500 max-w-[180px]">{mod.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Specification-only modules */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Specification Only (sin runtime)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {specModules.map(mod => (
            <div key={mod.id} className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">{mod.id}</span>
                <span className="text-xs text-slate-400 truncate">{mod.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Runtime Coverage</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '32%' }}></div>
          </div>
          <span className="text-sm text-emerald-300 font-bold">11/34 (32%)</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">11 módulos con runtime frontend presente. 23 en fase de especificación. Backend/DB/Tests/Security de los 11 OPERATIONAL requieren verificación adicional.</p>
      </div>
    </div>
  )
}

function FindingsPanel() {
  const [filter, setFilter] = useState<string>('ALL')
  const filteredFindings = filter === 'ALL' ? findings : findings.filter(f => f.severity === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-magnifying-glass text-orange-400"></i>
          Audit Findings — Con evidencia
        </h2>
        <div className="flex gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === sev ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredFindings.map(finding => (
          <div key={finding.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    finding.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                    finding.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300' :
                    finding.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>{finding.severity}</span>
                  <span className="text-xs font-mono text-slate-500">{finding.id}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{finding.category}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{finding.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{finding.description}</p>
                <div className="mt-2 bg-slate-700/30 rounded p-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Evidence</div>
                  <div className="text-xs text-slate-300 font-mono">{finding.evidence}</div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <i className="fa-solid fa-arrow-right text-xs text-blue-400"></i>
                  <span className="text-xs text-blue-300">{finding.recommendation}</span>
                </div>
              </div>
              <StatusBadge status={finding.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Distribution</h3>
        <div className="grid grid-cols-5 gap-4">
          {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL'].map(sev => {
            const count = findings.filter(f => f.severity === sev).length
            return (
              <div key={sev} className="text-center">
                <div className={`text-2xl font-bold ${
                  sev === 'CRITICAL' ? 'text-red-400' :
                  sev === 'HIGH' ? 'text-orange-400' :
                  sev === 'MEDIUM' ? 'text-amber-400' :
                  sev === 'LOW' ? 'text-blue-400' : 'text-slate-400'
                }`}>{count}</div>
                <div className="text-xs text-slate-500">{sev}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DivergencesPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <i className="fa-solid fa-code-branch text-red-400"></i>
        Divergences — Brief vs Production
      </h2>

      <div className="space-y-4">
        {/* Divergence 1: Neon vs Supabase */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">CRITICAL</span>
            <span className="text-sm font-semibold text-white">Divergencia 1: Proveedor de Base de Datos</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Brief afirma</div>
              <div className="text-sm text-slate-300">Supabase PostgreSQL + PostGIS</div>
              <div className="text-xs text-slate-500 mt-1">"ACTIVE_HEALTHY, PostgreSQL 17.x, PostGIS activo"</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Producción muestra</div>
              <div className="text-sm text-red-300">Neon PostgreSQL</div>
              <div className="text-xs text-slate-500 mt-1">"Base neondb, Compute, Conexión pooled" — C11-P1</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-red-300">
            <strong>Impacto:</strong> Toda la auditoría de PostGIS, spatial indexes, y extensiones depende de resolver esta divergencia. Neon tiene PostGIS disponible pero requiere verificación.
          </div>
        </div>

        {/* Divergence 2: /api/health */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">CRITICAL</span>
            <span className="text-sm font-semibold text-white">Divergencia 2: Health Endpoint</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Brief afirma</div>
              <div className="text-sm text-slate-300">GET /api/health → HTTP 200</div>
              <div className="text-xs text-slate-500 mt-1">"database connected = true, schemaReady = true"</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Producción muestra</div>
              <div className="text-sm text-red-300">HTTP 404 NOT_FOUND</div>
              <div className="text-xs text-slate-500 mt-1">"This page doesn't exist" — Vercel error page</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-red-300">
            <strong>Impacto:</strong> Sin health endpoint no es posible verificar readiness, liveness, ni estado de dependencias. Bloquea la certificación v1.4.1.
          </div>
        </div>

        {/* Divergence 3: Scope */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">HIGH</span>
            <span className="text-sm font-semibold text-white">Divergencia 3: Scope del Proyecto</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Brief describe</div>
              <div className="text-sm text-slate-300">M01 Territory Digital Twin + M02 Evidence Engine</div>
              <div className="text-xs text-slate-500 mt-1">"Se han desarrollado M01 y M02"</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Producción muestra</div>
              <div className="text-sm text-amber-300">34 módulos · 12 capas · 191 subpáginas</div>
              <div className="text-xs text-slate-500 mt-1">Incluye bioeconomía, MRV, finanzas, IA generativa, REDBIOMASA, Operación Rosendo</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-amber-300">
            <strong>Impacto:</strong> El brief arquitectónico está desactualizado. El proyecto real es significativamente más amplio. Requiere documentación de scope actualizada.
          </div>
        </div>

        {/* Divergence 4: PostGIS */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">MEDIUM</span>
            <span className="text-sm font-semibold text-white">Divergencia 4: PostGIS</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Brief afirma</div>
              <div className="text-sm text-slate-300">PostGIS activo en Supabase</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Producción muestra</div>
              <div className="text-sm text-amber-300">Sin mención de PostGIS</div>
              <div className="text-xs text-slate-500 mt-1">C11 solo menciona "Neon PostgreSQL"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlMatrix() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <i className="fa-solid fa-table-list text-indigo-400"></i>
        Control Matrix — BEFORE / ACTION / AFTER
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Control</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Before</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Action</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">After</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Evidence</th>
              <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {controlMatrix.map((item, i) => (
              <tr key={i} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                <td className="py-2 px-2 text-slate-200 font-medium text-xs">{item.control}</td>
                <td className="py-2 px-2 text-xs text-slate-400">{item.before}</td>
                <td className="py-2 px-2 text-xs text-slate-500 max-w-[150px]">{item.action}</td>
                <td className="py-2 px-2 text-xs text-slate-300">{item.after}</td>
                <td className="py-2 px-2 text-[10px] text-slate-500 max-w-[150px]">{item.evidence}</td>
                <td className="py-2 px-2"><StatusBadge status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'PASS', count: controlMatrix.filter(c => c.status === 'PASS').length, color: 'emerald' },
          { label: 'FAIL', count: controlMatrix.filter(c => c.status === 'FAIL').length, color: 'red' },
          { label: 'HOLD', count: controlMatrix.filter(c => c.status === 'HOLD').length, color: 'amber' },
          { label: 'PARTIAL', count: controlMatrix.filter(c => c.status === 'PARTIAL').length, color: 'cyan' },
        ].map(item => (
          <div key={item.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
            <div className={`text-3xl font-bold ${
              item.color === 'emerald' ? 'text-emerald-400' :
              item.color === 'red' ? 'text-red-400' :
              item.color === 'amber' ? 'text-amber-400' : 'text-cyan-400'
            }`}>{item.count}</div>
            <div className="text-xs text-slate-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RemediationPlan() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <i className="fa-solid fa-list-check text-emerald-400"></i>
        Prioritized Remediation Plan
      </h2>

      <div className="space-y-4">
        {[
          { priority: 0, phase: 'Phase 0: Resolver Divergencia Neon vs Supabase', tasks: ['Aclarar si la BD es Neon o Supabase', 'Documentar decisión arquitectónica canónica', 'Si es Neon: verificar PostGIS disponible', 'Si es Supabase: corregir UI C11', 'Actualizar brief arquitectónico'], effort: '1 día', critical: true },
          { priority: 1, phase: 'Phase 1: Implementar /api/health', tasks: ['Crear endpoint GET /api/health', 'Exponer: status, service, version, commit, environment, timestamp', 'Exponer: database.connected, database.schemaReady', 'NO exponer: passwords, tokens, connection strings', 'Añadir schema version'], effort: '1-2 días', critical: true },
          { priority: 2, phase: 'Phase 2: Acceso al Repositorio', tasks: ['Obtener acceso de lectura a GitLab', 'Inspeccionar HEAD real de main', 'Inventariar archivos y estructura', 'Buscar TODO/FIXME/HACK/MOCK', 'Ejecutar baseline local'], effort: '1 día', critical: true },
          { priority: 3, phase: 'Phase 3: Auditoría de Seguridad', tasks: ['Auditar RLS policies (DENY BY DEFAULT)', 'Verificar no exposición de service_role', 'Auditar variables NEXT_PUBLIC_*', 'Revisar CORS/headers/cookies', 'Input validation review'], effort: '3-5 días', critical: false },
          { priority: 4, phase: 'Phase 4: Verificación de Módulos OPERATIONAL', tasks: ['Para cada uno de los 11 módulos OPERATIONAL:', 'Verificar persistencia real en BD', 'Verificar validación de input', 'Verificar tests existentes', 'Verificar logs/observabilidad', 'Solo entonces marcar PRODUCTION READY'], effort: '5-7 días', critical: false },
          { priority: 5, phase: 'Phase 5: CI/CD Hardening', tasks: ['Verificar pipeline stages reales', 'Añadir security scanning', 'Añadir migration validation', 'Implementar smoke tests', 'Distinguir PIPELINE PASSED de TEST SUITE PASSED'], effort: '2-3 días', critical: false },
          { priority: 6, phase: 'Phase 6: Certificación v1.4.1', tasks: ['Verificar todos los criterios de aceptación', 'Generar evidence package', 'Documentar rollback procedures', 'Tag v1.4.1'], effort: '2-3 días', critical: false },
        ].map((phase, i) => (
          <div key={i} className={`bg-slate-800/50 border rounded-xl p-5 ${phase.critical ? 'border-red-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                phase.critical ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                i <= 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-700/50 text-slate-300 border border-slate-600/30'
              }`}>
                P{phase.priority}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{phase.phase}</h3>
                  <div className="flex items-center gap-2">
                    {phase.critical && <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300">CRITICAL PATH</span>}
                    <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{phase.effort}</span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                      <i className="fa-regular fa-square text-slate-600"></i>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Estimated Timeline to v1.4.1</h3>
        <div className="text-xs text-slate-400 space-y-1">
          <p>Phase 0 (Divergencia): 1 día — <span className="text-red-300">BLOQUEANTE</span></p>
          <p>Phase 1 (/api/health): 1-2 días — <span className="text-red-300">BLOQUEANTE</span></p>
          <p>Phase 2 (Acceso repo): 1 día — <span className="text-red-300">BLOQUEANTE</span></p>
          <p>Phase 3 (Seguridad): 3-5 días</p>
          <p>Phase 4 (Módulos): 5-7 días</p>
          <p>Phase 5 (CI/CD): 2-3 días</p>
          <p>Phase 6 (Certificación): 2-3 días</p>
          <p className="text-emerald-300 font-bold mt-2">Total estimado: 15-22 días laborables</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('executive')

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      <Navigation active={activeTab} setActive={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'executive' && <ExecutiveStatus />}
        {activeTab === 'verified' && <VerifiedFacts />}
        {activeTab === 'modules' && <ModuleRegistry />}
        {activeTab === 'findings' && <FindingsPanel />}
        {activeTab === 'divergences' && <DivergencesPanel />}
        {activeTab === 'controls' && <ControlMatrix />}
        {activeTab === 'remediation' && <RemediationPlan />}
      </main>

      <footer className="border-t border-slate-700/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <i className="fa-solid fa-fire text-white text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">FIRECYCLE EXTREM — FEXT-EOS</div>
                <div className="text-xs text-slate-500">Evidence-Based Audit · No invention · v1.4.2</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Canonical Baseline Audit — Report 001</span>
              <span>•</span>
              <span className="font-mono">NIVEL_ACCESO=(a)</span>
              <span>•</span>
              <span>27/09/2026</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/20 text-center">
            <p className="text-xs text-slate-600">
              PRINCIPLE: PRESERVE WHAT WORKS · VERIFY WHAT EXISTS · CORRECT WHAT IS WRONG · NO INVENTION · EVIDENCE-BASED ONLY
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
