import { Admin } from '../views/admin.js';
import {post} from '../webRequest.js';

async function handleSubmission(e) {
    e.preventDefault();

    const user = $('#user').val();
    const pass = $('#pass').val();

    const result = JSON.parse(await post('./server/login.php', JSON.stringify({user: user})));

    console.log('response: ', result.pass);

    if (result.pass === pass){
        sessionStorage.setItem('token', 'token123');
        Admin();
    } else {
        if (!$('.alert').length) {
            $('#login').prepend(`<div class='alert alert-danger' role='alert'>Invalid Credentials!</div>`);
        }
    }

    
}

function Login() {
    $('#app').html( `
    <div class='row'>
        
        <div class='col' >
            <form id='login' style='margin:5vw;'>
                <div class='form-group'>
                    <label for='user'>User</label>
                    <input type='text' class='form-control' id='user' placeholder='Enter username'>
                </div>
                <div class='form-group'>
                    <label for='pass'>Password</label>
                    <input type='password' class='form-control' id='pass' placeholder='password'>
                </div>
                <button type='submit' class='btn btn-primary'>Login</button>
            </form>
        </div>
        
    </div>
    `);

    $('#login').on('submit', handleSubmission);
}

export { Login }