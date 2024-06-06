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
};

export default APIS;
