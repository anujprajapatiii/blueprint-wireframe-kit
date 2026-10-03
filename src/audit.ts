/* Development-only audit. Open ?audit=1 and inspect the browser console. */
import axe from 'axe-core'
let running = false
async function audit() {
  if (running) return
  running = true
  try {
    const result = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } })
    console.info('BLUEPRINT_A11Y', JSON.stringify({ violations: result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target:n.target, summary:n.failureSummary })) })), incomplete: result.incomplete.map(v => v.id), passes:result.passes.length }))
  } finally { running = false }
}
let timeout: ReturnType<typeof setTimeout>
document.addEventListener('click', () => { clearTimeout(timeout); timeout = setTimeout(audit, 500) })
timeout = setTimeout(audit, 1000)
