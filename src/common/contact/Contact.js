import React from 'react'
import './contact.css'

const Contact = () => {
    return (
        <div>
            
                <div className="container contact-form">
                    <div className="contact-image">
                        <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
                    </div>
                    <form method="post">
                        <h3>Drop Us a Message</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="text" name="txtName" className="form-control" placeholder="Your Name "  />
                                </div>
                                <div className="form-group mb-3">
                                    <input type="text" name="txtEmail" className="form-control" placeholder="Your Email "  />
                                </div>
                                <div className="form-group" mb-3>
                                    <input type="text" name='txtPhone' className="form-control" id="txtPhone" placeholder="your number"/>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="submit" name="btnSubmit" className="btn btn-danger w-100" defaultValue="Send Message" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <textarea name="txtMsg" className="form-control" placeholder="Your Message *" style={{ width: '100%', height: 150 }} defaultValue={""} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>


        </div>
    )
}

export default Contact