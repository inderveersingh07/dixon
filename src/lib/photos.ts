import type { ImageMetadata } from "astro";

/**
 * Photo registry.
 *
 * Every image on the site is looked up through here, so alt text lives in one
 * place and cannot be forgotten at the call site. `photo()` throws at build
 * time for an unknown key or a missing alt, which means a broken reference
 * fails the build rather than shipping.
 *
 * Alt text rules: describe what is actually shown, under 125 characters, and
 * let keywords fall where they naturally belong. Before and after images say
 * which they are, because that is what the reader needs to know first.
 */

const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/**/*.jpg",
  { eager: true },
);

/** key is "<category>/<filename without extension>" */
const alts: Record<string, string> = {
  // ---------- Fireplaces ----------
  "02-fireplaces/firebrick-firebox-corner-detail":
    "Corner of a firebox lined with red firebrick, cut tight against the stone surround",
  "02-fireplaces/herringbone-firebrick-firebox":
    "Herringbone firebrick laid into the floor and back of a new firebox before the surround goes on",
  "02-fireplaces/ledgestone-fireplace-vaulted-room":
    "Ledgestone fireplace running the full height of a vaulted great room wall",
  "02-fireplaces/red-brick-herringbone-firebox":
    "Red brick firebox laid in a herringbone bond, framed by pale river rock",
  "02-fireplaces/river-rock-chimney-breast-detail":
    "Close view of a river rock chimney breast showing the tight joints between rounded fieldstones",
  "02-fireplaces/river-rock-chimney-breast-full-height":
    "Full height river rock chimney breast built to a vaulted ceiling, with a mason at its base for scale",
  "02-fireplaces/river-rock-firebox-herringbone-close":
    "Herringbone firebox seen through a river rock opening, with the arch stones set above",
  "02-fireplaces/river-rock-fireplace-arched-opening":
    "Arched river rock fireplace opening above a dark herringbone firebox",
  "02-fireplaces/river-rock-wood-mantel-corbel":
    "Carved wood mantel corbel set into a river rock fireplace wall",
  "02-fireplaces/stone-veneer-accent-wall":
    "Dry stacked stone veneer accent wall in a finished interior",
  "02-fireplaces/stone-veneer-fireplace-great-room":
    "Stone veneer fireplace rising to the ceiling of a bright great room",
  "02-fireplaces/stone-veneer-fireplace-oak-mantel":
    "Stone veneer fireplace with an oak surround and mantel in a finished living room",

  // ---------- Stone veneer ----------
  "03-stone-veneer/mason-installing-stone-veneer":
    "Mason setting a course of stone veneer into the mortar bed on a fireplace wall",
  "03-stone-veneer/mason-setting-stone-veneer-course":
    "Mason working from a plank, fitting stone veneer around a fireplace opening",
  "03-stone-veneer/stone-veneer-feature-wall-finished":
    "Finished stone veneer feature wall running up to the peak of a vaulted ceiling",
  "03-stone-veneer/stone-veneer-feature-wall-full":
    "Full height stone veneer wall with a linear fireplace, seen from across the room",

  // ---------- Chimneys ----------
  "04-chimneys/fieldstone-chimney-crown":
    "Fieldstone chimney with a cast concrete crown, finished above the roofline",
  "04-chimneys/fieldstone-chimney-detail":
    "Detail of glacial fieldstone in a chimney, showing the pink and grey granite faces",
  "04-chimneys/river-rock-chimney-new-construction":
    "River rock chimney under construction on a new home, scaffolding still standing",
  "04-chimneys/river-rock-chimney-roofline":
    "River rock chimney finished at the roofline of a new house",
  "04-chimneys/stone-chimney-roofline":
    "Stone chimney rising through a shingled roof against a clear sky",

  // ---------- Brick detail ----------
  "05-brick-detail/brick-arch-opening-interior":
    "Brick arch turned over an interior opening on a restoration job",
  "05-brick-detail/brick-arch-window-head":
    "Radiating brick arch set over a window head, mortar still fresh",
  "05-brick-detail/brick-corbel-dentil-detail":
    "Corbelled brick dentil course projecting from a wall face",
  "05-brick-detail/river-rock-brick-corbel-course":
    "Brick corbel course capping a river rock wall on a house exterior",
  "05-brick-detail/river-rock-brick-corbel-detail":
    "Close view of a brick corbel course meeting rounded river rock below",
  "05-brick-detail/river-rock-wall-elevation":
    "River rock wall elevation under construction, seen from the scaffold",

  // ---------- Historic ----------
  "06-historic/arched-brick-doorway-keystone":
    "Arched cream brick doorway with a carved keystone on a historic church",
  "06-historic/historic-church-cream-brick-exterior":
    "Historic cream brick church exterior with lancet windows, seen from the lawn",
  "06-historic/historic-church-street-view":
    "Cream brick church seen from the street, showing the full restored elevation",

  // ---------- Commercial ----------
  "07-commercial/brick-stone-sill-detail":
    "Brick and cut stone sill detail on a commercial storefront during restoration",
  "07-commercial/commercial-brick-facade-restored":
    "Restored brick pier and facade on a downtown commercial building",
  "07-commercial/exposed-brick-interior-feature-wall":
    "Exposed brick feature wall left in place inside a finished commercial interior",
  "07-commercial/exposed-brick-wall-commercial-interior":
    "Original brick wall cleaned and pointed as a feature in a commercial fit out",
  "07-commercial/historic-storefront-facade-restoration":
    "Historic storefront with arched windows during facade restoration, scaffold in place",
  "07-commercial/mason-hand-cut-brick":
    "Mason holding a hand cut brick up to the wall to check the fit",
  "07-commercial/new-brick-coursing-in-progress":
    "New brick coursing going up on a commercial wall, line and level set",
  "07-commercial/rebuilt-brick-wall-panel":
    "Rebuilt brick wall panel matched to the original bond and colour",
  "07-commercial/rebuilt-brick-wall-pier":
    "Rebuilt brick pier tied back into the surrounding historic wall",

  // ---------- Residential ----------
  "08-residential/fieldstone-entry-bluestone-terrace":
    "Fieldstone house corner meeting a wet bluestone terrace at the entry",
  "08-residential/fieldstone-home-exterior-bluestone-patio":
    "Granite fieldstone home exterior with a bluestone patio running to the door",
  "08-residential/granite-fieldstone-window-surround":
    "Pink and grey granite fieldstone surround framing a window and patio door",
  "08-residential/masonry-crew-lakefront-project":
    "Masonry crew working on a lakefront property, mixing and barrowing mortar",

  // ---------- Hardscape ----------
  "09-hardscape/brick-bluestone-entry-steps":
    "Brick entry steps with bluestone treads between white porch railings",
  "09-hardscape/flagstone-patio-bay-window":
    "Irregular flagstone patio wrapping a bay window, joints freshly pointed",
  "09-hardscape/flagstone-patio-demolition-before":
    "Before: broken concrete and rubble where the old patio was lifted out",
  "09-hardscape/flagstone-patio-finished":
    "After: finished irregular flagstone patio laid tight to the house",

  // ---------- Repair ----------
  "10-repair/brick-column-base-cracked-before":
    "Before: cracked and displaced brick at the base of a structural column",
  "10-repair/brick-column-base-repaired-after":
    "After: the same column base rebuilt with matched brick and a clean cap",
  "10-repair/brick-knee-wall-damage-before":
    "Before: stepped cracking running through a brick knee wall",
  "10-repair/brick-knee-wall-restored-after":
    "After: the knee wall rebuilt straight and repointed along its full length",
  "10-repair/column-base-brick-restored":
    "Restored brick column base with new mortar joints and a cast stone cap",
  "10-repair/column-base-cap-detail":
    "Detail of a cast stone cap seated on a rebuilt brick column base",
  "10-repair/column-base-restored-limestone-cap":
    "Rebuilt column base with a limestone cap and the planting bed replaced around it",
  "10-repair/custom-cast-concrete-cap-formwork":
    "Custom timber formwork built to cast a replacement concrete column cap",

  // ---------- Team ----------
  "11-team/dixon-masonry-crew":
    "Three of the Dixon Masonry crew on site at a residential project",
};

