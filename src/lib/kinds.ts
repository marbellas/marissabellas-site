// One source of truth for the guide's four sections. The schema in
// content.config.ts enforces the keys; this file gives them their
// display copy and their order on the page.

export type Kind = 'field-note' | 'pattern' | 'postmortem' | 'signal';

export interface KindMeta {
  /** Singular label, used on an entry's byline. */
  label: string;
  /** Plural label, used as a section heading. */
  plural: string;
  /** URL fragment on /writing/. */
  anchor: string;
  /** One line on what belongs here — shown on the homepage. */
  blurb: string;
}

export const KINDS: Record<Kind, KindMeta> = {
  'field-note': {
    label: 'field note',
    plural: 'Field notes',
    anchor: 'field-notes',
    blurb:
      'A situation from a real deployment — what happened, what it cost, and what I would do differently. Details are composited across engagements.',
  },
  pattern: {
    label: 'pattern',
    plural: 'Patterns',
    anchor: 'patterns',
    blurb:
      'The practice that falls out of seeing the same thing go wrong repeatedly. Written to be handed to a team, not admired.',
  },
  postmortem: {
    label: 'postmortem',
    plural: 'Postmortems',
    anchor: 'postmortems',
    blurb:
      'Things that went wrong. Mine first, and customers second — with the part I got wrong left in.',
  },
  signal: {
    label: 'signal',
    plural: 'Signals',
    anchor: 'signals',
    blurb:
      'What is arriving next, and which assumption it quietly breaks. Less prediction, more consequence.',
  },
};

export const KIND_ORDER: Kind[] = ['field-note', 'pattern', 'postmortem', 'signal'];
