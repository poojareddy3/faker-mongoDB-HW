const db = require('./db');
const Employee = require('./models/employee');

const { faker } = require('@faker-js/faker');

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

const findAll = async () => {
    const findAllEmployees = await Employee.find({});
    console.log(findAllEmployees);
}

const createEmployee = async () => {
    const newEmployee = new Employee({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        job_title: faker.name.jobTitle(),
        address: {
            street: faker.address.streetName(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode()
        }
    })
    await newEmployee.save();
    console.log("Created one Employee!")
}

const createManyEmployees = async () => {
    const employees = [...Array(3)].map(employee => (
        {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            job_title: faker.name.jobTitle(),
            address: {
                street: faker.address.streetName(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode()
            }
        }
    ));
    
    await Employee.insertMany(employees);
    console.log("Created Faker Employees!")
}

const updateEmployee = async () => {
    const updateEmp = await Employee.updateOne({ first_name: "Shad"}, { first_name: "Chad" });
    console.log(updateEmp);
}

const deleteEmployee = async () => {
    const deleteEmp = await Employee.deleteOne({first_name: "Betty"});
    console.log(deleteEmp);
  }

  const empFullName = async () => {
    const empFullName = await Employee.find({}, {_id: false, first_name: true, last_name: true});
    for(let i = 0; i < empFullName.length; i++){
    console.log((empFullName[i].first_name) +  ' ' + (empFullName[i].last_name));
    //console.log(fullName[i]);
   //console.log(empFullName);
    }
}

const run = async () => {
    await findAll();
    await createEmployee();
    await createManyEmployees();
    await updateEmployee();
    await deleteEmployee();
    await empFullName();
    db.close();
};

run();