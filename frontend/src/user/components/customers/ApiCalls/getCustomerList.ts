import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";

export const getCustomerListApi = async(shop_id: number) =>{

    const tokenString = sessionStorage.getItem("userToken");

    if (tokenString !== null) {
        var token = JSON.parse(tokenString);
    } else {
        Swal.fire({
            title: "Token not Found",
            text: "Try to login Again then add the group.",
            icon: "warning"
        });
        return
    }

    const data = JSON.stringify({shop_id})
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/customer/get-list`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){            
            return response.data.details
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Oooops...",
            text: `Server side error`,
            icon: "warning"
        });
    });   
}