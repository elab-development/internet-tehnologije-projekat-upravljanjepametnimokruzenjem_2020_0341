import Type from '../models/Type.model.js';

// @desc        Create New Type (Create)
// @route       POST /api/types
// @access      Private
export const createType = async (req, res) => {
  try {
    const { name, valueType } = req.body;

    const newType = new Type({
      name: name,
      valueType: valueType,
    });

    newType
      .save()
      .then((result) =>
        res.status(201).send({
          message: 'Type created successfully!',
          type: result,
        })
      )
      .catch((error) => {
        res.status(500).send({
          error: 'Something went wrong while creating the type: ' + error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong createType: ' + error,
    });
  }
};

// @desc        Get All Types (Read)
// @route       GET /api/types
// @access      Private
export const getTypes = async (req, res) => {
  const name = req.query.name;
  let types = [];

  try {
    if (name && name !== '') {
        types = await Type.find({ name: { $regex: name, $options: 'i' } });
      } else {
        types = await Type.find({});
      }

    if (!types) {
      return res.status(404).send({
        message: 'No types found',
      });
    }

    return res.status(200).send(types);
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getTypes: ' + error,
    });
  }
};

// @desc        Get Single Type (Read)
// @route       GET /api/types/:id
// @access      Private
export const getType = async (req, res) => {
  const { id } = req.params;

  try {
    Type.findOne({ _id: id }, (err, type) => {
      if (err) {
        return res.status(500).send({
          error: 'Something went wrong while fetching the type: ' + err,
        });
      }

      if (!type) {
        return res.status(404).send({
          error: 'No type found',
        });
      }

      return res.status(200).send(type);
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong getType: ' + error,
    });
  }
};

// @desc        Update Type (Update)
// @route       PUT /api/types/:id
// @access      Private
export const updateType = async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;
    Type.updateOne({ _id: id }, body, (err, data) => {
      if (err) throw err;

      return res.status(202).send({
        message: 'Type information updated',
        type: data,
      });
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while updating updateType: ' + error,
    });
  }
};

// @desc        Delete Type (Delete)
// @route       DELETE /api/types/:id
// @access      Private
export const deleteType = async (req, res) => {
  try {
    await Type.deleteMany({ _id: req.params.id });

    return res.status(204).send({
      message: 'Type deleted',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Something went wrong while deleteType: ' + error,
    });
  }
};