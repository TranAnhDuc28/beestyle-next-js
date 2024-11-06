'use client';
import ContactForm from "@/components/User/Contact/ContactForm";
import ContactInfo from "@/components/User/Contact/ContactInfo";

const Contact = () => {
    return (
        <section id="contact-us" className="contact-us section">
            <div className="container">
                <div className="contact-head">
                    <div className="row">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;