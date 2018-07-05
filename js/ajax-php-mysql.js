function ajaxBrowserHacks()
{
    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    }
    else
    {
        // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function contactsListing(selected = '')
{
    var data = [];

    const xhr = ajaxBrowserHacks();

    xhr.onreadystatechange = function() {
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
                    if(selected !== '' && selected === object[index].id)
                    {
                        option.setAttribute('selected', true);
                    }
                    var text = document.createTextNode(object[index].fname + ' ' + object[index].lname);
                    option.appendChild(text);

                    select.appendChild(option);
                }
            }
        }
    };
    xhr.open("GET", "contacts_listing.php", true);
    xhr.send();
}

function contactShow(contact_id)
{
    var data = [];

    var fname = document.getElementById('fname');
    var lname = document.getElementById('lname');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');

    if (contact_id !== '' && contact_id > 0)
    {
        const xhr = ajaxBrowserHacks();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                data = this.responseText;
                var object = JSON.parse(data);

                for (var index in object)
                {
                    fname.value = object[index].fname;
                    lname.value = object[index].lname;
                    phone.value = object[index].phone;
                    email.value = object[index].email;
                }
            }
        };
        xhr.open("GET", "contact_show.php?contact=" + contact_id, true);
        xhr.send();
    }
    else
    {
        fname.value = '';
        lname.value = '';
        phone.value = '';
        email.value = '';
    }
}

function contactUpdate()
{
    var id = document.getElementById('contact').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    if(fname !== '' && lname !== '' && phone !== '' && email !== '' && id > 0)
    {
        const data =  new FormData();
        data.append("id", id);
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("phone", phone);
        data.append("email", email);

        const xhr = ajaxBrowserHacks();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                var select = document.getElementById('contact');

                while (select.firstChild)
                {
                    select.removeChild(select.firstChild);
                }

                var option = document.createElement('option');
                option.setAttribute('value', 0);
                var text = document.createTextNode('-- Select Contact --');
                option.appendChild(text);
                select.appendChild(option);

                contactsListing(id);

                alert(this.responseText);
            }
        };
        xhr.open('POST', 'contact_update.php', true);
        xhr.send(data);
    }
    else if (id == 0)
    {
        alert('No contact selected!!');
    }
    else
    {
        alert('All fields must be refilled');
    }
}

function contactStore()
{
    var id = document.getElementById('contact').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;


    if(fname !== '' && lname !== '' && phone !== '' && email !== '' && id == 0)
    {
        const data =  new FormData();
        data.append("fname", fname);
        data.append("lname", lname);
        data.append("phone", phone);
        data.append("email", email);

        const xhr = ajaxBrowserHacks();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                // get response data
                var object = JSON.parse(this.responseText);

                var select = document.getElementById('contact');

                while (select.firstChild)
                {
                    select.removeChild(select.firstChild);
                }

                // create default option
                var option = document.createElement('option');
                option.setAttribute('value', 0);
                var text = document.createTextNode('-- Select Contact --');
                option.appendChild(text);
                select.appendChild(option);

                // update listing
                var id = object.id;
                contactsListing(id.toString());

                alert(object.message);
            }
        };
        xhr.open('POST', 'contact_store.php', true);
        xhr.send(data);
    }
    else if (id > 0)
    {
        alert('Contact exists already!!');
    }
    else
    {
        alert('All fields must be refilled!!');
    }
}

function contactDestroy()
{
    var id = document.getElementById('contact').value;

    if(id > 0)
    {
        const xhr = ajaxBrowserHacks();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                // receive response from server
                var object = JSON.parse(this.responseText);

                var select = document.getElementById('contact');

                while (select.firstChild)
                {
                    select.removeChild(select.firstChild);
                }

                // create default option
                var option = document.createElement('option');
                option.setAttribute('value', 0);
                var text = document.createTextNode('-- Select Contact --');
                option.appendChild(text);
                select.appendChild(option);

                // update listing
                contactsListing('0');

                document.getElementById('fname').value = '';
                document.getElementById('lname').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('email').value = '';

                alert(object.message);
            }
        };
        xhr.open("GET", "contact_destroy.php?contact=" + id, true);
        xhr.send();
    }
    else
    {
        alert('No contact selected!');
    }
}
