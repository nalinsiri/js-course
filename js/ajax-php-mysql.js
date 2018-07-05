function contactsListing()
{
    var data = [];

    if (window.XMLHttpRequest) 
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } 
    else 
    {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            data = this.responseText;
            var object = JSON.parse(data);

            if(object.length > 0)
            {
                var select = document.getElementById('contact');
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
    xmlhttp.open("GET", "contacts_listing.php", true);
    xmlhttp.send();
}

function contactShow(contact_id)
{
    var data = [];
    if (contact_id !== '')
    {
        if (window.XMLHttpRequest) 
        {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } 
        else 
        {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

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
        xmlhttp.open("GET", "contact_show.php?contact=" + contact_id, true);
        xmlhttp.send();
    }
}

function contactUpdate()
{
    var id = document.getElementById('contact').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    if(fname !== '' && lname !== '' && phone !== '' && email !== '' && id !== '')
    {
        const data =  new FormData();
        data.append("id", id);
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("phone", phone);
        data.append("email", email);

        if (window.XMLHttpRequest) 
        {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            const xhr = new XMLHttpRequest();
        } 
        else 
        {
            // code for IE6, IE5
            const xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                var select = document.getElementById('contact');

                while (select.firstChild)
                {
                    select.removeChild(select.firstChild);
                }

                var option = document.createElement('option');
                var text = document.createTextNode('-- Select Contact --');
                option.appendChild(text);
                select.appendChild(option);

                contactsListing();
            }
        };
        xhr.open('POST', 'contact_update.php', true);
        xhr.send(data);
    }
}
