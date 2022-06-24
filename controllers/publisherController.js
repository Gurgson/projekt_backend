const Publisher = require('../models/publisherModel');

exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json({
      status: 'success',
      results: publishers.length,
      data: {
        publishers
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.getPublisherById = async (req, res) => {
  try {
    const publishers = await Publisher.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: publishers.length,
      data: {
        publishers
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.addPublisher = async (req, res) => {
  try {
    const publishers = await Publisher.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        publishers
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.updatePublisher = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
exports.deletePublisher = async (req, res) => {
  try {
    const publishers = await Publisher.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        publishers
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
