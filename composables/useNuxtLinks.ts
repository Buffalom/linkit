import { Router } from 'vue-router'

export function isExternalUrl(url: string): boolean {
  const config = useRuntimeConfig()

  if (/^https?:\/\//.test(url)) {
    if (process.browser) {
      return !url.startsWith(location.origin)
    }

    if (config.public.APP_URL) {
      return !url.startsWith(config.public.APP_URL)
    }

    return true
  }

  return false
}

function navigate(event: MouseEvent, router: Router) {
  const href = (event.currentTarget as HTMLAnchorElement)?.getAttribute('href')

  if (!href) {
    return
  }

  if (!isExternalUrl(href)) {
    const path = href.replace(location.origin, '') || '/'

    event.preventDefault()

    router.push(path)
  }
}

function addListeners(links: HTMLAnchorElement[], router: Router) {
  for (const link of Array.from(links)) {
    const rel = link.getAttribute('rel')

    const target = link.getAttribute('target')

    // For improved security `rel="noopener"` will be added automatically if target is `_blank`
    // https://github.com/mathiasbynens/rel-noopener/
    if (!rel && target && target === '_blank') {
      link.setAttribute('rel', 'noopener')
    }

    useEventListener(link, 'click', (event: MouseEvent) =>
      navigate(event, router)
    )
  }
}

type Element = HTMLAnchorElement | HTMLElement | null | undefined

export function useNuxtLinks(element: MaybeRef<Element>) {
  const router = useRouter()

  const links = ref<HTMLAnchorElement[]>([])

  onMounted(() => {
    const rawElement: Element = unref(element)

    if (!rawElement) {
      return
    }

    if (rawElement.tagName === 'A') {
      links.value = [rawElement as HTMLAnchorElement]
    } else {
      links.value = Array.from(rawElement.querySelectorAll('a'))
    }

    addListeners(links.value, router)
  })
}
