const { expect } = global;

// exports.taskSchema = {
//   title: expect.any(String),
//   description: expect.any(String),
//   date: expect.any(String),
//   status: expect.any(String),
//   assignedTo: expect.any(String),
//   createdAt: expect.any(String),
//   owner: expect.any(String),
// };
exports.productSchema = {
  userId: expect.objectContaining({
    id: expect.any(String),
    name: expect.any(String),
  }),
  name: expect.any(String),
  price: expect.any(Number),
  quantity: expect.any(Number),
  description: expect.any(String),
  image: expect.any(String),
  productCondition: expect.any(String),
  brand: expect.any(String),
  tags: expect.any(Array),
  createdAt: expect.any(String),
};

exports.productSchemaPost = {
  userId: expect.any(String),
  name: expect.any(String),
  price: expect.any(Number),
  quantity: expect.any(Number),
  description: expect.any(String),
  image: expect.any(String),
  productCondition: expect.any(String),
  brand: expect.any(String),
  tags: expect.any(Array),
  createdAt: expect.any(String),
};

exports.userSchemaGetOne = {
  user: expect.objectContaining({
    name: expect.any(String),
    phone: expect.any(String),
    email: expect.any(String),
    address: expect.any(String),
    image: expect.any(String),
    status: expect.any(String),
    createdAt: expect.any(String),
    lastSeen: expect.any(String),
  }),
  feedsCount: expect.any(Number),
  productsCount: expect.any(Number),
  followingCount: expect.any(Number),
  followersCount: expect.any(Number),
};

exports.userSchema = {
  name: expect.any(String),
  phone: expect.any(String),
  email: expect.any(String),
  address: expect.any(String),
  image: expect.any(String),
  status: expect.any(String),
  createdAt: expect.any(String),
  lastSeen: expect.any(String),
};

exports.followSchema = {
  followerId: expect.any(String),
  followingId: expect.any(String),
  createdAt: expect.any(String),
};

exports.adminSchema = {
  canRead: expect.any(Boolean),
  canWrite: expect.any(Boolean),
  canAddAdmin: expect.any(Boolean),
  canRemoveAdmin: expect.any(Boolean),
  owner: expect.any(String),
};

exports.feedSchema = {
  text: expect.any(String),
  image: expect.any(String),
  userId: expect.objectContaining({
    id: expect.any(String),
    name: expect.any(String),
    image: expect.any(String),
  }),
  createdAt: expect.any(String),
};

exports.feedSchemaPost = {
  text: expect.any(String),
  image: expect.any(String),
  userId: expect.any(String),
  createdAt: expect.any(String),
};

exports.messageSchemaPost = {
  text: expect.any(String),
  conversationId: expect.any(String),
  type: expect.any(String),
  status: expect.any(String),
  createdAt: expect.any(String),
};

exports.messageSchema = {
  text: expect.any(String),
  conversationId: expect.objectContaining({
    toId: expect.any(String),
    fromId: expect.any(String),
  }),
  type: expect.any(String),
  status: expect.any(String),
  createdAt: expect.any(String),
};

exports.notificationSchema = {
  title: expect.any(String),
  text: expect.any(String),
  userId: expect.any(String),
  type: expect.any(String),
  status: expect.any(String),
  createdAt: expect.any(String),
};

exports.packageSchema = {
  id: expect.any(String),
  name: expect.any(String),
  price: expect.any(Number),
  maxPosts: expect.any(Number),
  expiresAfter: expect.any(Number),
  image: expect.any(String),
  createdAt: expect.any(String),
};

exports.userPackageSchema = {
  id: expect.any(String),
  userId: expect.objectContaining({
    id: expect.any(String),
    name: expect.any(String),
  }),
  packageId: expect.objectContaining({
    id: expect.any(String),
    name: expect.any(String),
    price: expect.any(Number),
  }),
  isActive: expect.any(Boolean),
  createdAt: expect.any(String),
};

exports.userPackageSchemaPost = {
  id: expect.any(String),
  userId: expect.any(String),
  packageId: expect.any(String),
  isActive: expect.any(Boolean),
  createdAt: expect.any(String),
};

exports.transactionSchema = {
  id: expect.any(String),
  userId: expect.any(String),
  amount: expect.any(Number),
  transactionMethodId: expect.any(String),
  type: expect.any(String),
  currency: expect.any(String),
  status: expect.any(String),
  createdAt: expect.any(String),
};

exports.transactionMethodSchema = {
  id: expect.any(String),
  name: expect.any(String),
  createdAt: expect.any(String),
};
