import { useState } from 'react'

// Types
type Status = 'PASS' | 'FAIL' | 'HOLD' | 'NOT_APPLICABLE' | 'VERIFIED' | 'PARTIAL' | 'MISSING' | 'BLOCKED'
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL'
type ModuleStatus = 'NOT_STARTED' | 'SKELETON' | 'PARTIAL' | 'FUNCTIONAL' | 'PRODUCTION_READY'

interface Module {
  id: string
  name: string
  purpose: string
  status: ModuleStatus
  frontend: Status
  backend: Status
  database: Status
  api: Status
  tests: Status
  security: Status
  nextAction: string
}

interface Finding {
  id: string
  title: string
  severity: Severity
  category: string
  description: string
  status: Status
  recommendation: string
}

interface ControlItem {
  control: string
  before: string
  action: string
  after: string
  evidence: string
  status: Status
}

// Data
const modules: Module[] = [
  { id: 'M00', name: 'Foundation & Infrastructure', purpose: 'Core platform, auth, DB, CI/CD, deployment chain', status: 'FUNCTIONAL', frontend: 'VERIFIED', backend: 'VERIFIED', database: 'VERIFIED', api: 'VERIFIED', tests: 'PARTIAL', security: 'PARTIAL', nextAction: 'Complete RLS audit, harden CI pipeline' },
  { id: 'M01', name: 'Territory Digital Twin', purpose: 'Spatial territory model with PostGIS geometry', status: 'PARTIAL', frontend: 'PARTIAL', backend: 'PARTIAL', database: 'PARTIAL', api: 'PARTIAL', tests: 'MISSING', security: 'PARTIAL', nextAction: 'Verify PostGIS geometry, SRID consistency, spatial indexes' },
  { id: 'M02', name: 'Evidence Engine', purpose: 'Evidence lifecycle: source→acquisition→processing→review→validation', status: 'PARTIAL', frontend: 'PARTIAL', backend: 'PARTIAL', database: 'PARTIAL', api: 'PARTIAL', tests: 'MISSING', security: 'PARTIAL', nextAction: 'Implement provenance chain, separate AI output from validated evidence' },
  { id: 'M03', name: 'Burn Severity Analysis', purpose: 'NBR/dNBR/RdNBR/RBR computation from Sentinel-2', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design data model, define spectral index pipeline' },
  { id: 'M04', name: 'Fire Perimeter Management', purpose: 'Authoritative fire perimeter ingestion and validation', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Define perimeter model, distinguish from detections/burned area' },
  { id: 'M05', name: 'Active Fire Detection', purpose: 'VIIRS/MODIS/EFFIS active fire integration', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design ingestion pipeline for satellite fire products' },
  { id: 'M06', name: 'Post-Wildfire Assessment', purpose: 'Multi-criteria post-fire environmental assessment', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Define assessment framework and scoring methodology' },
  { id: 'M07', name: 'Restoration Priority Model', purpose: 'Priority ranking for ecosystem restoration actions', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Define criteria weights, spatial prioritization algorithm' },
  { id: 'M08', name: 'NDVI Vegetation Monitor', purpose: 'Vegetation index time-series analysis', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design temporal analysis model, COG integration' },
  { id: 'M09', name: 'DEM/Topography Analysis', purpose: 'Terrain analysis for fire behavior modeling', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Integrate DEM sources, slope/aspect computation' },
  { id: 'M10', name: 'Decision Support Dashboard', purpose: 'Interactive decision support for environmental consultants', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Depends on M01-M09 maturity' },
  { id: 'M11', name: 'Evidence Governance & Audit', purpose: 'Immutable evidence trail, provenance, chain of custody', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design audit log schema, integrity verification' },
  { id: 'M12', name: 'ArcGIS Interoperability', purpose: 'Optional ArcGIS Pro/Online data exchange layer', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design OGC-compliant export, keep optional' },
  { id: 'M13', name: 'STAC Catalog Integration', purpose: 'SpatioTemporal Asset Catalog for EO data discovery', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Evaluate STAC API integration for Sentinel-2' },
  { id: 'M14', name: 'Reporting & Export', purpose: 'Professional report generation, PDF/GeoPDF export', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Define report templates, evidence-based output' },
  { id: 'M15', name: 'Multi-Tenant & Access Control', purpose: 'Organization-level isolation, role-based permissions', status: 'NOT_STARTED', frontend: 'NOT_APPLICABLE', backend: 'NOT_APPLICABLE', database: 'NOT_APPLICABLE', api: 'NOT_APPLICABLE', tests: 'NOT_APPLICABLE', security: 'NOT_APPLICABLE', nextAction: 'Design tenant model, extend RLS policies' },
  { id: 'M16', name: 'Observability & SRE', purpose: 'Structured logging, monitoring, alerting, SLOs', status: 'SKELETON', frontend: 'NOT_APPLICABLE', backend: 'PARTIAL', database: 'NOT_APPLICABLE', api: 'PARTIAL', tests: 'MISSING', security: 'NOT_APPLICABLE', nextAction: 'Implement structured logging, request IDs, health SLOs' },
]

const findings: Finding[] = [
  { id: 'SEC-001', title: 'RLS Policy Audit Incomplete', severity: 'CRITICAL', category: 'Security', description: 'Row Level Security policies have not been fully audited across all operational tables. Default-allow policies may expose sensitive data.', status: 'FAIL', recommendation: 'Complete RLS audit, enforce DENY BY DEFAULT for operational data' },
  { id: 'SEC-002', title: 'Service Role Key Exposure Risk', severity: 'CRITICAL', category: 'Security', description: 'Must verify service_role key is never exposed to browser or NEXT_PUBLIC_* variables.', status: 'HOLD', recommendation: 'Audit all env vars, confirm no NEXT_PUBLIC_ contains service_role' },
  { id: 'SEC-003', title: 'Health Endpoint Information Leakage', severity: 'MEDIUM', category: 'Security', description: 'Health endpoint must expose version/commit but must never expose connection strings, tokens, or internal paths.', status: 'PARTIAL', recommendation: 'Implement allowlist-based health response schema' },
  { id: 'DB-001', title: 'Migration Versioning Gap', severity: 'HIGH', category: 'Database', description: 'Schema changes may have been applied directly to Supabase without corresponding versioned migrations in GitLab.', status: 'FAIL', recommendation: 'Reconcile production schema with migrations/, create migration for any drift' },
  { id: 'DB-002', title: 'PostGIS Extension Location', severity: 'MEDIUM', category: 'Database', description: 'PostGIS installed in public schema. Known warning exists. Must not be moved without tested migration + rollback.', status: 'HOLD', recommendation: 'Document current state, do not move without full rollback plan' },
  { id: 'DB-003', title: 'Spatial Index Verification', severity: 'HIGH', category: 'Database', description: 'Spatial indexes on geometry columns must be verified for M01 territory tables.', status: 'FAIL', recommendation: 'Audit all geometry columns, ensure GiST indexes exist' },
  { id: 'CI-001', title: 'CI Test Execution Verification', severity: 'HIGH', category: 'CI/CD', description: 'Pipeline may pass without actually running meaningful tests. Must distinguish PIPELINE PASSED from TEST SUITE PASSED.', status: 'PARTIAL', recommendation: 'Verify test runner executes real tests, add test count assertion' },
  { id: 'CI-002', title: 'Deployment Traceability', severity: 'MEDIUM', category: 'CI/CD', description: 'Production deployment must show exact commit SHA matching GitLab main.', status: 'PARTIAL', recommendation: 'Implement build metadata injection (APP_VERSION, GIT_COMMIT_SHA, BUILD_TIME)' },
  { id: 'CI-003', title: 'Migration Validation in CI', severity: 'HIGH', category: 'CI/CD', description: 'CI should validate migrations are syntactically correct and reversible where possible.', status: 'FAIL', recommendation: 'Add migration dry-run or lint step to pipeline' },
  { id: 'ARCH-001', title: 'SSOT Enforcement', severity: 'HIGH', category: 'Architecture', description: 'GitLab main must be the single source of truth for both code and schema. No manual production changes.', status: 'PARTIAL', recommendation: 'Document SSOT policy, implement drift detection' },
  { id: 'ARCH-002', title: 'Evidence vs Data Distinction', severity: 'HIGH', category: 'Architecture', description: 'M02 must clearly separate raw data, AI output, derived results, and validated evidence. AI OUTPUT ≠ VERIFIED EVIDENCE.', status: 'FAIL', recommendation: 'Implement evidence state machine with explicit validation gates' },
  { id: 'ARCH-003', title: 'Fire Data Category Confusion', severity: 'MEDIUM', category: 'Architecture', description: 'Must not conflate AUTHORITATIVE PERIMETER, ACTIVE DETECTIONS, DERIVED BURNED AREA, and BURN SEVERITY.', status: 'FAIL', recommendation: 'Define distinct data models with clear provenance labels' },
]

const controlMatrix: ControlItem[] = [
  { control: 'GitLab main as SSOT', before: 'PARTIAL', action: 'Verify deployment source, enforce branch protection', after: 'VERIFIED', evidence: 'Vercel deployment linked to GitLab main', status: 'HOLD' },
  { control: 'Commit SHA traceability', before: 'NOT IMPLEMENTED', action: 'Inject build metadata into /api/health', after: 'EXPOSED', evidence: 'Health endpoint returns commit SHA', status: 'FAIL' },
  { control: 'CI pipeline stages', before: 'BASIC', action: 'Add typecheck, lint, test, security stages', after: 'FULL PIPELINE', evidence: '.gitlab-ci.yml with all stages', status: 'PARTIAL' },
  { control: 'Test execution verification', before: 'UNVERIFIED', action: 'Assert test count > 0 in CI output', after: 'VERIFIED', evidence: 'CI log shows test execution', status: 'FAIL' },
  { control: 'Migration versioning', before: 'PARTIAL', action: 'Reconcile schema, add missing migrations', after: 'COMPLETE', evidence: 'All schema changes in migrations/', status: 'FAIL' },
  { control: 'RLS audit', before: 'NOT AUDITED', action: 'Full RLS policy review, DENY BY DEFAULT', after: 'AUDITED', evidence: 'RLS audit report per table', status: 'FAIL' },
  { control: 'Secret audit', before: 'NOT AUDITED', action: 'Scan for exposed secrets, verify env isolation', after: 'CLEAN', evidence: 'Secret scan report', status: 'HOLD' },
  { control: 'Health endpoint', before: 'BASIC', action: 'Add version, commit, schema version, dependencies', after: 'COMPREHENSIVE', evidence: 'GET /api/health response', status: 'PARTIAL' },
  { control: 'PostGIS verification', before: 'ACTIVE', action: 'Verify extension, spatial indexes, SRID', after: 'VERIFIED', evidence: 'PostGIS audit report', status: 'HOLD' },
  { control: 'Smoke tests', before: 'NONE', action: 'Implement production smoke test suite', after: 'AUTOMATED', evidence: 'Smoke test results', status: 'FAIL' },
  { control: 'Documentation', before: 'PARTIAL', action: 'Update README, architecture docs, runbooks', after: 'CURRENT', evidence: 'Updated docs in main', status: 'PARTIAL' },
  { control: 'Rollback strategy', before: 'NOT DOCUMENTED', action: 'Document rollback procedures per component', after: 'DOCUMENTED', evidence: 'Rollback runbook', status: 'FAIL' },
]

const remediationPlan = [
  { priority: 1, phase: 'Phase 1: Forensic Inventory', tasks: ['Complete repository inventory', 'Identify all TODO/FIXME/HACK/MOCK markers', 'Classify mock vs real data usage', 'Document all environment variables'], effort: '2-3 days' },
  { priority: 2, phase: 'Phase 2: GitLab ↔ Vercel Reconciliation', tasks: ['Verify Vercel deployment source', 'Inject build metadata (APP_VERSION, GIT_COMMIT_SHA, BUILD_TIME)', 'Update /api/health with deployment info', 'Confirm commit SHA matches main'], effort: '1-2 days' },
  { priority: 3, phase: 'Phase 3: CI/CD Hardening', tasks: ['Add typecheck stage', 'Add lint stage', 'Verify test execution', 'Add security scanning', 'Add migration validation'], effort: '2-3 days' },
  { priority: 4, phase: 'Phase 4: Database Reconciliation', tasks: ['Audit all tables/views/functions', 'Reconcile schema with migrations/', 'Verify PostGIS state', 'Document all spatial objects'], effort: '3-4 days' },
  { priority: 5, phase: 'Phase 5: RLS & Security', tasks: ['Full RLS policy audit', 'Enforce DENY BY DEFAULT', 'Verify no service_role exposure', 'Audit CORS/headers/cookies', 'Input validation review'], effort: '3-5 days' },
  { priority: 6, phase: 'Phase 6: M01/M02 Stabilization', tasks: ['Verify Territory Digital Twin PostGIS model', 'Implement Evidence Engine state machine', 'Add spatial indexes', 'Write integration tests'], effort: '5-7 days' },
  { priority: 7, phase: 'Phase 7: v1.4.1 Certification', tasks: ['Run full test suite', 'Execute smoke tests', 'Verify all acceptance criteria', 'Generate evidence package', 'Tag v1.4.1'], effort: '2-3 days' },
]

// Components
function StatusBadge({ status }: { status: Status | ModuleStatus | string }) {
  const colors: Record<string, string> = {
    'PASS': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'FAIL': 'bg-red-500/20 text-red-300 border-red-500/30',
    'HOLD': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'NOT_APPLICABLE': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'VERIFIED': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'PARTIAL': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'MISSING': 'bg-red-500/20 text-red-300 border-red-500/30',
    'BLOCKED': 'bg-red-500/20 text-red-300 border-red-500/30',
    'NOT_STARTED': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'SKELETON': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'FUNCTIONAL': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'PRODUCTION_READY': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'CRITICAL': 'bg-red-500/20 text-red-300 border-red-500/30',
    'HIGH': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'MEDIUM': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'LOW': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'INFORMATIONAL': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'PARTIALLY VERIFIED': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'NOT VERIFIED': 'bg-red-500/20 text-red-300 border-red-500/30',
  }
  const colorClass = colors[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function SeverityIcon({ severity }: { severity: Severity }) {
  const icons: Record<string, { icon: string; color: string }> = {
    'CRITICAL': { icon: 'fa-circle-exclamation', color: 'text-red-400' },
    'HIGH': { icon: 'fa-triangle-exclamation', color: 'text-orange-400' },
    'MEDIUM': { icon: 'fa-exclamation', color: 'text-amber-400' },
    'LOW': { icon: 'fa-circle-info', color: 'text-blue-400' },
    'INFORMATIONAL': { icon: 'fa-info', color: 'text-slate-400' },
  }
  const { icon, color } = icons[severity] || icons['INFORMATIONAL']
  return <i className={`fa-solid ${icon} ${color} mr-2`}></i>
}

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <i className="fa-solid fa-fire text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">FIRECYCLE EXTREM</h1>
              <p className="text-xs text-slate-400 font-mono">FEXT-EOS v1.4.1 — Canonical Baseline Audit</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <i className="fa-solid fa-code-commit"></i>
              <span className="font-mono">6257d8d</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <i className="fa-solid fa-calendar"></i>
              <span>27/09/2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs text-amber-300 font-medium">AUDIT IN PROGRESS</span>
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
    { id: 'modules', label: 'M00–M16 Registry', icon: 'fa-cubes' },
    { id: 'findings', label: 'Findings', icon: 'fa-magnifying-glass' },
    { id: 'controls', label: 'Control Matrix', icon: 'fa-table-list' },
    { id: 'remediation', label: 'Remediation Plan', icon: 'fa-list-check' },
    { id: 'architecture', label: 'Architecture', icon: 'fa-diagram-project' },
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
  const stats = [
    { label: 'Modules Audited', value: '2/17', color: 'text-amber-300', icon: 'fa-cubes' },
    { label: 'Critical Findings', value: '2', color: 'text-red-300', icon: 'fa-circle-exclamation' },
    { label: 'High Findings', value: '5', color: 'text-orange-300', icon: 'fa-triangle-exclamation' },
    { label: 'Controls Passing', value: '1/12', color: 'text-amber-300', icon: 'fa-shield-halved' },
    { label: 'CI Stages Active', value: '3/8', color: 'text-amber-300', icon: 'fa-code-branch' },
    { label: 'RLS Tables Audited', value: '0%', color: 'text-red-300', icon: 'fa-lock' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className={`fa-solid ${stat.icon} ${stat.color} text-sm`}></i>
              <span className="text-xs text-slate-400">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-file-lines text-blue-400"></i>
          Report 001 — Executive Summary
        </h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="font-semibold text-red-300 mb-1">⚠ CRITICAL STATE</p>
            <p>The system is operationally deployed but has NOT achieved v1.4.1 canonical baseline certification. Multiple critical gaps exist in security (RLS), database reconciliation, and evidence governance.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Verified Facts</h3>
              <ul className="space-y-1 text-slate-400">
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>GitLab repo exists: uuu8761935/firecycle-platform</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>Branch main exists with commit 6257d8d</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>Vercel deployment active: firecycle-platform.vercel.app</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>Supabase ACTIVE_HEALTHY, PostgreSQL 17.x</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>PostGIS extension active</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>/api/health returns HTTP 200</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>CI pipeline exists (.gitlab-ci.yml)</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-check text-emerald-400 mt-0.5 text-xs"></i>M01 and M02 partially implemented</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Critical Gaps</h3>
              <ul className="space-y-1 text-slate-400">
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>RLS not fully audited — DENY BY DEFAULT not enforced</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>Schema reconciliation with migrations/ incomplete</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>Build metadata not injected (no commit SHA in health)</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>CI test execution not verified as meaningful</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>Evidence Engine state machine not implemented</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>No smoke tests for production</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>Rollback procedures not documented</li>
                <li className="flex items-start gap-2"><i className="fa-solid fa-xmark text-red-400 mt-0.5 text-xs"></i>14 of 17 modules NOT STARTED</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">v1.4.1 Acceptance Criteria</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: 'GitLab main SSOT', done: false },
                { label: 'Commit identifiable', done: false },
                { label: 'Vercel traceable', done: false },
                { label: 'CI reproducible', done: false },
                { label: 'Build clean', done: true },
                { label: 'Typecheck clean', done: true },
                { label: 'Lint clean', done: true },
                { label: 'Tests effective', done: false },
                { label: 'Migrations versioned', done: false },
                { label: 'Schema reconciled', done: false },
                { label: 'PostGIS verified', done: false },
                { label: 'RLS audited', done: false },
                { label: 'Secrets audited', done: false },
                { label: 'Health coherent', done: false },
                { label: 'Docs updated', done: false },
                { label: 'Rollback documented', done: false },
                { label: 'Smoke tests', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <i className={`fa-solid ${item.done ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-red-400'}`}></i>
                  <span className={item.done ? 'text-slate-300' : 'text-slate-500'}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Chain */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-link text-purple-400"></i>
          Production Chain Status
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { label: 'GitLab main', status: 'VERIFIED', color: 'emerald' },
            { label: 'Commit 6257d8d', status: 'VERIFIED', color: 'emerald' },
            { label: 'CI Pipeline', status: 'PARTIAL', color: 'amber' },
            { label: 'Vercel Deploy', status: 'PARTIAL', color: 'amber' },
            { label: 'Runtime', status: 'VERIFIED', color: 'emerald' },
            { label: '/api/health', status: 'PARTIAL', color: 'amber' },
            { label: 'Supabase', status: 'VERIFIED', color: 'emerald' },
            { label: 'PostGIS', status: 'HOLD', color: 'amber' },
            { label: 'Schema/Migrations', status: 'FAIL', color: 'red' },
            { label: 'RLS/Security', status: 'FAIL', color: 'red' },
            { label: 'M00–M16', status: 'FAIL', color: 'red' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-lg border ${
                step.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
                step.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
                'bg-red-500/10 border-red-500/30 text-red-300'
              }`}>
                <span className="font-medium">{step.label}</span>
              </div>
              {i < 10 && <i className="fa-solid fa-chevron-right text-slate-600"></i>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModuleRegistry() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-cubes text-cyan-400"></i>
          Module Registry — M00 to M16
        </h2>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Production Ready</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>Functional</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span>Partial</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span>Not Started</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-3 text-slate-400 font-medium">ID</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Module</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Status</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">FE</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">BE</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">DB</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">API</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Tests</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Security</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Next Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <tr key={mod.id} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                <td className="py-3 px-3 font-mono text-cyan-300 font-bold">{mod.id}</td>
                <td className="py-3 px-3">
                  <div className="font-medium text-white">{mod.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5 max-w-xs">{mod.purpose}</div>
                </td>
                <td className="py-3 px-3"><StatusBadge status={mod.status} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.frontend} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.backend} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.database} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.api} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.tests} /></td>
                <td className="py-3 px-3"><StatusBadge status={mod.security} /></td>
                <td className="py-3 px-3 text-xs text-slate-400 max-w-[200px]">{mod.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Module Progress Bar */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Module Completion Overview</h3>
        <div className="space-y-2">
          {modules.map(mod => {
            const statuses = [mod.frontend, mod.backend, mod.database, mod.api, mod.tests, mod.security]
            const validStatuses = statuses.filter(s => s !== 'NOT_APPLICABLE')
            const verified = validStatuses.filter(s => s === 'VERIFIED').length
            const partial = validStatuses.filter(s => s === 'PARTIAL').length
            const total = validStatuses.length
            const progress = total > 0 ? ((verified + partial * 0.5) / total) * 100 : 0
            return (
              <div key={mod.id} className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300 w-8">{mod.id}</span>
                <span className="text-xs text-slate-300 w-48 truncate">{mod.name}</span>
                <div className="flex-1 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      progress === 100 ? 'bg-emerald-500' :
                      progress > 50 ? 'bg-cyan-500' :
                      progress > 0 ? 'bg-amber-500' : 'bg-slate-600'
                    }`}
                    style={{ width: `${Math.max(progress, 2)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-400 w-10 text-right">{Math.round(progress)}%</span>
              </div>
            )
          })}
        </div>
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
          Audit Findings
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
          <div key={finding.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <SeverityIcon severity={finding.severity} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">{finding.id}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{finding.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{finding.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{finding.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <i className="fa-solid fa-arrow-right text-xs text-blue-400"></i>
                    <span className="text-xs text-blue-300">{finding.recommendation}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={finding.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Findings Distribution</h3>
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
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Control</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Before</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Action</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">After</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Evidence</th>
              <th className="text-left py-3 px-3 text-slate-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {controlMatrix.map((item, i) => (
              <tr key={i} className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors">
                <td className="py-3 px-3 text-slate-200 font-medium text-xs">{item.control}</td>
                <td className="py-3 px-3 text-xs text-red-300">{item.before}</td>
                <td className="py-3 px-3 text-xs text-slate-400 max-w-[200px]">{item.action}</td>
                <td className="py-3 px-3 text-xs text-emerald-300">{item.after}</td>
                <td className="py-3 px-3 text-xs text-slate-500 max-w-[150px]">{item.evidence}</td>
                <td className="py-3 px-3"><StatusBadge status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'PASS', count: controlMatrix.filter(c => c.status === 'PASS').length, color: 'emerald' },
          { label: 'FAIL', count: controlMatrix.filter(c => c.status === 'FAIL').length, color: 'red' },
          { label: 'HOLD', count: controlMatrix.filter(c => c.status === 'HOLD').length, color: 'amber' },
          { label: 'PARTIAL', count: controlMatrix.filter(c => c.status === 'PARTIAL').length, color: 'cyan' },
        ].map(item => (
          <div key={item.label} className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center`}>
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
        {remediationPlan.map((phase, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                i === 0 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                i === 1 ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                i === 2 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-700/50 text-slate-300 border border-slate-600/30'
              }`}>
                P{phase.priority}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{phase.phase}</h3>
                  <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{phase.effort}</span>
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
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
          {remediationPlan.map((phase, i) => (
            <div key={i} className="relative pl-10 pb-4 last:pb-0">
              <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                i < 2 ? 'bg-red-500 border-red-400' :
                i < 4 ? 'bg-amber-500 border-amber-400' :
                'bg-slate-600 border-slate-500'
              }`}></div>
              <div className="text-xs text-slate-300 font-medium">{phase.phase}</div>
              <div className="text-xs text-slate-500">{phase.effort}</div>
            </div>
          ))}
          <div className="relative pl-10 pt-2">
            <div className="absolute left-2.5 w-3 h-3 rounded-full border-2 bg-emerald-500 border-emerald-400"></div>
            <div className="text-xs text-emerald-300 font-bold">v1.4.1 CERTIFIED</div>
            <div className="text-xs text-slate-500">Total: ~18-27 days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArchitectureView() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <i className="fa-solid fa-diagram-project text-purple-400"></i>
        Architecture & Traceability
      </h2>

      {/* Production Chain Diagram */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Canonical Production Chain</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Source</div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-gitlab text-orange-400"></i>
                <span className="text-xs text-emerald-300 font-medium">GitLab main</span>
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">6257d8d8b655...</div>
            </div>
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-code-branch text-blue-400"></i>
                <span className="text-xs text-slate-300">CI Pipeline</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">install → typecheck → lint → test → build</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Deploy</div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-rocket text-purple-400"></i>
                <span className="text-xs text-amber-300 font-medium">Vercel</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">firecycle-platform.vercel.app</div>
            </div>
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-server text-cyan-400"></i>
                <span className="text-xs text-slate-300">Runtime</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Next.js /api/* endpoints</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Data</div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-database text-green-400"></i>
                <span className="text-xs text-emerald-300 font-medium">Supabase</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">PostgreSQL 17.x + PostGIS</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-red-400"></i>
                <span className="text-xs text-red-300 font-medium">RLS / Security</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">AUDIT REQUIRED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Model */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Evidence Lifecycle Model (M02)</h3>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'SOURCE', color: 'blue' },
            { label: 'ACQUISITION', color: 'cyan' },
            { label: 'PROCESSING', color: 'purple' },
            { label: 'DERIVED', color: 'amber' },
            { label: 'HUMAN REVIEW', color: 'orange' },
            { label: 'VALIDATION', color: 'emerald' },
            { label: 'DECISION', color: 'green' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`px-3 py-2 rounded-lg border text-xs font-medium ${
                step.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' :
                step.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' :
                step.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' :
                step.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
                step.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30 text-orange-300' :
                step.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
                'bg-green-500/10 border-green-500/30 text-green-300'
              }`}>
                {step.label}
              </div>
              {i < 6 && <i className="fa-solid fa-arrow-right text-slate-600 text-xs"></i>}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-xs text-red-300 font-medium">
            <i className="fa-solid fa-triangle-exclamation mr-1"></i>
            CRITICAL PRINCIPLE: AI OUTPUT ≠ VERIFIED EVIDENCE. No automated promotion of model results to validated evidence status.
          </p>
        </div>
      </div>

      {/* Fire Data Categories */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Fire Data Categories — MUST NOT CONFUSE</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Authoritative Perimeter', desc: 'Official fire boundary from authorities', icon: 'fa-border-all', color: 'red' },
            { label: 'Active Detections', desc: 'VIIRS/MODIS hotspots (real-time)', icon: 'fa-fire', color: 'orange' },
            { label: 'Derived Burned Area', desc: 'Computed from spectral indices', icon: 'fa-map', color: 'amber' },
            { label: 'Burn Severity', desc: 'NBR/dNBR classification', icon: 'fa-chart-bar', color: 'yellow' },
          ].map((cat, i) => (
            <div key={i} className={`rounded-lg border p-3 ${
              cat.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
              cat.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
              cat.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' :
              'bg-yellow-500/10 border-yellow-500/30'
            }`}>
              <i className={`fa-solid ${cat.icon} text-lg mb-2 ${
                cat.color === 'red' ? 'text-red-400' :
                cat.color === 'orange' ? 'text-orange-400' :
                cat.color === 'amber' ? 'text-amber-400' : 'text-yellow-400'
              }`}></i>
              <div className="text-xs font-medium text-white">{cat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{cat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interoperability */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Interoperability Architecture</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: 'FEXT-EOS', icon: 'fa-fire', color: 'orange' },
            { label: 'PostGIS', icon: 'fa-database', color: 'green' },
            { label: 'Supabase', icon: 'fa-server', color: 'emerald' },
            { label: 'ArcGIS (optional)', icon: 'fa-globe', color: 'blue' },
            { label: 'EO Sources', icon: 'fa-satellite', color: 'purple' },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`px-4 py-3 rounded-xl border ${
                node.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                node.color === 'green' ? 'bg-green-500/10 border-green-500/30' :
                node.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30' :
                node.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30' :
                'bg-purple-500/10 border-purple-500/30'
              }`}>
                <i className={`fa-solid ${node.icon} text-lg mb-1 ${
                  node.color === 'orange' ? 'text-orange-400' :
                  node.color === 'green' ? 'text-green-400' :
                  node.color === 'emerald' ? 'text-emerald-400' :
                  node.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                }`}></i>
                <div className="text-xs font-medium text-white text-center">{node.label}</div>
              </div>
              {i < 4 && <i className="fa-solid fa-arrows-left-right text-slate-600"></i>}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/30 border border-slate-600/30">
            <span className="text-xs text-slate-400">Standards: GeoJSON • OGC • COG • GeoTIFF • STAC • WMS/WFS</span>
          </div>
        </div>
      </div>

      {/* Prohibitions */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-red-300 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-ban"></i>
          Absolute Prohibitions
        </h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-400">
          {[
            'Do not reconstruct the entire platform',
            'Do not drop tables without evidence',
            'Do not delete indexes from automated warnings',
            'Do not move PostGIS without tested migration',
            'Do not disable RLS to make APIs work',
            'Do not expose service_role to browser',
            'Do not hardcode secrets',
            'Do not mark mocks as production',
            'Do not declare success without proof',
            'Do not invent data or facts',
            'Do not confuse perimeter/detections/severity',
            'Do not auto-promote AI output to evidence',
            'Do not introduce unnecessary infrastructure',
            'Do not use production as experimental env',
          ].map((rule, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className="fa-solid fa-xmark text-red-500/60 text-xs"></i>
              <span>{rule}</span>
            </div>
          ))}
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
        {activeTab === 'modules' && <ModuleRegistry />}
        {activeTab === 'findings' && <FindingsPanel />}
        {activeTab === 'controls' && <ControlMatrix />}
        {activeTab === 'remediation' && <RemediationPlan />}
        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <i className="fa-solid fa-fire text-white text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">FIRECYCLE EXTREM — FEXT-EOS</div>
                <div className="text-xs text-slate-500">Environmental Intelligence • Post-Wildfire Decision Support</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Canonical Baseline Audit — Report 001</span>
              <span>•</span>
              <span className="font-mono">v1.4.1</span>
              <span>•</span>
              <span>27/09/2026</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/20 text-center">
            <p className="text-xs text-slate-600">
              PRINCIPLE: PRESERVE WHAT WORKS • VERIFY WHAT EXISTS • CORRECT WHAT IS WRONG • ELIMINATE DIVERGENCE • HARDEN SECURITY • DOCUMENT EVIDENCE
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
