import httpInstance from "@/utils/HttpInstance";

export const URL_API_MAIL = {
    sendMail: '/admin/mail/send-thanhYou-mail'
}

export const getSendThankMail = async (data:any) => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append("files", data.files)
    // // Thêm file vào FormData nếu có
    // if (data.files && data.files.length > 0) {
    //     for (let i = 0; i < data.files.length; i++) {
    //         formData.append("files", data.files[i]); // Gửi file qua FormData
    //     }
    // }

    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    
    // Gửi yêu cầu
    const response = await httpInstance.post(URL_API_MAIL.sendMail, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
    
}