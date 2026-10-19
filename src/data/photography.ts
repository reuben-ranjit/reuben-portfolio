export type Photograph = {
  /** Full-resolution source used in both the gallery and lightbox. */
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

// Original dimensions are orientation-corrected dimensions of the full source.
export const photography: Photograph[] = [
  { src: "/images/originals/_MG_1770.jpg", alt: "Crowd gathered beneath a bright yellow event flag", category: "Events", width: 5184, height: 3456 },
  { src: "/images/originals/_MG_1917.jpg", alt: "Students cheering together on a field", category: "Events", width: 5184, height: 3456 },
  { src: "/images/originals/_MG_3411_Original.jpg", alt: "Student team in matching jerseys during a performance", category: "Events", width: 5184, height: 3456 },
  { src: "/images/originals/_MG_3425_Original.jpg", alt: "Group of students moving in unison", category: "Events", width: 5184, height: 3456 },
  { src: "/images/originals/event-smoke.jpg", alt: "Smoke effect rising during a campus gathering", category: "Events", width: 3024, height: 4032 },
  { src: "/images/originals/event-arrival.jpg", alt: "People arriving at an outdoor event", category: "Events", width: 3520, height: 1980 },
  { src: "/images/originals/stage-audience.jpg", alt: "Audience facing a blue-lit cultural stage", category: "Live", width: 5184, height: 3456 },
  { src: "/images/originals/live-performance.jpg", alt: "Musicians performing under warm stage lights", category: "Live", width: 5184, height: 3456 },
  { src: "/images/originals/stage-performer.jpg", alt: "Performers on a cool-toned stage", category: "Live", width: 5184, height: 3456 },
  { src: "/images/originals/night-lights.jpg", alt: "Illuminated trees and lights at an evening event", category: "Live", width: 3024, height: 4032 },
  { src: "/images/originals/garden-light.jpg", alt: "Sunlight catching palm leaves in a garden", category: "Everyday", width: 928, height: 1392 },
  { src: "/images/originals/pink-blossoms-original.png", alt: "Warm-toned pink blossoms and fine branches against a pale open sky", category: "Everyday", width: 296, height: 394 },
  { src: "/images/originals/evening-trees.jpg", alt: "Trees along a quiet street in evening light", category: "Everyday", width: 3024, height: 4032 },
  { src: "/images/originals/grazing-cattle.jpg", alt: "Cattle grazing in a patch of warm afternoon light", category: "Everyday", width: 4032, height: 2582 },
  { src: "/images/originals/waterfront.jpg", alt: "Boats and cranes on a waterfront", category: "Travel", width: 4000, height: 6000 },
  { src: "/images/originals/city-traffic-lights.png", alt: "Golden traffic lights and cars along a city street at night", category: "Travel", width: 301, height: 302 },
  { src: "/images/originals/seaside-sunset-branches.png", alt: "Sunset over the sea framed by dark tree branches", category: "Travel", width: 362, height: 242 },
  { src: "/images/originals/heic-3981.png", alt: "Sunset over boats and water", category: "Travel", width: 2840, height: 3042 },
  { src: "/images/originals/heic-4507.png", alt: "A warmly lit rooftop against the evening sky", category: "Travel", width: 3024, height: 4032 },
];
