<script setup>
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { useAuth } from "@/accounts/services/auth.service";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { toLocaleMonth } from "@/core/utils/months";
import { ref } from "vue";

const auth = useAuth();

const router = useRouter();

const showMore = ref(false);

onBeforeMount(() => {
  if (!auth.loggedIn) {
    router.push("/account/signin");
  }
});

/**
 * @param {Date} date
 */
const getDisplayableDate = date => {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid date, got ${typeof date}: ${date}`);
  }

  const month = toLocaleMonth(date, true);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

/**
 * @param {Date} startDate
 * @param {Date} endDate
 */
const getDisplayableExpDates = (startDate, endDate) => {
  if (!(startDate instanceof Date)) {
    throw new Error(
      `Invalid start date, got ${typeof startDate}: ${startDate}`,
    );
  }

  const msgs = { start: "", end: "Present" };

  msgs.start = `${toLocaleMonth(startDate)} ${startDate.getFullYear()}`;
  if (!(endDate instanceof Date)) {
    msgs.end = `${toLocaleMonth(endDate)} ${startDate.getFullYear()}`;
  }

  return `${msgs.start} — ${msgs.end}`;
};
</script>
<template>
  <div v-if="auth.loggedIn" class="p-16 flex space-x-8 max-w-screen-2xl">
    <div class="w-4/4 space-y-8">
      <div class="flex flex-col rounded bg-white overflow-hidden">
        <div class="flex items-center w-full h-48 overflow-hidden">
          <img class="object-cover w-full" :src="auth.store.user.cover?.href" :alt="auth.store.user.cover?.alt" />
        </div>
        <div class="flex">
          <div class="px-8 pb-8 relative">
            <span class="h-32 w-48 block" />
            <Avatar class="avatar-contain !h-48 !w-48 absolute inset-0 left-8 -top-16 border-8 border-white"
                    :image="auth.store.user.picture?.href" shape="circle" />
            <div class="flex justify-center">
              <a :href="'https://staging-dot-wawapi.uc.r.appspot.com/api/v1/cv/'+auth.store.user.id+'/file'" target="_blank"
                 class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Watch my CV </a>
            </div>
          </div>
          <div class="flex flex-col p-8 w-full space-y-2">
            <div class="flex justify-between w-full">
              <h1 class="text-2xl font-bold">{{ auth.store.user.fullName }}</h1>
              <div class="text-sm text-gray-600 space-x-1 flex items-center">
                <i :class="PrimeIcons.MAP_MARKER" class="text-sm"></i>
                <span>{{ auth.store.user.location }}</span>
              </div>
            </div>
            <p class="w-full text-gray-800">
              {{ auth.store.user.biography }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <h2 class="text-xl font-semibold">About</h2>

        <p class="text-lg text-gray-800" v-if="!showMore">{{ auth.store.user.about.substring(0, 200) }}...</p>
        <p class="text-lg text-gray-800" v-else>{{ auth.store.user.about }}</p>
        <a class="uppercase font-bold text-gray-600 block cursor-pointer" @click="showMore = !showMore">
          {{ showMore ? 'See less' : 'See more' }}
        </a>

      </div>
    </div>
  </div>
</template>
<style>
.avatar-contain>img {
  @apply object-cover;
}
</style>
