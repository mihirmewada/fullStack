const getConnection = require("../config/db");

const addTutorial = async (title, description, published) => {
    const connection = await getConnection();
    published = published ? published : false
    var createdAt = new Date();
    return connection.execute(
        "INSERT INTO tutorials (title,description,published,createdAt,updatedAt) values (?,?,?,?,?)",
        [title, description, published, createdAt, createdAt]
    );
};

const insertUser = async (id, email, password) => {
    const connection = await getConnection();

    var createdAt = new Date();
    return connection.execute(
        "INSERT INTO users (username,email,password,createdAt,updatedAt) values (?,?,?,?,?)",
        [id, email, password, createdAt, createdAt]
    );
};

const insertRoles = async (id) => {
    const connection = await getConnection();

    var createdAt = new Date();
    var role = 1;
    return connection.execute(
        "INSERT INTO user_roles (createdAt,updatedAt,userId,roleId) values (?,?,?,?)",
        [createdAt, createdAt, id, role]
    );
};

const getAllTutorials = async (title) => {
    const connection = await getConnection();

    if (title) {
        return connection.execute(
            `select e.id,e.title,e.description ,e.published from tutorials e where e.title LIKE '%${title}%'`
        );
    } else {
        return connection.execute(
            `select e.id,e.title,e.description ,e.published from tutorials e `
        );
    }
};

const getUser = async (id) => {
    const connection = await getConnection();
    return connection.execute(
        "select e.id,e.username,e.email ,e.password from users e where e.id=?",
        [id]
    );
};

const getTutorial = async (id) => {
    const connection = await getConnection();
    return connection.execute(
        "select e.id,e.title,e.description ,e.published from tutorials e where e.id=?",
        [id]
    );
};

const updateAddress = async (id, address) => {
    const connection = await getConnection();
    return connection.execute("update employee set address=? where id=?", [
        address,
        id,
    ]);
};

const deleteEmployee = async (id) => {
    const connection = await getConnection();
    return connection.execute("delete from employee where id=?", [id]);
};

const getAllDepartments = async () => {
    const connection = await getConnection();
    return connection.execute("select id,name from department");
};

module.exports = {
    addTutorial,
    getAllTutorials,
    getTutorial,
    updateAddress,
    deleteEmployee,
    getAllDepartments,
    insertUser,
    getUser,
    insertRoles
};