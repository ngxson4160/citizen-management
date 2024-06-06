const API_ROOT = process.env.REACT_APP_API_ROOT || '';

const APIS = {
  user: {},
  household: {},
  people: {},
  money: {
    getMoney: () => axios.get(`${API_ROOT}/money`),
    getPeriodMoney: () => axios.get(`${API_ROOT}/money/period`),
    getContributionMoney: () => axios.get(`${API_ROOT}/money/contribution`),
    addMoney: (data) => axios.post(`${API_ROOT}/money`, data),
    editMoney: (moneyId, data) =>
      axios.put(`${API_ROOT}/money/${moneyId}`, data),
    deleteMoney: (moneyId) => axios.delete(`${API_ROOT}/money/${moneyId}`),
    getMoneyDetail: (moneyId) => axios.get(`${API_ROOT}/money/${moneyId}`),
    updateMoneyCollectStatus: (moneyId, data) =>
      axios.put(`${API_ROOT}/money/${moneyId}/collect-status`, data),
  },
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
