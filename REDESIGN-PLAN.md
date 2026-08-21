# Valley Resort Homepage — 95+ Redesign Plan

## Objective

Create a homepage capable of scoring 95+ under the supplied artistic and conversion rubric while remaining a truthful UI-only prototype. The redesign must be recognizably Wadi Rum without the logo, improve the path from desire to availability, and meet complete keyboard, mobile, contrast, and reduced-motion expectations.

## Creative direction: The Desert Almanac

The current “editorial luxury” direction becomes a more proprietary system built around two factual ideas: the changing desert light and the layered geology of Wadi Rum. A continuous contour line, a six-part daylight scale, coordinate marks, and mineral color transitions will connect the page. Oversized italic serif typography will be reserved for three emotional peaks instead of repeated in every section.

The experience should move from dawn to night:

1. Arrival in the valley — immediate identity and availability.
2. Proof of place — landscape scale and a concise location fact.
3. Choose a stay — comparison, capacity cues, and room-specific action.
4. A day at Valley — tactile sequence from morning to firelight.
5. Dining and gathering — social warmth and specific venues.
6. Arrival made simple — useful travel facts, not a decorative map alone.
7. Independent proof — review rating, count, source, and clearly attributed proof.
8. Good to know — compact, accessible progressive disclosure.
9. Night invitation — final emotional and commercial resolution.

## Structural redesign

### Hero

- Keep the resort-in-landscape image, but add a compact factual “stay brief” at the lower edge: Wadi Rum Protected Area, three stay types, and direct availability.
- Use one emotional headline and one unambiguous booking action. “Explore” becomes secondary.
- Add a daylight index that begins the page-wide dawn-to-night narrative.

### Proof of place

- Replace the generic manifesto composition with an aerial “field note.”
- Pair the aerial image with a short statement, coordinates, and a truthful location label.
- Introduce the contour-line motif here and continue it selectively later.

### Accommodation decision studio

- Preserve the three-category selector but add capacity/fit cues and a direct “Check dates” action for the selected stay.
- Implement a complete ARIA tab pattern: one tab stop, arrow-key navigation, Home/End, linked tabpanel, and stable focus.
- Keep the image and information in the same mobile decision unit so the control never feels detached from its result.

### Daylight sequence

- Replace three similarly styled cards with a horizontal daylight rail on desktop and three concise chapters on mobile.
- Vary image scale and text placement; show tangible resort moments rather than generalized luxury language.

### Dining

- Reduce the oversized heading and let the two venue images carry the section.
- Use specific venue naming and a small “evening table” fact band to make the content useful, not only atmospheric.

### Arrival

- Keep the graphic route language but add only safe, factual guidance: protected-area location, team assistance, directions, and WhatsApp planning.
- Do not invent drive times, prices, transfer schedules, or transport guarantees.

### Reviews

- Clearly label the source as Tripadvisor and the visible count as 45 independent reviews.
- Do not invent a numeric rating or quotation. Use a restrained evidence card that links to the independent source and explicitly invites users to read guest accounts there.

### Practical information

- Use accessible accordions at all breakpoints to reduce density.
- Every trigger receives `aria-expanded`, `aria-controls`, a labelled panel, visible focus, and a generous target.

### Final CTA

- Finish with the night pool/fire imagery and a small recap of what has been established: Wadi Rum location, three stay types, and direct booking availability.

## Visual system

- Basalt `#11110f`, moon paper `#f3eadc`, sandstone `#c9875a`, booking clay `#b65134`, dusk `#34394c`, star green `#4f8f79`.
- Raise muted-text contrast on dark backgrounds; no essential text below 12px.
- Display serif remains Instrument Serif. Manrope carries body and controls. IBM Plex Mono is reserved for factual field notes.
- Adopt the spacing sequence 8, 12, 20, 32, 52, 84, 136, but reduce mobile section openings that currently cause unnecessary scroll cost.
- Use square geometry, fine rules, contour lines, light-index ticks, and no generic glass cards.

## Interaction rules

- The desktop header indicates the current section and keeps availability visible.
- The mobile menu traps focus, closes on Escape, restores focus to its trigger, and prevents background access while open.
- The mobile availability action becomes a compact dock with reserved document space; it must never cover content.
- Hover and focus states must communicate the same affordance.
- Motion supports state and sequence only. Reduced-motion mode removes reveal delays and smooth scrolling.

## Conversion principles

- Every emotional peak is followed by an appropriate action.
- High-intent users can check availability from the hero, header/dock, selected stay, and final CTA.
- Low-intent users can explore stays, daily experience, dining, directions, and independent reviews without competing primary buttons.
- Trust copy remains factual. No invented testimonials, ratings, travel times, prices, scarcity, or inclusions.

## Accessibility acceptance criteria

- One H1 and a logical heading hierarchy.
- Skip link, landmarks, descriptive alternative text, and no color-only states.
- Full keyboard operation for navigation, tabs, menu, accordions, and links.
- Focus-visible styling on every interactive component.
- Minimum 44px touch targets and no horizontal overflow at 360px.
- Mobile dock cannot obscure content at 320px height or 200% zoom.
- Reduced-motion composition remains complete.

## QA targets

- Desktop: 1440×900 and 1024×768.
- Mobile: 390×844 and 360×800.
- Verify menu, anchor scrolling, current-section navigation, tabs by click and keyboard, accordions, sticky CTA behavior, external links, console output, image loading, and responsive transitions.
- Re-audit against all ten weighted rubric categories after implementation.

