import Profile from "../pages/dropdown-menu/profile/Profile.vue";
import Home from "../pages/home/Home.vue";
import NotFound from "../pages/not-found/NotFound.vue";
import Contact from "../pages/contact/Contact.vue";

import MyPostList from "../pages/dropdown-menu/my-posts/MyPostList.vue";

import CreatePost from "../pages/create-post/CreatePost.vue";
import UpdatePost from "../pages/update-post/UpdatePost.vue";
import ListNotifications from "../pages/list-notifications/ListNotifications.vue";

import PrivacyPolicy from "../pages/policy/PrivacyPolicy.vue";

import DocumentList from "../pages/document/DocumentList.vue";

import DocumentDetail from "../pages/document/DocumentDetail.vue";

export default [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      requiresAuth: false,
    },
  },


  {
    path: "/post/document",
    name: "DocumentList",
    component: DocumentList,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/post/document/:id",
    name: "DocumentDetail",
    component: DocumentDetail,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/my-posts",
    name: "MyPostList",
    component: MyPostList,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/update-post/:id",
    name: "UpdatePost",
    component: UpdatePost,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/list-notifications",
    name: "ListNotification",
    component: ListNotifications,
    meta: {
      requiresAuth: true,
    },
  },




  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
    meta: {
      requiresAuth: true,
    },
  },
];
