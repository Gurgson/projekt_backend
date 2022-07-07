const Publisher = require('../models/publisherModel');
const catchAssync = require('../utils/catchAssync');

exports.getAllPublishers = catchAssync(async (req, res) => {
  const publishers = await Publisher.find();
  res.status(200).json({
    status: 'success',
    results: publishers.length,
    data: {
      publishers
    }
  });
});
exports.getPublisherById = catchAssync(async (req, res) => {
  const publishers = await Publisher.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      publishers
    }
  });
});

exports.addPublisher = catchAssync(async (req, res) => {
  const publishers = await Publisher.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      publishers
    }
  });
});
exports.updatePublisher = catchAssync(async (req, res) => {
  const publishers = await Publisher.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      publishers
    }
  });
});
exports.deletePublisher = catchAssync(async (req, res) => {
  const publishers = await Publisher.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
