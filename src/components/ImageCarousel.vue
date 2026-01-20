<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

  interface Props {
    images: CarouselImage[];
    autoPlayInterval?: number;
  }
  
  interface CarouselImage {
    src: string;
    alt: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    autoPlayInterval: 2150,
  });
  
  const currentIndex = ref(0);
  let autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  const isTransitioning = ref(false);
  
  // extended array with duplicates for seamless infinite scroll
  const extendedImages = computed(() => {
    if (props.images.length === 0) return [];
    // Add the first image at the end for seamless transition
    return [...props.images, props.images[0]];
  });
  
  const nextSlide = () => {
    // prevent overlapping transitions
    if (isTransitioning.value) return;
  
    isTransitioning.value = true;

    // move to next image
    currentIndex.value++;
  
    // loop back when we reach the duplicate image at the end
    if (currentIndex.value >= props.images.length) {
      setTimeout(() => {
        // disable transition and jump back to index 0 (no animation)
        isTransitioning.value = false;
        currentIndex.value = 0;
  
        // re-enable transitions after brief moment for next slide
        setTimeout(() => {
          isTransitioning.value = false;
        }, 50);
      }, 800); // match the transition duration
    } else {
      // normal case: wait for transition to complete, then allow next slide
      setTimeout(() => {
        isTransitioning.value = false;
      }, 800);
    }
  };
  
  const startAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, props.autoPlayInterval);
  };
  
  onMounted(() => {
    if (props.images.length > 1) {
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
    <div class="relative w-[352px] h-[500px] md:w-[415px] md:h-[590px] overflow-hidden">
      <div
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