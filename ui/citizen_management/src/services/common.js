const API_ROOT = process.env.REACT_APP_API_ROOT || '';

const APIS = {
  user: {},
  household: {},
  people: {
    getPeople: () => axios.get(`${API_ROOT}/person`),
    getPersonDetail: (personId) => axios.get(`${API_ROOT}/person/${personId}`),
    addPerson: (data) => axios.post(`${API_ROOT}/person`, data),
    editPerson: (personId, data) =>
      axios.put(`${API_ROOT}/person/${personId}`, data),
    deletePerson: (personId) => axios.delete(`${API_ROOT}/person/${personId}`),
    registerForTemporaryResidence: (personId, data) =>
      axios.post(`${API_ROOT}/person/${personId}/residence`, data),
    reportDeath: (personId, data) =>
      axios.post(`${API_ROOT}/person/${personId}/death-report`, data),
  },
  money: {},
};

export default APIS;
