import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const castingSchema = z.object({
  nom: z.string(),
  role: z.string(),
})

const techSchema = z.object({
  poste: z.string(),
  nom: z.string(),
})

const dateSchema = z.object({
  lieu: z.string(),
  ville: z.string(),
  debut: z.string(),
  fin: z.string().nullable().optional(),
  lien_billetterie: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    creations: defineCollection({
      type: 'page',
      source: 'creations/*.md',
      schema: z.object({
        titre: z.string(),
        slug: z.string(),
        statut: z.string(),
        annee: z.number(),
        duree: z.string(),
        image_affiche: z.string(),
        image_hero: z.string(),
        galerie: z.array(z.string()),
        alt_hero: z.string(),
        accroche: z.string(),
        mise_en_scene: z.string(),
        auteur: z.string(),
        casting: z.array(castingSchema),
        equipe_technique: z.array(techSchema),
        dates: z.array(dateSchema),
        seo_title: z.string(),
        seo_description: z.string(),
        ordre: z.number(),
        featured: z.boolean().optional(),
      }),
    }),
    membres: defineCollection({
      type: 'page',
      source: 'membres/*.md',
    }),
    actus: defineCollection({
      type: 'page',
      source: 'actus/*.md',
    }),
  },
})
