import axios from 'axios'
import {JPA_API_URL} from '../components/Constants'

class ElimDataService {
    retrieveAllElimInfos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/eliminfos`);
    }

    retrieveElimInfo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/eliminfos/${id}`);
    }

    deleteElimInfo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/eliminfos/${id}`);
    }

    updateElimInfo(name, id, eliminfo) {
        return axios.put(`${JPA_API_URL}/users/${name}/eliminfos/${id}`, eliminfo);
    }
}

export default new ElimDataService()