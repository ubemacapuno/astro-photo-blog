<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  AUTO_PLAY_INTERVAL,
  TRANSITION_DURATION,
  DELAY_AFTER_TRANSITION,
} from "../../globals";

interface CarouselImage {
  src: string;
  alt: string;
}

interface Props {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoPlayInterval: AUTO_PLAY_INTERVAL,
});

function shuffleArray(array: CarouselImage[]): CarouselImage[] {
  const shuffled = [...array];
  // Fisher-Yates shuffle
  // start from the last element
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // then pick a random element from 0 to i
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // then swap the two elements
  }
  return shuffled;
}

const shuffledImages = ref<CarouselImage[]>([]);

const MIN_SWIPE_DISTANCE = 50;
const MIN_SWIPE_PREVENT_SCROLL = 10;

// state
const currentIndex = ref(1);
const isTransitioning = ref(false);
let isJumpingBack = false;
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

const touchStartX = ref<number | null>(null);
const touchEndX = ref<number | null>(null);

// computed
// Infinite loop: [last, ...images, first]. After animating to the clone, we jump
// back to the real slide without transition. Same image both positions = no flicker.
const extendedImages = computed(() => {
  const images = shuffledImages.value;
  if (images.length === 0) return [];
  const last = images[images.length - 1];
  const first = images[0];
  return [last, ...images, first];
});

// slide navigation
const jumpToPosition = (index: number) => {
  isJumpingBack = true;
  touchStartX.value = null;
  touchEndX.value = null;
  isTransitioning.value = false;
  currentIndex.value = index;
  setTimeout(() => {
    isJumpingBack = false;
  }, DELAY_AFTER_TRANSITION);
};

const nextSlide = () => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  currentIndex.value++;

  if (currentIndex.value === extendedImages.value.length - 1) {
    setTimeout(() => jumpToPosition(1), TRANSITION_DURATION);
  } else {
    setTimeout(() => (isTransitioning.value = false), TRANSITION_DURATION);
  }
};

const prevSlide = () => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;
  currentIndex.value--;

  if (currentIndex.value === 0) {
    setTimeout(
      () => jumpToPosition(shuffledImages.value.length),
      TRANSITION_DURATION
    );
  } else {
    setTimeout(() => (isTransitioning.value = false), TRANSITION_DURATION);
  }
};

// auto-play
const startAutoPlay = () => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(nextSlide, props.autoPlayInterval);
};

const resetAutoPlay = () => {
  if (props.images.length <= 1) return;
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
  startAutoPlay();
};

// touch handlers
const onTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
};

const onTouchMove = (event: TouchEvent) => {
  const currentX = event.touches[0].clientX;
  const deltaX = Math.abs((touchStartX.value ?? 0) - currentX);

  if (deltaX > MIN_SWIPE_PREVENT_SCROLL) {
    event.preventDefault();
  }

  touchEndX.value = currentX;
};

const onTouchEnd = () => {
  if (touchStartX.value === null || touchEndX.value === null) return;
  if (isJumpingBack) return;

  const deltaX = touchStartX.value - touchEndX.value;

  if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
    if (deltaX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetAutoPlay();
  }

  touchStartX.value = null;
  touchEndX.value = null;
};

// lifecycle methods
onMounted(() => {
  shuffledImages.value = shuffleArray(props.images);
  if (shuffledImages.value.length > 1) {
    startAutoPlay();
  }
});

onUnmounted(() => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
});
</script>

<template>
  <div
    class="relative w-88 h-125 md:w-103.75 md:h-147.5 overflow-hidden"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Blank placeholder to prevent layout shift until carousel is ready -->
    <div
      v-if="shuffledImages.length === 0"
      class="absolute inset-0"
      aria-hidden="true"
    />

    <div
      v-else
      class="flex w-full h-full"
      :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: isTransitioning
          ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
      }"
    >
      <div
        v-for="(image, index) in extendedImages"
        :key="`${index}-${image.src}`"
        class="min-w-full h-full flex items-center justify-center"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
