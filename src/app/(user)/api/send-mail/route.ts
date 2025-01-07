import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, phone, subject, content } = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const text = `Khách hàng: ${name}
                     Số điện thoại: ${phone}
                     Email: ${email}
                     ${content}`;

        const mailOptions = {
            from: email,
            to: 'beestyle@otp.spit24h.top',
            subject: subject,
            text: text
        };

        console.log(mailOptions);
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Đã gửi thành công Email' }, { status: 200 });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi gửi Email:', error);
        return NextResponse.json({ message: 'Đã có lỗi xảy ra khi gửi thắc mắc. Vui lòng thử lại sau.' }, { status: 500 });
    }
}
