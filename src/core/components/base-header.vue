<script setup>
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { useMq } from "vue3-mq";
import { ref, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuth } from "@/accounts/services/auth.service";

const mq = useMq();

const router = useRouter();

const auth = useAuth();
const user = ref(auth.user);

watchEffect(() => {
  user.value = auth.user;
});

const navigation = [
  { label: "Home", path: "/", icon: PrimeIcons.HOME },
  { label: "Offers", path: "/jobs", icon: PrimeIcons.BRIEFCASE },
  { label: "Postulations", path: "/notifications", icon: PrimeIcons.SEND },
];

const search = ref("");
// TODO: Redirect to search table temporarily, will change later
const handleSearch = () => {
  if (auth.loggedIn) {
    router.push("/jobs/search");
  }
};

/** @type {import("vue").Ref<import("primevue/menu").default>} */
const menuRef = ref();

/** @type {import("primevue/menuitem").MenuItem[]} */
const accountMenu = [
  {
    label: "Sign In",
    to: "/account/signin",
    icon: PrimeIcons.SIGN_IN,
    visible: () => !auth.loggedIn,
  },
  {
    label: "Sign Up",
    to: "/account/signup",
    icon: PrimeIcons.USER_PLUS,
    visible: () => !auth.loggedIn,
  },
  ...navigation.map(item => ({
    label: item.label,
    icon: item.icon,
    visible: () => mq.mdMinus && auth.loggedIn,
  })),
  { separator: true, visible: () => mq.mdMinus && auth.loggedIn },
  {
    label: "Profile",
    icon: PrimeIcons.USER,
    visible: () => auth.loggedIn,
  },
  {
    label: "Billing",
    command: () => {
      router.push("/billing");
    },
    icon: PrimeIcons.MONEY_BILL,
    visible: () => auth.loggedIn,
  },

  {
    label: "Companies",
    command: () => {
      router.push("/companies/admin");
    },
    icon: PrimeIcons.BUILDING,
    visible: () => auth.loggedIn,
  },
  {
    label: "Options",
    icon: PrimeIcons.COG,
    visible: () => auth.loggedIn,
  },
  {
    label: "Suscription",
    command: () => {
      router.push("/payment");
    },
    icon: PrimeIcons.STAR,
    visible: () => auth.loggedIn,
  },
  {
    label: "Sign Out",
    command: () => {
      auth.logout();
      router.push("/account/signin");
    },
    icon: PrimeIcons.POWER_OFF,
    visible: () => auth.loggedIn,
  },
];
</script>

<template>
  <header
    class="px-4 md:px-8 flex items-center h-20 justify-between sm:justify-start sm:space-x-8 bg-white">
    <div class="flex items-center h-full space-x-8 flex-grow">
      <RouterLink to="/">
        <h1 class="text-2xl font-bold">WAW</h1>
      </RouterLink>
      <nav
        v-if="auth.loggedIn"
        class="h-full pl-8 hidden md:flex items-center border-l border-slate-200">
        <ul class="flex text-center space-x-12">
          <RouterLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path">
            <li class="flex flex-col space-y-2">
              <i :class="item.icon" class="text-xl"></i>
              <span class="text-xs font-medium uppercase">
                {{ item.label }}
              </span>
            </li>
          </RouterLink>
        </ul>
      </nav>
    </div>

    <div
      class="flex items-center shrink-0 space-x-4 cursor-pointer"
      @click="event => menuRef.toggle(event)">
      <div class="rounded-full overflow-hidden w-8 h-8">
        <Avatar
          v-if="auth.loggedIn && user?.picture?.href"
          class="avatar-contain"
          :image="user.picture.href"
          shape="circle" />
        <span
          v-else
          class="w-full h-full rounded-full border-2 border-black flex justify-center items-center">
          <i class="text-xl text-black mt-1" :class="PrimeIcons.USER"></i>
        </span>
      </div>
      <div class="hidden lg:flex flex-col space-y-1">
        <span class="text-xs font-medium">
          Hello, {{ auth.loggedIn ? user.preferredName : "Sign In" }}
        </span>
        <span v-if="auth.loggedIn" class="text-xs font-normal text-slate-600">
          {{ user.profileViews }} views today
        </span>
      </div>
      <i class="hidden lg:inline-block" :class="PrimeIcons.CHEVRON_DOWN"></i>
      <Menu ref="menuRef" :model="accountMenu" :popup="true" class="mt-2" />
    </div>
  </header>
</template>

<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
