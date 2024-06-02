import Person from '../models/person.js';
import Household from '../models/household.js';
import Identity from '../models/identity.js';
import DeathReport from '../models/deathReport.js';
import mongoose from 'mongoose';

const getPeople = async (req, res) => {
  try {
    const people = await Person.find().populate('household identity').populate({
      path: 'deathReport',
      populate: {
        path: 'reportPerson',
        select: 'name _id'
      }
    });

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPersonDetail = async (req, res) => {
  try {
    const personId = req.params.personId;
    if (!mongoose.isValidObjectId(personId))
      res.status(400).json('Nhân khẩu không tồn tại');

    const person = await Person.findOne({ _id: personId.toString() }).populate(
      'household'
    );
    !person && res.status(400).json('Nhân khẩu không tồn tại');

    const identity = await Identity.findOne({ _id: person.identity });

    res.status(200).json({
      ...person._doc,
      identity: identity,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPerson = async (req, res) => {
  try {
    const householdId = req.body.householdId;
    const relationship = req.body.relationship;

    const name = req.body.name;
    const aliases = req.body.aliases;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const birthPlace = req.body.birthPlace;
    const nation = req.body.nation;
    const job = req.body.job;
    const jobAddress = req.body.jobAddress;
    const note = req.body.note;

    const numberIdentity = req.body.numberIdentity;
    const dateOfIssue = req.body.dateOfIssue;
    const placeOfIssue = req.body.placeOfIssue;

    const identity = new Identity({
      numberIdentity: numberIdentity,
      dateOfIssue: dateOfIssue,
      placeOfIssue: placeOfIssue,
    });
    await identity.save();

    const person = new Person({
      household: householdId,
      identity: identity._id,
      name: name,
      aliases: aliases,
      gender: gender,
      dateOfBirth: dateOfBirth,
      birthPlace: birthPlace,
      nation: nation,
      job: job,
      jobAddress: jobAddress,
      relationship: relationship,
      note: note,
    });
    await person.save();

    const household = await Household.findOne({ _id: householdId });
    if (relationship == 0) {
      household.headMember = person._id;
      household.change.push({
        content: `Thêm chủ hộ: ${person.name}`,
        date: Date.now(),
      });
    } else {
      household.members.push(person._id);
      household.change.push({
        content: `Thêm nhân khẩu: ${person.name}`,
        date: Date.now(),
      });
    }
    await household.save();

    res.status(201).json('Thêm thành công');
  } catch (error) {
    res.status(500).json(error);
  }
};