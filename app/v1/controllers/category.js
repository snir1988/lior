const categoryModle = require("../modles/category");

module.exports = {
  GetAll: (req, res) => {
    console.log("not here",req.body);
    try {
      categoryModle.find().then((category) => {
        return res.status(200).json(category);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  GetByID: (req, res) => {
    try {
      categoryModle.find({ cid: req.params.id }).then((category) => {
        return res.status(200).json(category);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  AddNew: (req, res) => {
    try {
      categoryModle.insertMany([req.body]).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  UpdateByID: (req, res) => {
    try {
      categoryModle.updateOne({ cid: req.params.id }, req.body).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  DeletByID: (req, res) => {
    try {
      categoryModle.deleteOne({ cid: req.params.id }).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },
};
