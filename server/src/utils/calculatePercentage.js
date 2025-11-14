function calculatePercentage (completed, total) {
  if (!total || total <= 0) return 0
  return Math.round((completed / total) * 100)
}

module.exports = calculatePercentage


