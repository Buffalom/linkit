export interface Link {
  url: string
  calls?: number
  lastCall?: string | null
}

export interface LinkWithKey extends Link {
  key: string
}
