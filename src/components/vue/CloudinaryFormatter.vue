<script setup lang="ts">
import { ref } from "vue";

/**
 * This component formats Cloudinary URLs into markdown images.
 *
 * Example raw Cloudinary URLs:
 * https://res.cloudinary.com/dntiqucwf/image/upload/v1769666733/20250426%20Justin%20and%20Kim%20Wedding%20NYC/002426-R1-E021_zfpg8c.jpg
 * https://res.cloudinary.com/dntiqucwf/image/upload/v1769666733/20250426%20Justin%20and%20Kim%20Wedding%20NYC/002426-R1-E021_zfpg8d.jpg
 *
 * Example formatted Cloudinary URLs:
 * ![Image - update this text](https://res.cloudinary.com/dntiqucwf/image/upload/f_auto,q_auto,w_1200,c_limit/v1769666733/20250426%20Justin%20and%20Kim%20Wedding%20NYC/002426-R1-E021_zfpg8c.jpg)<br />
 * ![Image - update this text](https://res.cloudinary.com/dntiqucwf/image/upload/f_auto,q_auto,w_1200,c_limit/v1769666733/20250426%20Justin%20and%20Kim%20Wedding%20NYC/002426-R1-E021_zfpg8d.jpg)<br />
 */

const rawCloudinaryUrlInput = ref("");
const formattedCloudinaryUrl = ref("");
const hasSkippedLines = ref(false);

const CLOUDINARY_TRANSFORMATIONS = "f_auto,q_auto,w_1200,c_limit";

const generateFormattedOutput = () => {
  hasSkippedLines.value = false;
  const lines = rawCloudinaryUrlInput.value.split("\n");
  const formattedLines = lines
    .map((line) => {
      const transformedUrl = applyCloudinaryTransformations(line);
      if (transformedUrl === null) {
        hasSkippedLines.value = true;
        return null;
      }
      return `![Image - update this text](${transformedUrl})`;
    })
    .filter((line): line is string => line !== null);
  formattedCloudinaryUrl.value = formattedLines.join("\n");
};

const applyCloudinaryTransformations = (
  cloudinaryUrl: string
): string | null => {
  const trimmed = cloudinaryUrl.trim();
  if (trimmed === "") return null;

  const uploadSplit = trimmed.split("/upload/");
  if (uploadSplit.length !== 2) {
    return null;
  }

  const baseUrl = uploadSplit[0];
  const assetPath = uploadSplit[1];
  return `${baseUrl}/upload/${CLOUDINARY_TRANSFORMATIONS}/${assetPath}`;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(formattedCloudinaryUrl.value);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="rawCloudinaryUrlInput"
      >Raw Cloudinary URL(s) (one per line)</label
    >
    <textarea
      id="rawCloudinaryUrlInput"
      v-model="rawCloudinaryUrlInput"
      rows="6"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-inherit"
      placeholder="https://res.cloudinary.com/.../upload/v123/..."
    />
    <button
      type="button"
      @click="generateFormattedOutput"
      class="border-2 border-red-500 text-white p-2 w-full bg-red-500 hover:bg-red-600 rounded font-medium"
    >
      Generate markdown
    </button>
    <p
      v-if="hasSkippedLines"
      class="text-amber-600 dark:text-amber-400 text-sm"
      role="alert"
    >
      Some lines may have been skipped due to empty or invalid URLS!
      Double-check the input.
    </p>
    <div class="flex flex-row gap-2 justify-between">
      <label for="formattedOutput" class="mt-4">Markdown output</label>
      <button
        type="button"
        @click="copyToClipboard"
        class="border-2 text-white p-2 bg-gray-500 hover:bg-green-600 rounded font-medium"
      >
        Copy to clipboard
      </button>
    </div>
    <textarea
      id="formattedOutput"
      :value="formattedCloudinaryUrl"
      readonly
      rows="6"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-inherit"
      placeholder="Generated markdown will appear here..."
    />
  </div>
</template>
