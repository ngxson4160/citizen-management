import moment from 'moment';
import Money from '../models/money.js';
import Household from '../models/household.js';
import CollectStatus from '../models/collectStatus.js';

const getMoney = async (req, res) => {
  try {
    const money = await Money.find();
    res.status(200).json(money);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPeriodMoney = async (req, res) => {
  try {
    const money = await Money.find({ moneyType: { $lt: 2 } });
    res.status(200).json(money);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getContributionMoney = async (req, res) => {
  try {
    const money = await Money.find({ moneyType: 2 });
    res.status(200).json(money);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addMoney = async (req, res) => {
  try {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const cycle = req.body.cycle;
    const note = req.body.note;
    const amountOfMoney = req.body.amountOfMoney;
    const moneyType = req.body.moneyType;

    const money = new Money({
      name: name,
      startDate: startDate,
      cycle: cycle,
      note: note,
      amountOfMoney: amountOfMoney,
      moneyType: moneyType,
    });
    await money.save();

    res.status(201).json(money);
  } catch (error) {
    res.status(500).json(error);
  }
};



const editMoney = async (req, res) => {
  try {
    const moneyId = req.params.moneyId;

    const name = req.body.name;
    const startDate = req.body.startDate;
    const cycle = req.body.cycle;
    const note = req.body.note;
    const amountOfMoney = req.body.amountOfMoney;
    const moneyType = req.body.moneyType;

    const money = await Money.findOne({ _id: moneyId });
    money.name = name;
    money.amountOfMoney = amountOfMoney;
    money.startDate = startDate;
    money.cycle = cycle;
    money.note = note;
    money.moneyType = moneyType;
    await money.save();

    res.status(201).json(money);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMoney = async (req, res) => {
  try {
    const moneyId = req.params.moneyId;

    await Promise.all([
      Money.deleteOne({ _id: moneyId }),
      CollectStatus.deleteMany({ money: moneyId }),
    ]);

    res.status(200).json('Xóa khoản tiền thành công');
  } catch (e) {
    res.status(500).json(e);
  }
};

const getMoneyDetail = async (req, res) => {
  try {
    const moneyId = req.params.moneyId;

    const money = await Money.findOne({ _id: moneyId });
    !money && res.status(400).json('Khoản tiền không tồn tại');

    res.status(200).json({
      ...money._doc,
      collectStatus: await getMoneyCollectStatus(moneyId),
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getMoneyCollectStatus = async (moneyId) => {
  const response = [];

  const query = await Promise.all([
    Money.findOne({ _id: moneyId }),
    CollectStatus.find({ money: moneyId }).populate({
      path: 'household',
      select: 'headMember apartmentNumber members',
      populate: {
        path: 'headMember',
        select: 'name',
      },
    }),
  ]);
  const money = query[0];
  const collectStatus = query[1];
  let haveStatusHouseholdsId = [];

  if (collectStatus) {
    collectStatus.forEach((collectStatus) => {
      response.push({
        ...collectStatus._doc,
        requiredMoney: getRequiredMoney(money, collectStatus.household),
        totalRequiredMoney: getTotalRequiredMoney(
          money,
          collectStatus.household
        ),
      });
    });
    haveStatusHouseholdsId = collectStatus.map(
      (collectStatus) => collectStatus.household._id
    );
  }

  const noHistoryHouseholds = await Household.find({
    _id: { $nin: haveStatusHouseholdsId },
  }).populate({
    path: 'headMember',
    select: 'name',
  });

  noHistoryHouseholds &&
    noHistoryHouseholds.forEach((household) => {
      response.push({
        money: moneyId,
        household: household,
        paidMoney: 0,
        paidHistory: [],
        requiredMoney: getRequiredMoney(money, household),
        totalRequiredMoney: getTotalRequiredMoney(money, household),
      });
    });

  return response;
};