var itemNames = ['item[]', 'description[]', 'quantity[]', 'item_price[]', 'sum_price[]'];
var index = 1;
var table1 = 'items';

//this function will create one more item row with its input columns
function addItem(names, tableId)
{
    var itemRow = document.createElement('tr');
    itemRow.setAttribute('id', index);

    for (var i = 0; i < names.length; i++)
    {
        var itemInput = document.createElement('input');
        itemInput.setAttribute('class', 'box-effects h-center');
        itemInput.setAttribute('type', 'text');
        itemInput.setAttribute('name', names[i]);

        if(names[i] == 'quantity[]' || names[i] == 'item_price[]')
        {
            itemInput.setAttribute('onkeyup', 'calculate()');
        }

        if(i == (names.length - 1))
        {
            itemInput.setAttribute('disabled', true);
        }

        var itemColumn = document.createElement('td');
        itemColumn.appendChild(itemInput);
        itemRow.appendChild(itemColumn);
    }

    // create delete column
    var deleteColumn = document.createElement('td');
    deleteColumn.setAttribute('class', 'h-center');
    // create delete icon
    var deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fas fa-minus-square');
    deleteIcon.setAttribute('onclick', 'removeItem(' + index + ')');
    // append icon to column
    deleteColumn.appendChild(deleteIcon);
    // append "delete" column to table row
    itemRow.appendChild(deleteColumn);

    document.getElementById(tableId).appendChild(itemRow);

    index++;
}

function removeItem(index)
{
    document.getElementById(index).remove();
    calculate();
}

// this will calculate the sum price and total
function calculate()
{
    var quantities = document.getElementsByName('quantity[]');
    var itemPrices = document.getElementsByName('item_price[]');
    var result;
    var total = 0;

    for (var i = 0; i < quantities.length; i++)
    {
        result = quantities[i].value * itemPrices[i].value;
        document.getElementsByName('sum_price[]')[i].setAttribute('value', result);

        total += result;
    }

    document.getElementById('result').innerHTML = total;
}