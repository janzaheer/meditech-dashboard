import React from 'react'
import './ManageProfile.css'

const ProfileEdit = () => {
    return (
        <div>
            <div className='container'>
                
                <div className='container my-5 w-50'>
                    
                    <form className="row g-3 form-con bg-white rounded">
                    <h3 className='text-center'>Edit Profile</h3>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault01" className="form-label">Name</label>
                            <input type="text" className="form-control" id="validationDefault01" placeholder='enter yor name' required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault02" className="form-label">Email Address </label>
                            <input type="email" className="form-control" id="validationDefault02" placeholder='abc@gmail.com' required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault03" className="form-label">Phone</label>
                            <input type="number" className="form-control" id="validationDefault03" required />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="validationDefault04" className="form-label">City</label>
                            <input type="text" className="form-control" id="validationDefault04" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationDefault05" className="form-label">DOB</label>
                            <input type="date" className="form-control" id="validationDefault05" required />
                        </div>
                        
                        
                        <div className="col-12">
                            <button className="btn btn-primary mt-5" type="button">Save Change</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default ProfileEdit