export interface Photo {
  key: string;
  src: ImageMetadata;
  alt: string;
  category: string;
}

function keyFromPath(path: string): string {
  const m = path.match(/photos\/(.+)\.jpg$/);
  if (!m) throw new Error(`Unexpected photo path: ${path}`);
  return m[1]!;
}

const registry = new Map<string, Photo>();

for (const [path, mod] of Object.entries(files)) {
  const key = keyFromPath(path);
  const alt = alts[key];
  if (!alt) {
    throw new Error(
      `Photo "${key}" has no alt text. Add it to the alts map in src/lib/photos.ts.`,
    );
  }
  if (alt.length > 125) {
    throw new Error(
      `Alt text for "${key}" is ${alt.length} characters. Keep it under 125.`,
    );
  }
  registry.set(key, {
    key,
    src: mod.default,
    alt,
    category: key.split("/")[0]!,
  });
}

/** Look up one photo. Throws at build time if the key does not exist. */
export function photo(key: string): Photo {
  const found = registry.get(key);
  if (!found) {
    throw new Error(
      `Unknown photo "${key}". Available keys are listed in src/lib/photos.ts.`,
    );
  }
  return found;
}

/** Every photo in a category, in filename order. */
export function category(name: string): Photo[] {
  return [...registry.values()]
    .filter((p) => p.category === name)
    .sort((a, b) => a.key.localeCompare(b.key));
}

/** Every photo on the site, grouped for the gallery. */
export function allPhotos(): Photo[] {
  return [...registry.values()].sort((a, b) => a.key.localeCompare(b.key));
}
