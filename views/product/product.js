
    $('#new-product').click(function () {
        $("#product-form").attr('action', '/product/save');
        $('input').val('');
        $('#avatar').attr('src','/images/noimage.jpg')
    })

    $('.add-new-product').submit(function (e) {
        e.preventDefault();
        var data = {
            name: $('#name').val(),
            price: $('#price').val(),
            skuid: $('#skuid').val(),
            category: $('#category').val(),
            subcategory: $('#subcategory').val(),
            color: $('#color').val(),
            munit: $('#munit').val(),
            weight: $('#weight').val(),
            stock: $('#stock').val(),
            sdesc: $('#sdesc').val(),
            lgdesc: $('#lgdesc').val(),
        }

        $(this).ajaxSubmit({
            data: data,
            contentType: 'application/json',
            success: function (response) {
                console.log('image uploaded and form submitted');
                // $('#product-table tr:last').after(`<tr><th scope="row"><%= products.length+1%></th>
                //     <td><img src="" alt="Image"></td>
                //     <td>${data.name}</td>
                //     <td>554ds-</td>
                //     <td>${data.price}</td>
                //     <td>${data.weight}</td>
                //     <td><%= date.format(new Date(),'DD MMM YY')%><br><%= date.format(new Date(),'DD MMM YY')%></td>
                //     <td>${data.stock}</td>
                //     </tr>`
                // );
                // $('#addProductModal').modal('toggle')
                location.href = "/product/list"

            }
        });
        return false;
    });


    // function edit(id) {
    //     $("#product-form").attr('action', '/product/update/' + id);
    //     // $("#product-form").attr('method', 'POST');
    //     $.ajax({
    //         url: '/product/edit/' + id,
    //         type: 'GET',
    //         contentType: 'application/json',
    //         cache: false,
    //         success: function (product) {
    //             $('#name').val(product.ProductName);
    //             $('#price').val(product.ProductPrice);
    //             $('#skuid').val(product.ProductSKU);
    //             $('#category').val(product.ProductCategoryID);
    //             $('#subcategory').val(product.ProductSubCategoryID);
    //             $('#color').val(product.ProductColorOptions);
    //             $('#munit').val(product.ProductMeasurmentUnit);
    //             $('#weight').val(product.ProductWeight);
    //             $('#stock').val(product.ProductStock);
    //             $('#sdesc').val(product.ProductShortDesc);
    //             $('#lgdesc').val(product.ProductLongDesc);
    //             $('#product-image').attr('src', product.ProductThumb.split('public').pop(1))
    //             $('#avatar').attr('src', product.ProductThumb.split('public').pop(1))
    //         }
    //     })

    //     $('#addProductModal').modal('toggle')

    // }

    // $('#save-product').click(async function () {
    //     var data = {
    //         name: $('#name').val(),
    //         price: $('#price').val(),
    //         category: $('#category').val(),
    //         weight: $('#weight').val(),
    //         stock: $('#stock').val(),
    //         sdesc: $('#sdesc').val(),
    //         lgdesc: $('#lgdesc').val(),
    //         isLive: $('isLive').val(),
    //         image: $('productImage').val()
    //     }
    //     var url = '/product/save'
    //     var type = 'POST'
    //     var status = await ajaxRequest(url, type, data)
    //     console.log(status);
    //     if (status === 'success') {
    //         $('#product-table tr:last').after(
    //             `<td><img src="${data.image.split('public').pop(1)}" alt="Image"></td>
    //         <td>${data.name}</td>
    //         <td>554ds-</td>
    //         <td>${data.price}</td>
    //         <td>${data.weight}</td>
    //         <td><%= date.format(new Date(),'DD MMM YY')%><br><%= date.format(new Date(),'DD MMM YY')%></td>
    //         <td>${data.stock}</td>
    //         </tr>`
    //         );
    //         // $('#addProductModal').modal('toggle')
    //         location.href = "/product/list"

    //     }

    // });

    // function ajaxRequest(url, type, data) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             // url: url,
    //             type: type,
    //             contentType: 'application/json',
    //             cache: false,
    //             data: data,
    //             success: function () {
    //                 alert('Your submission was successful');
    //                 resolve('success');
    //             },
    //             error: function (data) {
    //                 reject('fail')
    //                 // $('#error-group').css('display', 'block');
    //                 // var errors = JSON.parse(data.responseText);
    //                 alert(JSON.stringify(data))
    //                 // var errorsContainer = $('#errors');
    //                 // errorsContainer.innerHTML = '';
    //                 // var errorsList = '';

    //                 // for (var i = 0; i < errors.length; i++) {
    //                 //     errorsList += '<li>' + errors[i].msg + '</li>';
    //                 // }
    //                 // errorsContainer.html(errorsList);
    //             }
    //         });
    //     })

    // }

    window.addEventListener('DOMContentLoaded', function () {
        var avatar = document.getElementById('avatar');
        var image = document.getElementById('image');
        var input = document.getElementById('input');
        var $progress = $('.progress');
        var $progressBar = $('.progress-bar');
        var $alert = $('.alert');
        var $modal = $('#crop-image-modal');
        var cropper;
        $progress.hide()
        $('[data-toggle="tooltip"]').tooltip();

        input.addEventListener('change', function (e) {
            var files = e.target.files;
            var done = function (url) {
                input.value = '';
                image.src = url;
                $alert.hide();
                $modal.modal('toggle');
            };
            var reader;
            var file;
            var url;

            if (files && files.length > 0) {
                file = files[0];

                if (URL) {
                    done(URL.createObjectURL(file));
                } else if (FileReader) {
                    reader = new FileReader();
                    reader.onload = function (e) {
                        done(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        $modal.on('shown.bs.modal', function () {
            cropper = new Cropper(image, {
                autoCropArea: 1,
                ready: function () {
                    //Should set crop box data first here
                    var canvasData = cropper.getCanvasData();
                    var cropBox = cropper.getCropBoxData()
                    cropper.setCropBoxData(cropBox).setCanvasData(canvasData);
                    // cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                }
            });
        }).on('hidden.bs.modal', function () {
            cropper.destroy();
            cropper = null;
        });

        document.getElementById('crop').addEventListener('click', function () {
            var initialAvatarURL;
            var canvas;
            $modal.modal('toggle');
            if (cropper) {
                canvas = cropper.getCroppedCanvas({
                    width: 160,
                    height: 160,
                });
                initialAvatarURL = avatar.src;
                avatar.src = canvas.toDataURL();
                $progress.show();
                $alert.removeClass('alert-success alert-warning');
                canvas.toBlob(function (blob) {
                    var formData = new FormData();
                    formData.name = 'Abhishek'
                    formData.append('imagename', blob, 'imagename.jpg');
                    $.ajax('/product/image', {
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        xhr: function () {
                            var xhr = new XMLHttpRequest();

                            xhr.upload.onprogress = function (e) {
                                var percent = '0';
                                var percentage = '0%';

                                if (e.lengthComputable) {
                                    percent = Math.round((e.loaded / e.total) * 100);
                                    percentage = percent + '%';
                                    $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                                }
                            };
                            return xhr;
                        },
                        success: function (data) {
                            console.log(data);
                            $('#productImage').val(data.imagePath)
                            $alert.show().addClass('alert-success').text('Upload success');
                        },
                        error: function () {
                            avatar.src = initialAvatarURL;
                            $alert.show().addClass('alert-warning').text('Upload error');
                        },
                        complete: function () {
                            $progress.hide();
                        },
                    });
                });
            }
        });
    });

