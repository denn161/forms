'use strict';
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');

    form.addEventListener('submit', formSend)
    
    function formSend(e) {
    e.preventDefault();
        const error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);
        
        if (error === 0) {
            form.classList.add('_sending');
            setTimeout(function () {
                form.classList.remove('_sending');
                formPreview.innerHTML = '';
                form.reset();
              	form.classList.remove('_sending');
            },2000)
            // let response = await fetch('sendmail.php', {
            //     method: 'POST',
            //     body: formData,                
            // });

            // if (response.ok) {
            //     let result = await response.json();
            //     alert(result.message);
            //     formPreview.innerHTML = '';
            //     form.reset();
            //   	form.classList.remove('_sending');
            // }
           
			
			            
        }
        else {
				
            alert('Заполните нужные поля');
            form.classList.remove('_sending');
        }       


    }    
    function formValidate(form) {
        let error = 0;
        let formReg = document.querySelectorAll('._reg');
       for (let index = 0; index < formReg.length; index++) {
			const input = formReg[index];
           formRemoveError(input);           
           if (input.classList.contains('_name')) {
               if (nameTest(input)) {
                   formAddError(input);
                   error++;
               }
           }
            else if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
               }                
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                formAddError(input);
                error++;
            }
                
            }
        }
         return error;

    }

    /**
     * Функция теста инпута
     * @param {} input 
     * @returns 
     */
    function emailTest(input) {
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
        return !regex.test(input.value);
    }

      function nameTest(input) {
          const regex = /^[a-zа-яёЁ'\s]{3,20}$/gi;
          return !regex.test(input.value);
    }  

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')        
    }

     function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
        
    }    
	//Получаем инпут file в переменную
    const formImage = document.getElementById('inputImage');
    //Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview');
    formImage.addEventListener('change', function () {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        	// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
        }
        // проверим размер файла (<2 Мб)
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
        }
        
        let reader = new FileReader();
		    reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
    }

});




