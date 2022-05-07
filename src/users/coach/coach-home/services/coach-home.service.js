import http from "../../../../core/services/http-common";

<<<<<<< Updated upstream
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
=======
export class PublicationsService {
    endPoint='/publications';//aqui lo conectamos con el db

    getAll() {
        return http.get(`${this.endPoint}`);

    }
    getById(id){
        return http.get(`${this.endPoint}/?id=${id}`);
    }
    create(CreateTutorialDto) {
        return http.post(this.endPoint,CreateTutorialDto)
    }

    delete(id) {
        return http.delete(`${this.endPoint }/${id}`);
    }

    update(id,updateTutorialDto) {
        return http.put(`${this.endPoint }/${id}`,updateTutorialDto);

    }
}

>>>>>>> Stashed changes
