/**
 * Turn GFM footnotes into Tufte-style sidenotes.
 *
 * remark-gfm renders footnotes as numbered references in the text plus a
 * <section data-footnotes> pile at the bottom of the article. That pile is
 * the thing sidenotes exist to avoid: the reader has to jump away, read,
 * and jump back. This plugin lifts each note's content up to the paragraph
 * that referenced it and drops the pile.
 *
 * Output per reference:
 *   <a class="sidenote-ref" href="#..." id="...">3</a>
 *   ...and, immediately after the containing block:
 *   <aside class="sidenote"><span class="sidenote__num">3</span>…</aside>
 *
 * CSS places the aside in the right margin at >=64rem and inline below it
 * on narrow screens, so the markup is identical either way.
 */

const isElement = (node, tagName) =>
  node && node.type === 'element' && (!tagName || node.tagName === tagName);

const hasClass = (node, name) => {
  const cls = node?.properties?.className;
  if (!cls) return false;
  return Array.isArray(cls) ? cls.includes(name) : String(cls).split(/\s+/).includes(name);
};

/** Collect the footnote definitions keyed by their DOM id. */
function collectDefinitions(tree) {
  const defs = new Map();
  let section = null;
  let parentOfSection = null;

  const walk = (node, parent) => {
    if (
      isElement(node, 'section') &&
      (node.properties?.dataFootnotes !== undefined || hasClass(node, 'footnotes'))
    ) {
      section = node;
      parentOfSection = parent;
      return;
    }
    if (node.children) {
      node.children.forEach((child) => walk(child, node));
    }
  };
  walk(tree, null);

  if (!section) return { defs, section, parentOfSection };

  const findList = (node) => {
    if (isElement(node, 'ol')) return node;
    for (const child of node.children ?? []) {
      const found = findList(child);
      if (found) return found;
    }
    return null;
  };

  const list = findList(section);
  for (const li of list?.children ?? []) {
    if (!isElement(li, 'li') || !li.properties?.id) continue;

    // Drop the back-reference arrow; the sidenote is already in place.
    const stripBackrefs = (node) => {
      if (!node.children) return;
      node.children = node.children.filter(
        (c) => !(isElement(c, 'a') && c.properties?.dataFootnoteBackref !== undefined)
      );
      node.children.forEach(stripBackrefs);
    };
    stripBackrefs(li);

    defs.set(String(li.properties.id), li.children);
  }

  return { defs, section, parentOfSection };
}

export default function rehypeSidenotes() {
  return (tree) => {
    const { defs, section, parentOfSection } = collectDefinitions(tree);
    if (defs.size === 0) return;

    const walk = (node) => {
      if (!node.children) return;

      const pending = [];

      node.children.forEach((child, index) => {
        // Find <sup><a data-footnote-ref href="#user-content-fn-1">1</a></sup>
        const refs = [];
        const findRefs = (n, parent, i) => {
          if (
            isElement(n, 'a') &&
            n.properties?.dataFootnoteRef !== undefined &&
            typeof n.properties.href === 'string'
          ) {
            refs.push({ node: n, parent, index: i });
            return;
          }
          n.children?.forEach((c, ci) => findRefs(c, n, ci));
        };
        findRefs(child, node, index);

        for (const ref of refs) {
          const id = ref.node.properties.href.replace(/^#/, '');
          const content = defs.get(id);
          if (!content) continue;

          const label = ref.node.children?.[0]?.value ?? '';

          // Restyle the reference itself, and unwrap the <sup> so our own
          // vertical-align rule applies.
          ref.node.properties.className = ['sidenote-ref'];
          delete ref.node.properties.dataFootnoteRef;
          if (isElement(ref.parent, 'sup')) {
            ref.parent.tagName = 'span';
            ref.parent.properties = { className: ['sidenote-ref-wrap'] };
          }

          pending.push({
            after: index,
            aside: {
              type: 'element',
              tagName: 'aside',
              properties: { className: ['sidenote'], id: `sidenote-${id}` },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['sidenote__num'] },
                  children: [{ type: 'text', value: label }],
                },
                ...content,
              ],
            },
          });
        }

        walk(child);
      });

      // Insert from the back so earlier indices stay valid.
      for (const { after, aside } of pending.reverse()) {
        node.children.splice(after + 1, 0, aside);
      }
    };

    walk(tree);

    // Remove the footnote pile now that every note has been relocated.
    // By identity, not index — inserting the asides above has already
    // shifted the section's position in its parent.
    if (parentOfSection && section) {
      const at = parentOfSection.children.indexOf(section);
      if (at >= 0) parentOfSection.children.splice(at, 1);
    }
  };
}
