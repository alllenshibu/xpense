const { pool } = require('../config/postgres.config.js'); ///  accepted 0  pending 1 notfriends 2 incRequest 3
const getUserId = async (username) => {
    console.log(username)
    const res =  await pool.query('SELECT user_id FROM users WHERE username = $1;', [username])
    if(res.rowCount > 0)
    {
    console.log('User ID: ' + res.rows[0].user_id);
    return res.rows[0].user_id;

}
return false;
};

const sendFriendRequest = async (sender, reciever) => {
  const sender_id = await getUserId(sender);
  const reciever_id = await getUserId(reciever);

  const exists = await pool
    .query('SELECT * FROM friend_requests WHERE fr_sender = $1 AND fr_reciever = $2;', [reciever_id, sender_id])
    .then((response) => {
      return response.rows.length > 0;
    });
  if (exists) {
    await pool.query('DELETE FROM friend_requests WHERE fr_sender = $1 AND fr_reciever = $2;', [
      reciever_id,
      sender_id,
    ]);
    await pool.query('INSERT INTO friends (frnd_sender , frnd_reciever ) VALUES ($1 , $2 );', [reciever_id, sender_id]);
  } else
    await pool.query('INSERT INTO friend_requests (fr_sender , fr_reciever , fr_status) VALUES ($1 , $2 , $3);', [
      sender_id,
      reciever_id,
      1,
    ]);
};

const canelFriendRequest = async (sender, reciever) => {
  const sender_id = await getUserId(sender);
  const reciever_id = await getUserId(reciever);

  await pool.query(
    'DELETE FROM friend_requests WHERE (fr_sender = $1 AND fr_reciever = $2) OR (fr_reciever = $1 AND fr_sender = $2) ;',
    [reciever_id, sender_id]
  );
};

const unfriend = async (sender, reciever) => {
  const sender_id = await getUserId(sender);
  const reciever_id = await getUserId(reciever);

  await pool.query(
    'DELETE FROM friends WHERE (frnd_sender = $1 AND frnd_reciever = $2) OR (frnd_sender = $2 AND frnd_reciever = $1);',
    [reciever_id, sender_id]
  );
};

const getStatus = async (sender, reciever) => {
  const sender_id = await getUserId(sender);
  const reciever_id = await getUserId(reciever);

  const frnd = await pool
    .query(
      'SELECT * FROM friends WHERE (frnd_sender = $1 AND frnd_reciever = $2 ) OR (frnd_sender = $2 AND frnd_reciever = $1 );',
      [sender_id, reciever_id]
    )
    .then((response) => {
      return response.rowCount > 0;
    });
  if (frnd) return 'f';

  const status = await pool
    .query('SELECT fr_status FROM friend_requests WHERE fr_sender = $1 AND fr_reciever = $2;', [sender_id, reciever_id])
    .then(async (response) => {
      if (response.rowCount == 0) {
        const st = await pool
          .query('SELECT fr_status FROM friend_requests WHERE fr_sender = $1 AND fr_reciever = $2;', [
            reciever_id,
            sender_id,
          ])
          .then((response) => {
            if (response.rowCount == 0) return 2;
            if (response.rows[0].fr_status == 1) return 3;
            return response.rows[0].fr_status;
          });
        return st;
      }
      return response.rows[0].fr_status;
    });
  switch (status) {
    case 1:
      return 'p';  // pending
    case 2:
      return 'n';  // not friends
    case 3:
      return 'r';  // 
    case 4:
      return 'b';  
    default:
      return 'n';
  }
};



const getFriends = async (username) => {
  const user_id = await getUserId(username);

  const recievers = await pool
    .query(
      'SELECT friends.f_owe AS owes ,friends.frnd_reciever AS frnd_id, users.username AS username FROM friends JOIN users ON friends.frnd_reciever = users.user_id WHERE frnd_sender = $1 ;',
      [user_id]
    )
    .then((response) => {
      return response.rows;
    });

  const senders = await pool
    .query(
      'SELECT friends.f_owe AS owes ,friends.frnd_sender AS frnd_id, users.username AS username  FROM friends JOIN users on friends.frnd_sender = users.user_id WHERE frnd_reciever = $1 ;',
      [user_id]
    )
    .then((response) => {
      return response.rows;
    });

  senders.map((sender) => {
    sender.owes = -sender.owes;
  });
  const friends = recievers.concat(senders);
  return friends;
};

const isFriend = async (sender_id, reciever_id) => {
  const isfrnd = await pool
    .query(
      'SELECT * FROM friends WHERE (frnd_sender = $1 AND frnd_reciever = $2 ) OR (frnd_sender = $2 AND frnd_reciever = $1 );',
      [sender_id, reciever_id]
    )
    .then((response) => {
      return response.rowCount > 0;
    });
  return isfrnd;
};

const getRequests = async (username) => {
  try{const user_id = await getUserId(username);
  const incoming = await pool.query('SELECT * FROM friend_requests INNER JOIN (SELECT username as name , user_id as id FROM users) AS sender ON friend_requests.fr_sender = sender.id WHERE fr_reciever = $1;', [
    user_id,
  ]);
  const outgoing = await pool.query('SELECT * FROM friend_requests INNER JOIN (SELECT username AS name  , user_id as id FROM users) AS reciever ON friend_requests.fr_reciever = reciever.id WHERE fr_sender = $1;', [ 
    user_id,
  ]);

  console.log("incoming ", incoming.rows)
  console.log("outgoing ", outgoing.rows)

  return { incoming: incoming.rows, outgoing: outgoing.rows };}
  catch(err){
    return false;
  }

};

module.exports = { getUserId, sendFriendRequest, canelFriendRequest, unfriend, getStatus, getFriends, isFriend , getRequests };
