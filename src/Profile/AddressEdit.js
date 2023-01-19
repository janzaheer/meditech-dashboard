import React from 'react'

const AddressEdit = () => {
    return (
        <div>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">FullName</label>
                    <input type="name" className="form-control" id="inputName4" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputNumber4" className="form-label">Number</label>
                    <input type="number" className="form-control" id="inputNumber4" />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddressEdit