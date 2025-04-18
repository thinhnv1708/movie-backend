CREATE TABLE "user" (
    id VARCHAR NOT NULL PRIMARY KEY,
    is_root BOOLEAN NOT NULL,
    activated BOOLEAN NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR,
    last_access INT,
    created_at INT,
    updated_at INT
);
CREATE TABLE "group" (
    id VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    created_at INT,
    updated_at INT
);
CREATE TABLE "policy" (
    id VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    is_default BOOLEAN NOT NULL,
    created_at INT,
    updated_at INT
);
CREATE TABLE "feature" (
    id VARCHAR NOT NULL PRIMARY KEY,
    parent_id VARCHAR,
    name VARCHAR NOT NULL,
    description VARCHAR,
    created_at INT,
    updated_at INT
);
CREATE TABLE "action" (
    id VARCHAR NOT NULL PRIMARY KEY,
    feature_id VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR,
    path VARCHAR NOT NULL,
    method VARCHAR NOT NULL,
    created_at INT,
    updated_at INT,
    CONSTRAINT fk_action_feature_id_feature_id FOREIGN KEY (feature_id) REFERENCES "feature" (id)
);
CREATE TABLE "user_group" (
    user_id VARCHAR NOT NULL,
    group_id VARCHAR NOT NULL,
    UNIQUE (user_id, group_id),
    CONSTRAINT fk_user_group_user_id_user_id FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_group_group_id_group_id FOREIGN KEY (group_id) REFERENCES "group" (id) ON DELETE CASCADE
);
CREATE TABLE "user_policy" (
    user_id VARCHAR NOT NULL,
    policy_id VARCHAR NOT NULL,
    UNIQUE (user_id, policy_id),
    CONSTRAINT fk_user_policy_user_id_user_id FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_policy_policy_id_policy_id FOREIGN KEY (policy_id) REFERENCES "policy" (id) ON DELETE CASCADE
);
CREATE TABLE "policy_action" (
    policy_id VARCHAR NOT NULL,
    action_id VARCHAR NOT NULL,
    UNIQUE (policy_id, action_id),
    CONSTRAINT fk_policy_action_policy_id_policy_id FOREIGN KEY (policy_id) REFERENCES "policy" (id) ON DELETE CASCADE,
    CONSTRAINT fk_policy_action_action_id_action_id FOREIGN KEY (action_id) REFERENCES "action" (id) ON DELETE CASCADE
);
CREATE TABLE "group_policy" (
    group_id VARCHAR NOT NULL,
    policy_id VARCHAR NOT NULL,
    UNIQUE (group_id, policy_id),
    CONSTRAINT fk_group_policy_group_id_group_id FOREIGN KEY (group_id) REFERENCES "group" (id) ON DELETE CASCADE,
    CONSTRAINT fk_group_policy_policy_id_policy_id FOREIGN KEY (policy_id) REFERENCES "policy" (id) ON DELETE CASCADE
);
CREATE TABLE "user_token" (
    id VARCHAR NOT NULL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    token VARCHAR NOT NULL UNIQUE,
    created_at INT,
    expires_at INT,
    CONSTRAINT fk_user_token_user_id_user_id FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
);