exports.seedUser1 = {
  name: 'kebede',
  phone: '251919803123',
  email: 'alemu@xyz.com',
  password: '123456',
  address: 'Addis Ababa',
  image: 'image_default.png',
  status: 'active',
  isVerified: false,
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
  isVerified: false,
  createdAt: '2022-03-14T08:34:39.297Z',
  id: '622efe5d7a8344cd7bb07a6a',
  _id: '622efe5d7a8344cd7bb07a6a',
};

exports.seedProduct1 = {
  userId: '626a4b6f5d293ad3fbf48044',
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

exports.seedFollow1 = {
  followingId: '622efd0f9676958c4d2732cc',
  followerId: '622efe5d7a8344cd7bb07a6a',
  _id: '622efd0f9676958c4d2732cc',
  id: '622efd0f9676958c4d2732cc',
};

exports.seedFollow2 = {
  followingId: '622efd0f9676958c4d2732cf',
  followerId: '622efe5d7a8344cd7bb07a6a',
  _id: '622efe5d7a8344cd7bb07a6a',
  id: '622efe5d7a8344cd7bb07a6a',
};

exports.seedFeed1 = {
  text: '622efd0f9676958c4d2732cf',
  image: '622efe5d7a8344cd7bb07a6a',
  owner: '622efd0f9676958c4d2732cc',
  _id: '622efe3d7a8344cd7bb07a6a',
  id: '622efe3d7a8344cd7bb07a6a',
};

exports.seedMessage = {
  text: 'hello',
  fromId: this.seedUser1.id,
  toId: this.seedUser2.id,
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
