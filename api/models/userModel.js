const pool = require("../dbConnection");
const bcrypt = require("bcryptjs");
const { createNotification } = require("./notificationModel");

module.exports = {
  createUser: async (data, callback) => {
    if (
      data.fullname == undefined ||
      data.phonenumber == undefined ||
      data.password == undefined ||
      data.address == undefined
    ) {
      return callback("please send data with along correct attribute");
    }

    var queryStatment = `insert into users(fullname,phonenumber,password,address ) values(?,?,?,?)`;

    var salt = bcrypt.genSaltSync(10);

    var encryptedPassword = bcrypt.hashSync(data.password, salt);

    var values = [
      data.fullname,
      data.phonenumber,
      encryptedPassword,
      data.address,
    ];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            return callback("you are already registered");
          } else {
            return callback(error);
          }
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  login: async (data, callback) => {
    if (data.phonenumber == undefined || data.password == undefined) {
      return callback("please send data with along correct attribute");
    }
    var type = null;
    if (data.type == undefined || data.type == "user") {
      type = "user";
    } else if (data.type == "admin") {
      type = "admin";
    }
    var queryStatment = `select * from users where phonenumber=? and status=0 and role=?`;

    var values = [(phonenumber = data.phonenumber), (role = type)];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          console.log(error);
          return callback(error);
        } else if (result == "") {
          return callback("incorrect username or password");
        } else {
          var status = bcrypt.compareSync(data.password, result[0].password);

          if (status) {
            result[0].password = "";
            if (result[0].coverimage == "") {
            } else {
              result[0].coverimage =
                process.env.APP_HOST + "/user/images/" + result[0].coverimage;
            }

            result[0].profileimage =
              process.env.APP_HOST + "/user/images/" + result[0].profileimage;
            return callback(null, result);
          } else {
            return callback("incorrect username or password");
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  checkStatusOfuser: async (data, callback) => {
    var userid = null;
    if (data.follower != undefined) {
      userid = data.follower;
    } else if (data.userid != undefined) {
      userid = data.userid;
    }

    if (userid == null) {
      return callback("please send data with along correct attributeffff");
    }
    var queryStatment = `select * from users where userid=? and status=0`;

    var values = [userid];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else if (result == "") {
          return callback("access denied! deactivated user");
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  changePassword: async (data, callback) => {
    if (
      data.password == undefined ||
      data.phonenumber == undefined ||
      data.newpassword == undefined
    ) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `select * from users where phonenumber=?`;

    var values = [(phonenumber = data.phonenumber)];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else if (result == "") {
          return callback("incorrect username or password");
        } else {
          var status = bcrypt.compareSync(data.password, result[0].password);

          if (status) {
            var queryStatment = `UPDATE users SET password=? WHERE phonenumber=?`;
            var salt = bcrypt.genSaltSync(10);

            var newencryptedPassword = bcrypt.hashSync(data.newpassword, salt);

            var values = [newencryptedPassword, data.phonenumber];

            try {
              pool.query(queryStatment, values, (error, result) => {
                if (error) {
                  return callback(error);
                } else {
                  return callback(null, result);
                }
              });
            } catch (error) {
              console.error(error);
            }
          } else {
            return callback("incorrect username or password");
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  getUserById: async (data, callback) => {
    var queryStatment = `SELECT
        users.userid,
        users.fullname,
        users.phonenumber,
        users.address,
        users.profileimage,
        users.coverimage,
        users.userid,
        users.fullname,
        
        
        COUNT(DISTINCT productid) AS product,
        COUNT(DISTINCT feedid) AS post,
        COUNT(DISTINCT TABLE1.followid) AS following,
        COUNT(DISTINCT TABLE2.followid) AS follower
        
        
        
    FROM users
    LEFT JOIN products ON products.postedby = users.userid
    LEFT JOIN feeds ON feeds.postedby = users.userid
    LEFT JOIN follow AS TABLE1 ON TABLE1.follower = users.userid 
    Left JOIN follow AS TABLE2 ON TABLE2.following=userS.userid
    where users.userid=?
    GROUP BY 1`;
    if (data.userid != undefined) {
      var values = [data.userid];
      var querystatement2 = `SELECT
            users.userid,
            users.fullname,
            users.phonenumber,
            users.address,
            users.profileimage,
            users.coverimage,
            users.userid,
            users.fullname,
         
            
            COUNT(DISTINCT productid) AS product,
            COUNT(DISTINCT feedid) AS post,
            COUNT(DISTINCT TABLE1.followid) AS following,
            COUNT(DISTINCT TABLE2.followid) AS follower,
            coin.balance
            
            
        FROM users
        LEFT JOIN products ON products.postedby = users.userid
        LEFT JOIN feeds ON feeds.postedby = users.userid
        LEFT JOIN follow AS TABLE1 ON TABLE1.follower = users.userid 
        Left JOIN follow AS TABLE2 ON TABLE2.following=userS.userid
        LEFT JOIN ricacoin as coin on users.userid=coin.userid
        where users.userid=?
        GROUP BY 1;`;
      try {
        await pool.query(querystatement2, values, (error, result) => {
          if (error) {
            return callback(error);
          } else {
            if (result == [] || result == "") {
              return callback(null, result[0]);
            } else {
              if (result[0].coverimage == "") {
              } else {
                result[0].coverimage =
                  process.env.APP_HOST + "/user/images/" + result[0].coverimage;
              }
              if (result[0].balance == null) {
                result[0].balance = 0;
              }
              result[0].profileimage =
                process.env.APP_HOST + "/user/images/" + result[0].profileimage;
              return callback(null, result[0]);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else if (data.follower != undefined) {
      if (data.following == undefined) {
        return callback("please send data with along correct attribute");
      }

      var values = [data.following];

      try {
        await pool.query(queryStatment, values, (error, result) => {
          if (error) {
            return callback(error);
          } else {
            if (result[0].coverimage == "") {
            } else {
              result[0].coverimage =
                process.env.APP_HOST + "/user/images/" + result[0].coverimage;
            }
            result[0].profileimage =
              process.env.APP_HOST + "/user/images/" + result[0].profileimage;

            var myObject = {};

            var queryStatment = `SELECT * from follow where follower=? and following=?`;

            var values = [data.follower, data.following];

            try {
              pool.query(queryStatment, values, (error, resultt) => {
                if (error) {
                  console.log(error);
                } else {
                  if (resultt == [] || resultt == "") {
                    myObject = { ...result[0], isfollowing: false };
                    return callback(null, myObject);
                  } else {
                    myObject = { ...result[0], isfollowing: true };
                    return callback(null, myObject);
                  }
                }
              });
            } catch (error) {
              console.error(error);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return callback("please send data with along correct attribute");
    }
  },
  editProfile: async (data, req, callback) => {
    if (
      req.file != undefined &&
      req.file.fieldname != undefined &&
      req.file.fieldname != null &&
      req.file.fieldname != ""
    ) {
      var queryStatment = `UPDATE users SET fullname=?, address=? ,profileimage=? WHERE userid=?`;
      var values = [
        data.fullname,
        data.address,
        req.file.filename,
        data.userid,
      ];
    } else {
      var queryStatment = `UPDATE users SET fullname=?, address=? WHERE userid=?`;
      var values = [data.fullname, data.address, data.userid];
    }

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  uploadCoverPic: async (data, req, callback) => {
    if (data.userid == undefined || req.file == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `UPDATE users SET coverimage=? WHERE userid=?`;

    var values = [req.file.filename, data.userid];
    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  followUser: async (data, callback) => {
    if (data.follower == undefined || data.following == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `INSERT INTO follow SET follower=? ,following=?`;
    var values = [data.follower, data.following];
    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            return callback("You already follwed a user");
          }
          return callback(error);
        } else {
          createNotification(
            {
              touser: data.following,
              sentfrom: data.follower,
              text: `start following you`,
            },
            (error, result) => {
              if (error) {
              } else {
              }
            }
          );
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  unfollowUser: async (data, callback) => {
    if (data.follower == undefined || data.following == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `DELETE FROM  follow WHERE follower=? AND following=?`;
    var values = [data.follower, data.following];
    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  getFollowers: async (data, callback) => {
    if (data.userid == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `SELECT users.fullname,users.profileimage,follow.follower FROM follow INNER JOIN users ON users.userid=follow.follower WHERE following=? `;

    var values = [data.userid];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  getFollowing: async (data, callback) => {
    if (data.userid == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `SELECT users.fullname,users.profileimage,follow.following FROM follow INNER JOIN users ON users.userid=follow.following WHERE follow.follower=?;`;

    var values = [data.userid];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  isFollowing: async (data, callback) => {
    if (data.follower == undefined || data.following == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `SELECT * from follow where follower=? ,following=?`;

    var values = [data.follower, data.following];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          if (result == [] || result == "") {
            return callback(null, false);
          } else {
            return callback(null, true);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  forgotPasswod: async (data, callback) => {},
  suggestedFriend: async (data, callback) => {
    if (data.userid == undefined) {
      return callback("please send data with along correct attribute");
    }
    var queryStatment = `SELECT DISTINCT
    
        u.fullname,
        u.userid,
        u.profileimage,
        u.phonenumber
    FROM follow a
    INNER JOIN follow b
        ON a.following = b.follower
    INNER JOIN users u
        ON u.userid = b.following 
    WHERE a.follower = ? AND
          b.following <> a.follower`;

    var values = [data.userid];

    try {
      await pool.query(queryStatment, values, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].profileimage =
              process.env.APP_HOST + "/user/images/" + result[i].profileimage;
          }
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  getAllusers: async (data, callback) => {
    var queryStatment = `select fullname,userid  from users where role='user'`;

    try {
      await pool.query(queryStatment, (error, result) => {
        if (error) {
          return callback(error);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].profileimage =
              process.env.APP_HOST + "/user/images/" + result[i].profileimage;
          }
          return callback(null, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};
