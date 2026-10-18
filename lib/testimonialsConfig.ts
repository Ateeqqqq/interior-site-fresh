/**
 * Configuration & Data Source for Client Testimonials & Video Interviews
 *
 * AUTHENTICITY NOTICE:
 * Atelier Living never fabricates client statements, video endorsements,
 * or project locations. Add approved client testimonials here.
 */

export interface ClientTestimonialItem {
  id: string;
  clientName: string;
  residenceLocation?: string;
  testimonialText: string;
  projectThumbnail: string;
  videoUrl?: string; // Only specify if a genuine playable video file or stream exists
  verified: boolean;
}

export interface ClientTestimonialsConfig {
  hasApprovedTestimonials: boolean;
  testimonials: ClientTestimonialItem[];
}

export const clientTestimonialsConfig: ClientTestimonialsConfig = {
  hasApprovedTestimonials: false,
  testimonials: [],
};
