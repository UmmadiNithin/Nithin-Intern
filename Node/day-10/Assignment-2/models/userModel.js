exports.registerUser = async (username, password, email, phone_no, address, department, institution) => {
    try {
  
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
  
      if (existingUser.rows.length > 0) {
        throw new Error('Username already exists');
      }
  
      const result = await pool.query(
        'INSERT INTO users (username, password, email, phone_no, address, department, institution) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [username, password, email, phone_no, address, department, institution]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error registering user in DB:', error);
      throw error;
    }
  };
  
  
  exports.findUserByUsername = async (username) => {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  };
  
  
  exports.findUserById = async (id) => {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  };
  
  
  exports.updateUser = async (id, email, phone_no, address, department, institution) => {
    try {
      const result = await pool.query(
        'UPDATE users SET email = $2, phone_no = $3, address = $4, department = $5, institution = $6 WHERE id = $1 RETURNING *',
        [id, email, phone_no, address, department, institution]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user in DB:', error);
      throw error;
    }
  };