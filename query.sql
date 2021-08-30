SELECT department.name, roles.id, roles.title roles.salary,  
FROM department 
INNER JOIN roles 
ON roles.department_id = department.id