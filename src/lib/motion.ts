/** Shared motion language: slow inhale, long soft exhale. Nothing snaps. */
export const EASE_BREATH = [0.22, 1, 0.36, 1] as const;
export const EASE_EXHALE = [0.65, 0, 0.35, 1] as const;
export const SPRING_SOFT = { type: "spring", stiffness: 60, damping: 18, mass: 1 } as const;
export const SPRING_MAGNET = { stiffness: 150, damping: 15, mass: 0.3 } as const;
