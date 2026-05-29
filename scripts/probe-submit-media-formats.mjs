/**
 * Probes POST /api/project/submit/ media validation without changing app code.
 * Run: node scripts/probe-submit-media-formats.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const API_BASE = "https://iaict.pythonanywhere.com";
const ENDPOINT = `${API_BASE}/api/project/submit/`;

function loadToken() {
  const tokenPath = join(process.cwd(), ".submit-probe-token");
  if (process.env.SUBMIT_PROBE_TOKEN) return process.env.SUBMIT_PROBE_TOKEN;
  if (existsSync(tokenPath)) return readFileSync(tokenPath, "utf8").trim();
  return null;
}

async function postFormData(label, formData, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers,
    body: formData,
  });

  let bodyText = await response.text();
  let bodyJson;
  try {
    bodyJson = JSON.parse(bodyText);
  } catch {
    bodyJson = bodyText;
  }

  const formEntries = [];
  for (const [key, value] of formData.entries()) {
    formEntries.push({
      key,
      value:
        value instanceof File
          ? { File: true, name: value.name, size: value.size, type: value.type }
          : value,
    });
  }

  return {
    label,
    status: response.status,
    formEntries,
    bodyJson,
    bodyString: typeof bodyJson === "string" ? bodyJson : JSON.stringify(bodyJson, null, 2),
    mediaErrors: bodyJson?.media ?? null,
  };
}

function baseFields(formData) {
  formData.append("title", "probe-media-test");
  formData.append("owner_name", "Probe User");
  formData.append("category", "1");
}

async function main() {
  const token = loadToken();
  if (!token) {
    console.warn(
      "No auth token. Set SUBMIT_PROBE_TOKEN or create .submit-probe-token for authenticated 400 responses.",
    );
  }

  const pngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  const pngBuffer = Buffer.from(pngBase64, "base64");
  const pngBlob = new Blob([pngBuffer], { type: "image/png" });
  const pngFile = new File([pngBlob], "probe.png", { type: "image/png" });

  const results = [];

  // Format A: current indexed multipart
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media[0][type]", "1");
    fd.append("media[0][file]", pngFile, "probe.png");
    results.push(await postFormData("A: media[0][type] + media[0][file]", fd, token));
  }

  // Format B: DRF dot notation
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media.0.type", "1");
    fd.append("media.0.file", pngFile, "probe.png");
    results.push(await postFormData("B: media.0.type + media.0.file", fd, token));
  }

  // Format C: Swagger-style JSON string in single `media` field
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media", JSON.stringify([{ type: 1, file: "probe.png", url: "" }]));
    results.push(await postFormData('C: media = JSON string (Swagger curl shape)', fd, token));
  }

  // Format D: repeated media + media_type
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media", pngFile, "probe.png");
    fd.append("media_type", "1");
    results.push(await postFormData("D: media + media_type (parallel)", fd, token));
  }

  // Format E: media[0]type without inner brackets
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media[0]type", "1");
    fd.append("media[0]file", pngFile, "probe.png");
    results.push(await postFormData("E: media[0]type + media[0]file", fd, token));
  }

  // Format F: JSON types only + media[0][file] (hybrid — types in JSON)
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media", JSON.stringify([{ type: 1 }]));
    fd.append("media[0][file]", pngFile, "probe.png");
    results.push(
      await postFormData("F: media JSON (type only) + media[0][file]", fd, token),
    );
  }

  // Format G: JSON types only + media.0.file (DRF dot notation — current app)
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media", JSON.stringify([{ type: 1 }]));
    fd.append("media.0.file", pngFile, "probe.png");
    results.push(
      await postFormData("G: media JSON (type only) + media.0.file", fd, token),
    );
  }

  // Format H: JSON types only + media[0]file (flat bracket)
  {
    const fd = new FormData();
    baseFields(fd);
    fd.append("media", JSON.stringify([{ type: 1 }]));
    fd.append("media[0]file", pngFile, "probe.png");
    results.push(
      await postFormData("H: media JSON (type only) + media[0]file", fd, token),
    );
  }

  const report = results.map((r) => ({
    label: r.label,
    status: r.status,
    formEntries: r.formEntries,
    fullResponse: r.bodyJson,
    mediaErrors: r.mediaErrors,
    mediaErrorsJson: JSON.stringify(r.mediaErrors, null, 2),
  }));

  const outPath = join(process.cwd(), "scripts", "probe-submit-media-results.json");
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log(JSON.stringify(report, null, 2));
  console.log(`\nWrote ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
