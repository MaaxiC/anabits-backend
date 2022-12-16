import nodemailer from "nodemailer";

export class MailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
            user: "maaxi.c@gmail.com",
            pass: "bppjakpkcwfcllgz",
            },
        });
    }

    sendMail = async ({from, to, subject, html, attachments=[]}) => {
        await this.transporter.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
    }
}