import axios from "./index"
import { APIS } from "../config/index"

export const queryDocumentList = (data) => {
  return axios.request({
    url: APIS.queryDocumentList(),
    method: 'GET',
    params: data
  })
}

export const fileCloneById = (data) => {
  return axios.request({
    url: APIS.fileCloneById(),
    method: 'GET',
    params: data
  })
}

export const queryFileMetadataById = (data) => {
  return axios.request({
    url: APIS.queryFileMetadataById(),
    method: 'GET',
    params: data
  })
}

export const createDocFile = (data) => {
  return axios.request({
    url: APIS.createDocFile(),
    method: 'POST',
    data
  })
}
