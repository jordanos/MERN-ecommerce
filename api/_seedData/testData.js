const jwt = require('jsonwebtoken');

exports.seedUser1 = {
  name: 'kebede',
  phone: '251919803123',
  email: 'alemu@xyz.com',
  password: '123456',
  address: 'Addis Ababa',
  image: 'image_default.png',
  status: 'active',
  isVerified: true,
  balance: 100,
  createdAt: '2022-03-14T08:28:54.019Z',
  id: '622efd0f9676958c4d2732cc',
  _id: '622efd0f9676958c4d2732cc',
};

exports.seedUser2 = {
  name: 'abebu',
  phone: '251919803125',
  email: 'abebu@xyz.com',
  password: '123456',
  address: 'Addis Ababa',
  image: 'image_default.png',
  status: 'active',
  isVerified: true,
  balance: 100,
  createdAt: '2022-03-14T08:34:39.297Z',
  id: '622efe5d7a8344cd7bb07a6a',
  _id: '622efe5d7a8344cd7bb07a6a',
};

exports.seedProduct1 = {
  userId: this.seedUser1.id,
  name: 'iphone',
  price: 20000,
  quantity: 12,
  description: 'cool phone',
  image: 'http://localhost:5000/media/images/products/default_image.jpg',
  productCondition: 'new',
  brand: 'apple',
  createdAt: '2022-04-29T06:45:20.599Z',
  _id: '626b8a7404173351fe13dcaf',
  id: '626b8a7404173351fe13dcaf',
};

exports.seedProduct2 = {
  userId: this.seedUser1.id,
  name: 'iphone x',
  price: 20000,
  quantity: 12,
  description: 'cool phone',
  image: 'http://localhost:5000/media/images/products/default_image.jpg',
  productCondition: 'new',
  brand: 'apple',
  createdAt: '2022-04-29T06:45:20.599Z',
  _id: '626b8a7404173351fe13dfaf',
  id: '626b8a7404173351fe13dfaf',
};

exports.seedFollow1 = {
  followingId: this.seedUser1.id,
  followerId: this.seedUser2.id,
  _id: '622efd0f9676958c4d2732cc',
  id: '622efd0f9676958c4d2732cc',
};

exports.seedFollow2 = {
  followingId: this.seedUser2.id,
  followerId: this.seedUser1.id,
  _id: '622efe5d7a8344cd7bb07a6a',
  id: '622efe5d7a8344cd7bb07a6a',
};

exports.seedFeed1 = {
  text: '622efd0f9676958c4d2732cf',
  image: '622efe5d7a8344cd7bb07a6a',
  userId: this.seedUser1.id,
  _id: '622efe3d7a8344cd7bb07a6a',
  id: '622efe3d7a8344cd7bb07a6a',
};

exports.seedConversation = {
  type: 'normal',
  fromId: this.seedUser1.id,
  toId: this.seedUser2.id,
  _id: '622efe3d7a8345cd7bb07b6a',
  id: '622efe3d7a8345cd7bb07b6a',
  createdAt: '2022-03-14T08:34:39.297Z',
  updateAt: '2022-03-14T08:34:39.297Z',
};

exports.seedMessage = {
  text: 'hello',
  conversationId: this.seedConversation.id,
  type: 'text',
  status: 'sent',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '622efe3d7a8345cd7bb07a6a',
  id: '622efe3d7a8345cd7bb07a6a',
};

exports.seedNotification = {
  title: 'rica',
  text: 'hello',
  userId: this.seedUser1.id,
  _id: '622efe3d2a8345cd7bb07a6a',
  id: '622efe3d2a8345cd7bb07a6a',
};

exports.seedPackage1 = {
  name: 'free',
  price: 0,
  maxPosts: 5,
  expiresAfter: 30,
  image: 'default.png',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '633efe3d2a8345cd7bb07a6a',
  id: '633efe3d2a8345cd7bb07a6a',
};

exports.seedPackage2 = {
  name: 'premium',
  price: 9.99,
  maxPosts: 90,
  expiresAfter: 120,
  image: 'default.png',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '644efe3d2a8345cd7bb07a6a',
  id: '644efe3d2a8345cd7bb07a6a',
};

exports.seedUserPackage1 = {
  userId: this.seedUser1.id,
  packageId: this.seedPackage1.id,
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '648efe3d2a8345cd7bb07a6a',
  id: '648efe3d2a8345cd7bb07a6a',
};

exports.seedUserPackage2 = {
  userId: this.seedUser1.id,
  packageId: this.seedPackage2.id,
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '658efe3d2a8345cd7bb07a6a',
  id: '658efe3d2a8345cd7bb07a6a',
};

exports.seedTransactionMethod1 = {
  name: 'Tele birr',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '758efe3d2a8345cd7bb07a6a',
  id: '758efe3d2a8345cd7bb07a6a',
};

exports.seedTransaction1 = {
  userId: this.seedUser1.id,
  amount: 10,
  transactionMethodId: this.seedTransactionMethod1.id,
  type: 'INCOMING',
  currency: 'COIN',
  status: 'PENDING',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '618efe3d2a8345cd7bb07a6a',
  id: '618efe3d2a8345cd7bb07a6a',
};

exports.seedTransaction2 = {
  userId: this.seedUser1.id,
  amount: 10,
  transactionMethodId: this.seedTransactionMethod1.id,
  type: 'INCOMING',
  currency: 'MONEY',
  status: 'PENDING',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '918efe3d2a8345cd7bb07a6a',
  id: '918efe3d2a8345cd7bb07a6a',
};

exports.seedTransactionMethod1 = {
  name: 'Paypal',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '928efe3d2a8345cd7bb07a6a',
  id: '928efe3d2a8345cd7bb07a6a',
};

exports.seedTransactionMethod2 = {
  name: 'Dummy method',
  createdAt: '2022-03-14T08:34:39.297Z',
  _id: '938efe3d2a8345cd7bb07a6a',
  id: '938efe3d2a8345cd7bb07a6a',
};

// exports.seedTask1 = {
//   title: "new task",
//   description: "new task description",
//   date: "2022-11-30T21:00:00.000Z",
//   status: "todo",
//   assignedTo: "622efd0f9676958c4d2732cc",
//   createdAt: "2022-03-14T09:23:15.976Z",
//   owner: "622efd0f9676958c4d2732cc",
//   _id: "622f09d25b6ebc40cec6d004",
// };

// exports.seedTask2 = {
//   title: "new task2",
//   description: "new task description",
//   date: "2022-11-30T21:00:00.000Z",
//   status: "todo",
//   assignedTo: "622efd0f9676958c4d2732cc",
//   createdAt: "2022-03-14T09:23:15.976Z",
//   owner: "622efd0f9676958c4d2732cc",
//   _id: "622f95dec9d9b1dca4d95ba0",
// };

exports.token1 = jwt.sign({ id: this.seedUser1.id }, process.env.SECRET_KEY, {
  expiresIn: '9999d',
});

exports.token2 = jwt.sign({ id: this.seedUser2.id }, process.env.SECRET_KEY, {
  expiresIn: '9999d',
});
