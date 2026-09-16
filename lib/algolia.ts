import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''

let algolia = null

try {
  if (typeof window !== 'undefined' && ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY) {
    algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
  }
} catch (e) {
  // Fail gracefully in environments where Algolia is not configured
  // (do not throw at module load time)
  // eslint-disable-next-line no-console
  console.warn('Algolia client not initialized:', e)
}

export { algolia }
export const PRODUCTS_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || 'petrokala_products'
