exports.getAllPacks = (req, res) => {
  console.log(req);
  res.status(200).json({ message: "hello from the packs route" });
};
