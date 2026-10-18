/**
 * Configuration & Data Source for Google Business Profile Reviews
 *
 * AUTHENTICITY NOTICE:
 * To preserve authentic client transparency, no fake reviews, invented star ratings,
 * or simulated Google verification are hardcoded.
 *
 * To connect your live Google Business Profile:
 * 1. Provide your Google Place ID or Google Maps Business Review URL.
 * 2. Populate verified customer reviews or connect a verified Google Places API handler.
 */

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number; // 1 to 5
  relativeTime: string;
  reviewText: string;
  verified: boolean;
}

export interface GoogleReviewsDataConfig {
  /** Business name as listed on Google Business Profile */
  businessName: string;
  /** Direct link to Google Maps / Google Reviews modal */
  googleMapsUrl: string | null;
  /** Genuine verified rating (e.g., 4.9). Set to null until verified */
  overallRating: number | null;
  /** Total count of genuine reviews on Google. Set to null until verified */
  reviewCount: number | null;
  /** Whether authentic Google reviews data has been connected */
  isConfigured: boolean;
  /** List of verified reviews */
  reviews: GoogleReviewItem[];
}

export const googleReviewsConfig: GoogleReviewsDataConfig = {
  businessName: "Atelier Living Interior Architecture",
  googleMapsUrl: null, // Insert verified Google Maps Business URL here
  overallRating: null, // Will display live badge once Google Business Profile is connected
  reviewCount: null,
  isConfigured: false,
  reviews: [],
};
