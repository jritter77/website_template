import { Login } from "../components/login.js";

function Admin() {
    const app = document.getElementById('app');


    const token = sessionStorage.getItem('token');
    
    if (!token) {
        Login();
    }
    else {
        app.innerHTML = `
            <div class="row">
                <div 
                class="col  border border-primary rounded" 
                style="margin:5vw; padding-top:2vw;"
                >
                    <h2 class='text-center'>Content Tools</h2>
                    <ul style='margin:2vw;'>
                        <li><a href='#catalog'>Manage Articles</a></li>
                        <li><a href='#'>Create News Post</a></li>
                        <li><a href='#'>Manage Events</a></li>
                    </ul>
                    
                </div>
                <div 
                class="col  border border-primary rounded" 
                style="margin:5vw; padding-top:2vw;"
                >
                    <h2 class='text-center'>Site Management</h2>
                    <ul style='margin:2vw;'>
                        <li><a href='#'>Change Password</a></li>
                        <li><a href='#'>Limit Access</a></li>
                        <li><a href='#'>Testing</a></li>
                    </ul>
                    
                </div>
            </div>
            <div class='row'>
                <div 
                class="col  border border-primary rounded" 
                style="margin:5vw; padding-top:2vw;"
                >
                    <h2 class='text-center'>Site Statistics</h2>
                    <div class='row'>
                        <div class='col'><p>Site Status: OK</p></div>
                        <div class='col'><p>Traffic This Month: xxxx</p></div>
                        <div class='col'><p>Uptime: xx:xx:xx</p></div>
                    </div>
                    
                </div>
            </div>
            `;
    }
    
}

export {Admin}