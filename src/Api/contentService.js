// Database removed: provide inert, static fallbacks

export async function fetchAllContent() {
  return {};
}

export async function upsertContent(key, value) {
  return { ok: true };
}

export async function fetchContent(keys) {
  return {};
}

export async function fetchContentValue(key) {
  return null;
}

export async function fetchSectionsList() {
  return [];
}

export async function saveSectionsList(ids) {
  return { ok: true };
}

export async function fetchSection(id) {
  return { id, title: "", description: "", image_url: "" };
}

export async function saveSection(section) {
  return { ok: true };
}
