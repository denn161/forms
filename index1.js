const inputs = document.querySelectorAll('input');

const pattern = {
    telephone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    username: /^[a-zа-я\d]{5,12}$/gi,
    password: /^[\w@?-?#?]{8,20}$/,
    slug: /^[a-z\d-?]{7,20}$/,
    email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
     
};
function validate(filed, regex) {
    if (regex.test(filed.value)) {
        filed.className = 'valid';
       
    }
    else if (filed.value == "") {
        filed.classList.remove(filed.className);
    }
    else {
        filed.className='invalid';
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        validate(e.target,pattern[e.target.getAttribute('name')]);
    })
    

})