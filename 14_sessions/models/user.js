import { Schema, model } from 'mongoose';
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const updatedItems = [...(this.cart?.items || [])];
  const existingProductIndex = this.cart?.items.findIndex(
    cp => cp.productId.toString() === product._id.toString()
  );

  if (existingProductIndex >= 0) {
    updatedItems[existingProductIndex].quantity = ++this.cart.items[
      existingProductIndex
    ].quantity;
  } else {
    updatedItems.push({
      productId: product._id,
      quantity: 1,
    });
  }
  this.cart.items = updatedItems;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    item => item.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

export default model('User', userSchema);
