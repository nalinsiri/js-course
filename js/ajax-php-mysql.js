function employeesListing()
{
    var data = [];

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            data = this.responseText;
            var object = JSON.parse(data);

            if(object.length > 0)
            {
                var select = document.getElementById('employee');
                for (var index in object)
                {
                    var option = document.createElement('option');
                    option.setAttribute('value', object[index].id);
                    var text = document.createTextNode(object[index].fname + ' ' + object[index].lname);
                    option.appendChild(text);

                    select.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("GET", "employees_listing.php", true);
    xmlhttp.send();
}

function employeeShow(employee_id)
{
    var data = [];
    if (employee_id !== '')
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                data = this.responseText;
                var object = JSON.parse(data);

                for (var index in object)
                {
                    document.getElementById('fname').value = object[index].fname;
                    document.getElementById('lname').value = object[index].lname;
                    document.getElementById('phone').value = object[index].phone;
                    document.getElementById('email').value = object[index].email;
                }
            }
        };
        xmlhttp.open("GET", "employee_show.php?employee=" + employee_id, true);
        xmlhttp.send();
    }
}

function employeeUpdate()
{
    var id = document.getElementById('employee').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    if(fname !== '' && lname !== '' && phone !== '' && email !== '')
    {
        const data =  new FormData();
        data.append("id", document.getElementById('employee').value);
        data.append("fname", document.getElementById('fname').value);
        data.append("lname", document.getElementById('lname').value);
        data.append("phone", document.getElementById('phone').value);
        data.append("email", document.getElementById('email').value);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                var select = document.getElementById('employee');

                while (select.firstChild)
                {
                    select.removeChild(select.firstChild);
                }

                var option = document.createElement('option');
                var text = document.createTextNode('-- Select Employee --');
                option.appendChild(text);
                select.appendChild(option);

                employeesListing();
            }
        };
        xhr.open('POST', 'employee_update.php', true);
        xhr.send(data);
    }
}
