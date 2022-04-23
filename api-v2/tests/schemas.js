exports.taskSchema = {
  title: expect.any(String),
  description: expect.any(String),
  date: expect.any(String),
  status: expect.any(String),
  assignedTo: expect.any(String),
  createdAt: expect.any(String),
  owner: expect.any(String),
};

exports.userSchema = {
  name: expect.any(String),
  email: expect.any(String),
  createdAt: expect.any(String),
};

exports.adminSchema = {
  canRead: expect.any(Boolean),
  canWrite: expect.any(Boolean),
  canAddAdmin: expect.any(Boolean),
  canRemoveAdmin: expect.any(Boolean),
  owner: expect.any(String),
};
