import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''

export const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
export const PRODUCTS_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || 'petrokala_products'
