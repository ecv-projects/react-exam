import {
  CREATE_ARTICLE,
  RETRIEVE_ARTICLES,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from "./types";

import ArticleDataService from "../services/article.service";

export const createArticle = (name, image, description, price) => async (dispatch) => {
  try {
    const res = await ArticleDataService.create({ name, image, description, price });

    dispatch({
      type: CREATE_ARTICLE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveArticles = () => async (dispatch) => {
  try {
    const res = await ArticleDataService.getAll();

    dispatch({
      type: RETRIEVE_ARTICLES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateArticle = (id, data) => async (dispatch) => {
  try {
    const res = await ArticleDataService.update(id, data);

    dispatch({
      type: UPDATE_ARTICLE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteArticle = (id) => async (dispatch) => {
  try {
    await ArticleDataService.delete(id);

    dispatch({
      type: DELETE_ARTICLE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};