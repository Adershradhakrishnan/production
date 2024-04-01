exports.setpassword = function (name,email,randompassword){
    return new Promise(async(resolve,reject)=>{
        try{
            let template = `
            
            <html lang="en" style="box-sizing: border-box;">
            <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>password</title>
             <style>
               body {
                   margin:0;
                   padding:0;
                   background-color: #00ffff;
             }

             .container {
                max-width:600px;
                margin: 0 auto;
                padding: 20px;
                background-color:#ffffff;
                border-radius: 8px;
             }
             .header {
                text-align: center;
                margin-bottom: 20px;
             }
             .header h2 {
                color: #333333;
             }
             

             .content {
                color:#666666;
                line-height:1.6;
             }
             label{
               color: #E5330F
             }
             .password {
                font-weight:bold;
                color:#008000;
             }
             </style>
             </head>
             <body>
             <div class="container">
             <div class="header">
             <h2>Password</h2>
             </div>
             <div class="content">
             <p>Name <strong>${name}</strong>,</p>
             <p> Your email<strong>${email}</p>
             <p class="password"><label>${randompassword}</label></p>
             </div>

             </div>
             </body>
             </html>
            `;
            resolve(template);
        }

        catch (error) {
            reject(error);
        }
    })
};