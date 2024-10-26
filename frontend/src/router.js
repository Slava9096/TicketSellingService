import { createWebHistory, createRouter } from "vue-router";

import store from "./store/index";

import ListHalls from "./components/hall/ListHalls";
import AddHall from "./components/hall/AddHall";
import Hall from "./components/hall/Hall";

import ListMovies from "./components/movie/ListMovies";
import AddMovie from "./components/movie/AddMovie";
import Movie from "./components/movie/Movie";

import ListSessions from "./components/session/ListSessions";
import AddSession from "./components/session/AddSession";
import Session from "./components/session/Session";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

const routes = [
    {
        path: "/listHalls",
        name: "halls",
        alias: "/halls",
        component: ListHalls,
        meta: {
            title: "Список залов"
        }
    },
    {
        path: "/addHall",
        name: "add-hall",
        component: AddHall,
        meta: {
            title: "Добавление зала"
        }
    },
    {
        path: "/hall/:id",
        name: "hall-details",
        component: Hall,
        props: true,
        meta: {
            title: "Данные зала"
        }
    },
    {
        path: "/listMovies",
        name: "movies",
        alias: "/movies",
        component: ListMovies,
        meta: {
            title: "Список фильмов"
        }
    },
    {
        path: "/addMovie",
        name: "add-movie",
        component: AddMovie,
        meta: {
            title: "Добавление фильма"
        }
    },
    {
        path: "/movie/:id",
        name: "movie-details",
        component: Movie,
        props: true,
        meta: {
            title: "Данные фильма"
        }
    },
    {
        path: "/listSessions",
        name: "sessions",
        alias: "/sessions",
        component: ListSessions,
        meta: {
            title: "Список сеансов"
        }
    },
    {
        path: "/addSession",
        name: "add-session",
        component: AddSession,
        meta: {
            title: "Добавление сеанса"
        }
    },
    {
        path: "/session/:id",
        name: "session-details",
        component: Session,
        props: true,
        meta: {
            title: "Данные сеанса"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            requiredAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || 'Главная страница';

    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({ path: "/login" });
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;
