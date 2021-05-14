import http from "../http-common";

class ArticleDataService {
  getAll() {
    return http.get("/articles");
  }

  get(id) {
    return http.get(`/articles/${id}`);
  }

  create(data) {
    return http.post("/articles", data);
  }

  update(id, data) {
    return http.put(`/articles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/articles/${id}`);
  }

  deleteAll() {
    return http.delete(`/articles`);
  }

  findById(id) {
    return http.get(`/articles?id=${id}`);
  }

  findByName(name) {
    return http.get(`/articles?name=${name}`);
  }
}

export default new ArticleDataService();