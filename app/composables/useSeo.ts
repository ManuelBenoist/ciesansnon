export function useSeo(options: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}) {
  const siteName = 'La Cie Sans Non'
  const siteUrl = 'https://ciesansnon.com'

  useSeoMeta({
    title: `${options.title} | ${siteName}`,
    description: options.description,
    ogTitle: `${options.title} | ${siteName}`,
    ogDescription: options.description,
    ogImage: options.image ?? `${siteUrl}/images/og/default.webp`,
    ogUrl: siteUrl,
    ogType: options.type ?? 'website',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: `${options.title} | ${siteName}`,
    twitterDescription: options.description,
    twitterImage: options.image ?? `${siteUrl}/images/og/default.webp`,
  })

  useHead({
    htmlAttrs: { lang: 'fr' },
    link: [{ rel: 'canonical', href: siteUrl }],
  })
}
