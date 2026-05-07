export default function useAsset(path) {
  const config = useRuntimeConfig()
  const base = config.app.baseURL
  // Ensure path doesn't start with / if base ends with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}