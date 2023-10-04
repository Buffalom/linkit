export interface Link {
  url: string
  calls?: number
  latestCall?: string | null
}

export interface LinkWithKey extends Link {
  key: string
}
