import axios from "axios";
const APIURL = "http://localhost:8888/api";

//USERS METHODS-----------------------------------------------------------------

export const getOneUser = id => axios.get(`${APIURL}/user/${id}`);
export const updateOneUser = (id, infos) => axios.put(`${APIURL}/user/${id}`, infos);

export const updateAvatar = (img) => axios.patch(`${APIURL}/user/add-avatar/`, img, { headers: {
  "Content-Type":  "multipart/form-data"
}}) //route should be from cloudInary ?


//MAPS METHODS-----------------------------------------------------------------
export const getAllMaps = () => axios.get(`${APIURL}/map/`);

export const createOneMap = (infos) => axios.post(`${APIURL}/map/`, infos);

export const getOneMap = id => axios.get(`${APIURL}/map/${id}`);

export const updateOneMap = (id, infos) => axios.put(`${APIURL}/map/${id}`, infos);

export const deleteOneMap = (id) => axios.delete(`${APIURL}/map/${id}`);


//COMMENTS METHODS--------------------------------------------------------------

export const createOneComment = (infos) => axios.post(`${APIURL}/comment/`, infos)

export const getAllComments = (id) => axios.get(`${APIURL}/comment/${id}`)
