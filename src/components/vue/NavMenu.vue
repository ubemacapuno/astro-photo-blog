<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  pathname: string;
}>();

const pages = [
  { label: "Home", href: "/", prefetch: true },
  { label: "Blog", href: "/blog/", prefetch: true },
  { label: "Bio", href: "/bio/", prefetch: false },
  { label: "Contact", href: "/bio#contact", prefetch: false },
];

function normalizePath(path: string) {
  if (path === "/") return "/";
  return path.replace(/\/$/, "");
}

function isActiveNavLink(href: string) {
  const normalizedPathname = normalizePath(props.pathname);
  const normalizedHref = normalizePath(href);
  if (normalizedPathname === normalizedHref) return true;
  if (normalizedHref === "/blog" && normalizedPathname.startsWith("/blogs")) return true;
  if (href !== "/" && normalizedPathname.startsWith(normalizedHref + "/")) return true;
  return false;
}

const isOpen = ref(false);

function openMenu() {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  isOpen.value = false;
  document.body.style.overflow = "";
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape" && isOpen.value) closeMenu();
}

onMounted(() => document.addEventListener("keydown", handleEscape));
onUnmounted(() => document.removeEventListener("keydown", handleEscape));

const drawerClass = computed(() =>
  isOpen.value ? "translate-x-0" : "translate-x-full md:translate-x-0"
);
const backdropClass = computed(() => (isOpen.value ? "" : "hidden"));
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="menu-button group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-black border-0 p-0 md:hidden transition-colors"
      :aria-expanded="isOpen"
      aria-controls="main-menu"
      aria-label="Toggle menu"
      @click="isOpen ? closeMenu() : openMenu()"
    >
      <div
        class="absolute flex flex-col justify-center items-center gap-1.5 transition-opacity ease-in-out group-aria-expanded:opacity-0"
      >
        <span class="block h-0.5 w-5 bg-black dark:bg-white transition-colors"></span>
        <span class="block h-0.5 w-5 bg-black dark:bg-white transition-colors"></span>
        <span class="block h-0.5 w-5 bg-black dark:bg-white transition-colors"></span>
      </div>
      <span
        class="absolute text-black dark:text-white text-xl transition-[opacity,color] duration-150 ease-in-out opacity-0 group-aria-expanded:opacity-100"
      >
        X
      </span>
    </button>

    <div
      :class="['fixed inset-0 bg-black/50 z-40 md:hidden', backdropClass]"
      aria-hidden="true"
      @click="closeMenu"
    />

    <div
      id="main-menu"
      :class="[
        'fixed top-0 right-0 h-full w-64 bg-white dark:bg-black z-50 transform transition-[transform,background-color] duration-150 ease-in-out md:relative md:w-auto md:h-auto md:block md:mx-auto md:text-center',
        drawerClass,
      ]"
    >
      <button
        type="button"
        class="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="Close menu"
        @click="closeMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        class="mt-16 md:mt-0 flex flex-col h-full md:flex-row md:h-auto md:items-center md:justify-center"
      >
        <a
          v-for="page in pages"
          :key="page.href"
          :href="page.href"
          :data-astro-prefetch="page.prefetch"
          :class="[
            'anton-nav block text-center py-2.5 text-xl md:inline-block md:px-5 md:py-4 text-black dark:text-white transition-colors',
            isActiveNavLink(page.href)
              ? 'underline !text-red-600'
              : 'hover:text-gray-600 dark:hover:text-gray-300',
          ]"
          @click="closeMenu"
        >
          {{ page.label }}
        </a>
        <div class="md:hidden flex justify-center py-4">
          <slot name="drawer-footer" />
        </div>
      </div>
    </div>
  </div>
</template>
