const productModle = require("../modles/product");

module.exports = {
  GetAll: (req, res) => {
    try {
      productModle.find().then((products) => {
        return res.status(200).json(products);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  GetByID: (req, res) => {
    try {
      productModle.find({ pid: req.params.id }).then((product) => {
        return res.status(200).json(product);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  AddNew: (req, res) => {
    try {
      productModle.insertMany([req.body]).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  UpdateByID: (req, res) => {
    try {
      productModle.updateOne({ pid: req.params.id }, req.body).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },

  DeletByID: (req, res) => {
    try {
      productModle.deleteOne({ pid: req.params.id }).then((data) => {
        return res.status(200).json(data);
      });
    } catch {
      return res.status(500).json({ Msg: "500 server Eror" });
    }
  },
};
