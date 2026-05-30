export function useSeo(options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}) {
  const siteName = 'La Cie Sans Non'
  const siteUrl = 'https://ciesansnon.com'
  const route = useRoute()
  const pageUrl = `${siteUrl}${route.path}`
  const fullTitle = options.title.includes(siteName) ? options.title : `${options.title} | ${siteName}`

  useSeoMeta({
    title: fullTitle,
    description: options.description,
    ogTitle: fullTitle,
    ogDescription: options.description,
    ogImage: options.image ?? `${siteUrl}/images/og/default.webp`,
    ogUrl: pageUrl,
    ogType: options.type ?? 'website',
    ogSiteName: siteName,
    ogLocale: 'fr_FR',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: options.image ?? `${siteUrl}/images/og/default.webp`,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  })

  useHead({
    htmlAttrs: { lang: 'fr' },
    link: [
      { rel: 'canonical', href: pageUrl },
      { rel: 'alternate', hreflang: 'fr', href: pageUrl },
      { rel: 'alternate', hreflang: 'x-default', href: pageUrl },
    ],
  })
}
