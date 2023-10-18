import { isThingOf } from './Thing';

// 1. Must have "@context" or "currentContext" of https://schema.org
// 2. Must have "type".
test.each([
  // Permute "@context".
  [false, 'https://example.com', 'Person', 'https://example.com'],
  [true, 'https://schema.org', 'Person', 'https://example.com'],
  [false, undefined, 'Person', 'https://example.com'],

  // Permute "@type".
  [false, 'https://example.com', 'Organization', 'https://example.com'],
  [false, 'https://schema.org', 'Organization', 'https://example.com'],
  [false, undefined, 'Organization', 'https://example.com'],

  [false, 'https://example.com', undefined, 'https://example.com'],
  [false, 'https://schema.org', undefined, 'https://example.com'],
  [false, undefined, undefined, 'https://example.com'],

  // Permute "currentContext".
  [false, 'https://example.com', 'Person', 'https://schema.org'],
  [true, 'https://schema.org', 'Person', 'https://schema.org'],
  [true, undefined, 'Person', 'https://schema.org'],

  [false, 'https://example.com', 'Organization', 'https://schema.org'],
  [false, 'https://schema.org', 'Organization', 'https://schema.org'],
  [false, undefined, 'Organization', 'https://schema.org'],

  [false, 'https://example.com', undefined, 'https://schema.org'],
  [false, 'https://schema.org', undefined, 'https://schema.org'],
  [false, undefined, undefined, 'https://schema.org'],

  [false, 'https://example.com', 'Person', undefined],
  [true, 'https://schema.org', 'Person', undefined],
  [false, undefined, 'Person', undefined],

  [false, 'https://example.com', 'Organization', undefined],
  [false, 'https://schema.org', 'Organization', undefined],
  [false, undefined, 'Organization', undefined],

  [false, 'https://example.com', undefined, undefined],
  [false, 'https://schema.org', undefined, undefined],
  [false, undefined, undefined, undefined]
] as const)(
  `isThingOf() should return %s with candidate of @context=%s, @type=%s, currentContext=%s`,
  (
    expected: boolean,
    atContext: 'https://example.com' | 'https://schema.org' | undefined,
    atType: 'Person' | 'Organization' | undefined,
    currentContext: 'https://example.com' | 'https://schema.org' | undefined
  ) =>
    expect(
      isThingOf(
        {
          '@context': atContext,
          '@type': atType
        },
        'Person',
        currentContext
      )
    ).toBe(expected)
);