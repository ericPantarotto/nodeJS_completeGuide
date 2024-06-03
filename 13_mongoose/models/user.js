// import { ObjectId } from 'mongodb';
// import { getDb } from '../util/database.js';
// class User {
//   constructor(userName, email, cart, id) {
//     this.userName = userName;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const updatedItems = [...(this.cart?.items || [])];
//     const existingProductIndex = this.cart?.items.findIndex(
//       cp => cp.productId.toString() === product._id.toString()
//     );

//     if (existingProductIndex >= 0) {
//       updatedItems[existingProductIndex].quantity = ++this.cart.items[
//         existingProductIndex
//       ].quantity;
//     } else {
//       updatedItems.push({
//         productId: product._id,
//         quantity: 1,
//       });
//     }

//     const db = getDb();
//     return db.collection('users').updateOne(
//       {
//         _id: this._id,
//       },
//       { $set: { cart: { items: updatedItems } } }
//     );
//   }

//   getCart() {
//     const db = getDb();
//     const productsId = this.cart.items.map(item => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productsId } })
//       .toArray()
//       .then(products => {
//         //INFO: cleaning the db cart if a product has been deleting after having been added in the cart
//         if (this.cart.items.length !== products.length) {
//           console.log('MISMATCH!!!');
//           const updatedCartItems = products.map(product => ({
//             productId: product._id,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === product._id.toString();
//             }).quantity,
//           }));
          
//            db.collection('users').updateOne(
//              { _id: this._id },
//              { $set: { 'cart.items': updatedCartItems } }
//            );
//         }
        
//         return products.map(product => ({
//           ...product,
//           quantity: this.cart.items.find(i => {
//             return i.productId.toString() === product._id.toString();
//           }).quantity,
//         }));
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       item => item.productId.toString() !== productId.toString()
//     );
//     const db = getDb();
//     return db.collection('users').updateOne(
//       {
//         _id: this._id,
//       },
//       { $set: { cart: { items: updatedCartItems } } }
//     );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart().then(products => {
//       const order = {
//         items: products,
//         user: { _id: this._id, name: this.userName },
//       };

//       return db
//         .collection('orders')
//         .insertOne(order)
//         .then(_ => {
//           this.cart = { items: [] };
//           return db.collection('users').updateOne(
//             {
//               _id: this._id,
//             },
//             { $set: { cart: { items: [] } } }
//           );
//         });
//     });
//   }

//   getOrders() {
//     const db = getDb();

//     return db.collection('orders').find({ 'user._id': this._id }).toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: ObjectId.createFromHexString(userId) })
//       .then(user => user)
//       .catch(err => console.error(err));
//   }
// }

// export default User;
