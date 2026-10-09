# Logo interaction — 7 October 2026

The shared Blueprint logo keeps its 36px mark, wordmark, home destination and header position. Hover crossfades the three blueprint panels into a face and tilts only the decorative mark by six degrees. Press gives a small squeeze and wink. There is no idle loop or navigation delay. CSS transitions use existing 120ms/180ms motion tokens and can reverse from the current pose.

Keyboard focus reveals the face immediately with the existing focus outline. Reduced motion removes all transforms, retaining only the expression change. Pointer hover is gated to fine pointers; touch uses native press and navigation. The link now has a 44px minimum hit height without enlarging the visible mark.

Browser review checked rest, pointer-hover face/tilt, return to rest, keyboard focus and home navigation. The reduced-motion CSS declarations were temporarily activated in the local stylesheet for a visual check: all mark/child transforms resolved to none. The original media query was restored before the build; no operating-system preference was changed. This was a focused visual check, not a frame-rate measurement or touch-device test.

Both the experiments and kit headers fit an actual 320px viewport with a 320px document width. The production build and 308 token contrast pairs passed. No publishing occurred.

[Hover in the experiment workspace](logo-interaction/hover-desktop.jpg).
