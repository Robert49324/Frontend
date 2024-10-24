import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "../views/SignUpPage.vue";
import NotFound from "../views/NotFound.vue";
import HomePage from "../views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import ChangePasswordPage from "@/views/ChangePasswordPage.vue";
import CreatePage from "@/views/CreatePage.vue";
import PagesList from "@/views/PagesList.vue";
import PageDescriptionPage from "@/views/PageDescriptionPage.vue";
import PostPage from "@/views/PostPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home",
  },
  {
    path: "/signup",
    component: SignUpPage,
    name: "signup",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    name: "notFound",
  },
  {
    path: "/home",
    component: HomePage,
    name: "home",
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "profile",
  },
  {
    path: "/changePassword",
    component: ChangePasswordPage,
    name: "changePassword",
  },
  {
    path: "/pages",
    component: PagesList,
    name: "pagesList",
  },
  {
    path: "/pages/:id",
    component: PageDescriptionPage,
    name: "descriptionPage",
  },
  {
    path: "/create_page",
    component: CreatePage,
    name: "createPage",
  },
  {
    path: "/post/:id",
    component: PostPage,
    name: "postPage",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
