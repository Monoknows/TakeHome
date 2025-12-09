import { supabase } from "./supabaseClient";

const TABLE = "site_content";

export async function fetchAllContent() {
  const { data, error } = await supabase.from(TABLE).select("key, value");
  if (error) throw error;
  const map = {};
  for (const row of data) map[row.key] = row.value;
  return map;
}

export async function upsertContent(key, value) {
  const { error } = await supabase.from(TABLE).upsert({ key, value });
  if (error) throw error;
}

export async function fetchContent(keys) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("key, value")
    .in("key", keys);
  if (error) throw error;
  const map = {};
  for (const row of data) map[row.key] = row.value;
  return map;
}

// Sections helpers (stored in site_content)
export async function fetchContentValue(key) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data?.value ?? null;
}

export async function fetchSectionsList() {
  const raw = await fetchContentValue("sections:list");
  if (!raw) return [];
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export async function saveSectionsList(ids) {
  return upsertContent("sections:list", JSON.stringify(ids));
}

export async function fetchSection(id) {
  const keys = [
    `section:${id}:title`,
    `section:${id}:description`,
    `section:${id}:image_url`,
  ];
  const map = await fetchContent(keys);
  return {
    id,
    title: map[`section:${id}:title`] ?? "",
    description: map[`section:${id}:description`] ?? "",
    image_url: map[`section:${id}:image_url`] ?? "",
  };
}

export async function saveSection(section) {
  const { id, title = "", description = "", image_url = "" } = section;
  await upsertContent(`section:${id}:title`, title);
  await upsertContent(`section:${id}:description`, description);
  await upsertContent(`section:${id}:image_url`, image_url);
  return { ok: true };
}
