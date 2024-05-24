import axios from "@/axios/axios";

export default {
    install(app) {
        app.config.globalProperties.$axios = axios;
    }
}
