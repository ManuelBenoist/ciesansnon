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
        video_url: z.string().optional(),
      }),
    }),
    membres: defineCollection({
      type: 'page',
      source: 'membres/*.md',
      schema: z.object({
        nom: z.string(),
        slug: z.string(),
        role_compagnie: z.string(),
        role_court: z.string(),
        photo: z.string().nullable().optional(),
        bio: z.string().nullable().optional(),
        ordre: z.number().optional(),
        dans_organigramme: z.boolean().nullable().optional(),
      }),
    }),
    actus: defineCollection({
      type: 'page',
      source: 'actus/*.md',
    }),
    ateliers_creation: defineCollection({
      type: 'data',
      source: 'ateliers-creation/*.md',
      schema: z.object({
        titre: z.string(),
        slug: z.string(),
        image: z.string(),
        description: z.string().optional(),
        ordre: z.number(),
        galerie: z.array(z.string()).optional(),
      }),
    }),
    ateliers: defineCollection({
      type: 'data',
      source: 'ateliers/*.md',
      schema: z.object({
        titre: z.string(),
        slug: z.string(),
        annee: z.number(),
        lieu: z.string(),
        ville: z.string(),
        date: z.string(),
        affiche: z.string(),
        accroche: z.string().optional(),
        description: z.string().optional(),
        ordre: z.number(),
        galerie: z.array(z.string()).optional(),
      }),
    }),
  },
})
