import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  products: [
    {
      // product: { type: Object, required: true },
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
});

export default model('Order', orderSchema);
