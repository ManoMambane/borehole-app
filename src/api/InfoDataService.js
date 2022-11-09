import axios from 'axios'
import { JPA_API_URL} from '../components/Constants'

class InfoDataService {
    retrieveAllInfos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/infos`);
    }

    retrieveInfo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/infos/${id}`);
    }

    deleteInfo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/infos/${id}`);
    }

    updateInfo(name, id, info) {
        return axios.put(`${JPA_API_URL}/users/${name}/infos/${id}`, info);
    }
}

export default new InfoDataService()