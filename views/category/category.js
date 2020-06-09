// var table = $('#category').DataTable();

// $('#category tbody').on('click', 'tr', function () {
//     var rowData = table.row(this).data();
//     console.log(rowData);
//     var temp = table.row(this).data();
//     temp[1] = 'Tom';
//     table.row(1).data(temp).draw();
// });


$('#categorycancle').on('click', function () {
    $('#addcategory').collapse('toggle');
})

$('#categorysubmit').on('click', function () {
    var url = '/category/create/category';
    var data = {
        CategoryName: $('#categoryname').val()
    }
    var method = 'POST'
    saveOnAjax(url, data, method)
        .done((result) => {
            $('#parentcategory').append(`<option value="${result.CategoryID}">${result.CategoryName}</option>`);
            var ct = $('#category').DataTable();
            var d = new Date()
            ct.row.add([
                ct.data().length + 1,
                data.CategoryName,
                `${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`,
                `<a class="nav-link"><i class="fas fa-edit"></i></a>`
            ]).draw(false);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus + ': ' + errorThrown);
            alert('Somthing went wrong')
        })
})


$('#subcategorycancle').on('click', function () {
    $('#addsubcategory').collapse('toggle');
})

$('#subcategorysubmit').on('click', function () {
    var url = '/category/create/subcategory';
    var data = {
        SubCategoryName: $('#subcategoryname').val(),
        CategoryID: $('#parentcategory').val()
    }
    var method = 'POST'
    saveOnAjax(url, data, method)
        .done((result) => {
            console.log()
            var sct = $('#subcategory').DataTable();
            var d = new Date()
            sct.row.add([
                sct.data().length + 1,
                data.SubCategoryName,
                $("#parentcategory option:selected").text(),
                `${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`,
                `<a class="nav-link"><i class="fas fa-edit"></i></a>`
            ]).draw(false);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus + ': ' + errorThrown);
            alert('Somthing went wrong')
        })
})





var paramId = ''
function editCategory(category) {
    console.log(category);
    $('#editcategoryname').val(category.CategoryName)
    paramId = category.CategoryID
    $('#editcategorymodal').modal('toggle')
}


function editSubCategory(subcategory) {
    console.log(subcategory);
    $('#editsubcategoryname').val(subcategory.SubCategoryName)
    $('#editparentcategory').val(subcategory.CategoryID)
    paramId = subcategory.SubCategoryID
    $('#editsubcategorymodal').modal('toggle')

}


$('#editcategorysubmit').on('click', function () {
    var url = '/category/update/category/' + paramId;
    var data = {
        CategoryName: $('#editcategoryname').val()
    }
    var method = 'POST'
    saveOnAjax(url, data, method)
        .done((result) => {
            console.log(result);
            $('#editcategorymodal').modal('toggle');
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus + ': ' + errorThrown);
            alert('Somthing went wrong')
        })
})


$('#editsubcategorysubmit').on('click', function () {
    var url = '/category/update/subcategory/' + paramId;
    var data = {
        SubCategoryName: $('#editsubcategoryname').val(),
        CategoryID: $('#editparentcategory').val()
    }
    var method = 'POST'
    saveOnAjax(url, data, method)
        .done((result) => {
            console.log(result);
            $('#editsubcategorymodal').modal('toggle')

        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus + ': ' + errorThrown);
            alert('Somthing went wrong')
        })
})






function saveOnAjax(url, data, method) {
    console.log(url);
    return $.ajax({
        url: url,
        type: method,
        data: data
    })
}




