export type VideoProject = {
  title: string;
  type: string;
  description: string;
  videoId: string;
  /** Native dimensions inspected from the available source video. */
  dimensions: { width: number; height: number };
  sourceLabel: string;
  clientOrContext: string;
  poster: string;
};

export const videos: VideoProject[] = [
  {
    title: "Break the Loop",
    type: "Event film",
    description: "Promotional content for Magnovite, an intercollege event.",
    videoId: "YjfZ6Ha1ogs",
    dimensions: { width: 3840, height: 2160 },
    sourceLabel: "Watch on YouTube",
    clientOrContext: "Magnovite · Intercollege event",
    poster: "/images/posters/break-the-loop.svg",
  },
  {
    title: "Kendrick Lamar Tribute",
    type: "Passion project",
    description: "A self-directed passion project driven by creative exploration.",
    videoId: "Va4H10l6gdI",
    dimensions: { width: 1280, height: 720 },
    sourceLabel: "Watch on YouTube",
    clientOrContext: "Self-directed edit",
    poster: "/images/posters/kendrick-lamar-tribute.svg",
  },
  {
    title: "Client Edit — Gokarna",
    type: "Client collaboration",
    description: "A client collaboration for an immersive trip to Gokarna.",
    videoId: "1QOdAL6wSOo",
    dimensions: { width: 1920, height: 1080 },
    sourceLabel: "Watch on YouTube",
    clientOrContext: "Gokarna · Travel edit",
    poster: "/images/posters/gokarna-client-edit.svg",
  },
  {
    title: "Bhasha Utsav",
    type: "Culture film",
    description: "Promotional content for a college cultural event.",
    videoId: "CnscIyrs3_o",
    dimensions: { width: 1280, height: 720 },
    sourceLabel: "Watch on YouTube",
    clientOrContext: "College cultural event",
    poster: "/images/posters/bhasha-utsav.svg",
  },
];
