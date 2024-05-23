const getHousehold = async (req, res) => {
  try {
    const household = await Household.find();
    const data = [];
    for (let index = 0; index < household.length; index++) {
      const element = household[index];
      var name = null;
      if (element.headMember) {
        const data = await Person.findOne({ _id: element.headMember });
        name = data.name;
      }
      data.push({
        ...element._doc,
        head: name,
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHousehold = async (req, res) => {
  try {
    const apartmentNumber = req.body.apartmentNumber;
    const place = req.body.place;

    const household = new Household({
      apartmentNumber: apartmentNumber,
      place: place,
    });
    await household.save();

    res.status(201).json(household);
  } catch (error) {
    res.status(500).json(error);
  }
};
