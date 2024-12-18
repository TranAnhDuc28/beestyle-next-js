'use client';
import BreadcrumbSection from "@/components/Breadcrumb/BreadCrumb";
import ContactForm from "@/components/User/Contact/ContactForm";
import ContactInfo from "@/components/User/Contact/ContactInfo";

const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Liên hệ' },
];

const Contact = () => {
    return (
        <>
            <BreadcrumbSection items={breadcrumbItems} />
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
        </>
    )
}

export default Contact;
