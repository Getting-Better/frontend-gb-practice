import http from "../../../../core/services/http-common";

export class coachHomeService {
    getAll() {
        return http.get("/home");
    }
    getById(id) {
        return http.get(`/home/${id}`);
    }
    update(id, data) {
        return http.put(`/home/${id}`, data);
    }
}
