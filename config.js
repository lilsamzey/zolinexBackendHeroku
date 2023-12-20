// const sql = require("mssql/msnodesqlv8");
 const { Connection } = require("tedious");

// const config =  sql.connect( {server: "edno.database.windows.net",
// database: "EdnoSchoolManagementSystem",
// driver: "msnodesqlv8",
// user:"systemadmin",
// password:"Klmn-32553255",
// options: {
//     trustedConnection: true
// }
// })




// const sql = require("mssql");

// async function connectToDatabase() {
//   try {
//     const pool = await sql.connect({
//       server: "edno.database.windows.net",
//       database: "EdnoSchoolManagementSystem",
//       user: "systemadmin", 
//       password: "Klmn-32553255", 
//       options: {
//         encrypt: true,
//       },
//     });

    
//     console.log("Connected to the database successfully!");


//   } catch (err) {
//     console.error("Error connecting to the database:", err.message);
//   }
// }

// // Call the function to connect to the database
// connectToDatabase();




// //Google Cloud

// const sql = require("mssql");

// async function connectToDatabase() {
//   try {
//     const pool = await sql.connect({
//       server: "34.70.34.112",
//       // port: 1433,
//       database: "zolinex",
//       user: "sqlserver", 
//       password: "Klmn-32553255", 
//       options: {
//         encrypt: true,
//         trustServerCertificate: true,
//       },
//     });

    
//     console.log("Connected to the database successfully!");


//   } catch (err) {
//     console.error("Error connecting to the database:", err.message);
//   }
// }

// // Call the function to connect to the database
// connectToDatabase();

























 //HETZNER SQL

 const sql = require('mssql');

 async function connectToDatabase() {
   try {
     const config = {
       user: 'sa',
       password: 'Sami-32553255',
       server: '167.235.134.170',
       database: 'coursemanagementsystem',
       options: {
          encrypt: true,
          trustServerCertificate: true,
      }
     };

     const pool = await sql.connect(config); // Bağlantıyı 'pool' değişkenine atayın

     console.log('Connected to the AWS database successfully!');

     // Keep alive database
     setInterval(async () => {
       try {
         const result = await pool.request().query('SELECT 1');
         console.log('Keep-alive is successful.');
       } catch (error) {
         console.error('Keep-alive error:', error);
       }
     }, 5 * 60 * 1000);  // 5 dakika

     // Bağlantıyı kapatmak için gerekirse kullanabilirsiniz
     // sql.close();
   } catch (err) {
     console.error('Error connecting to the database:', err.message);
   }
 }

 // Fonksiyonu çağırarak veritabanına bağlanın
 connectToDatabase();







 //Amazon AWS FREE Tier example

 //const sql = require('mssql');

 //async function connectToDatabase() {
  //                                try {
     //                                const config = {
        //                               user: 'admin',
            //                           password: 'Klmn-32553255',
           //                            server: 'awssqlserver.ccrtpn4jk1n3.eu-central-1.rds.amazonaws.com',
            //                           database: 'coursemanagementsystem',
            //                           options: {
            //                               encrypt: true,
            //                               trustServerCertificate: true,
             //                          }
             //                        };
// 
   //                                  const pool = await sql.connect(config); // Bağlantıyı 'pool' değişkenine atayın
// 
   //                                  console.log('Connected to the AWS database successfully!');
// 
   //                                  // Keep alive database
      //                               setInterval(async () => {
         //                              try {
            //                             const result = await pool.request().query('SELECT 1');
              //                           console.log('Keep-alive is successful.');
                //                       } catch (error) {
                  //                       console.error('Keep-alive error:', error);
                    //                   }
                      //               }, 5 * 60 * 1000);  // 5 dakika

                                    // Bağlantıyı kapatmak için gerekirse kullanabilirsiniz
                                    // sql.close();
                        //           } catch (err) {
                         //            console.error('Error connecting to the database:', err.message);
                         //          }
                          //       }

                                // Fonksiyonu çağırarak veritabanına bağlanın
                       //          connectToDatabase();










