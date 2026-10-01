// Fast-changing inputs the 3D scene reads every frame (never React state: no re-renders while scrolling).
export const story = { p: 0 }; // 0..1 progress through the pinned hero story
export const pointer = { x: 0, y: 0 }; // -0.5..0.5, fine pointers only
