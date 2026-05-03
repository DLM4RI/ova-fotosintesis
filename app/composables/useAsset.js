export default function useAsset(path) {
  const isProd = import.meta.env.PROD
  const base = isProd ? '/ova-fotosintesis' : ''
  return `${base}/${path}`
}