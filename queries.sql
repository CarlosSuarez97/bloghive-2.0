--USER INFO TABLE CREATION QUERY--

CREATE TABLE user_info (
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    user_id SERIAL PRIMARY KEY
)

--POST INFO TABLE CREATION QUERY--

CREATE TABLE post_info (
    post_title VARCHAR(150) NOT NULL,
    post_content VARCHAR(500),
    post_date DATE,
    post_id SERIAL PRIMARY KEY,
    post_user_id INTEGER REFERENCES user_info(user_id)
)

--POST INSERTION--
INSERT INTO post_info (post_title, post_content, post_date, post_user_id) VALUES ($1, $2, $3, $4)