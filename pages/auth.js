// export async function getAuth() {
//     const auth = false;
//     try {
//         const response = await fetch('http://localhost:3000/api/user', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-auth-token': window.localStorage.getItem('x-auth-token')
//             }
//         });
//         // console.log('res',credentials);
//         const content = await response.json();

//         // setMessage(`Hi ${content.firstname}`);
//         auth=true;
//     } catch (e) {
//         // setMessage('You are not logged in');
//         auth=false;
//     }
//     return auth;
// }

// export default async function handler(req, res) {
//     const jsonData = await getAuth()
//     return jsonData
// }