import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast, CToastBody, CToastHeader, CToaster, CFormInput, CFormLabel, CForm, CFormTextarea, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilPencil } from '@coreui/icons'

import { useSelector, useDispatch } from 'react-redux'
import { getCategory, getAstrologer, addAstrologer, updateAstrologer, deleteAstrologer } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Astrologer = () => {
  const astrologerList = useSelector((state) => state.admin.astrologerList)
  const categoryList = useSelector((state) => state.admin.categoryList)
  const dispatch = useDispatch()
  const [astrologerData, setAstrologerData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [validated, setValidated] = useState(false)
  const [updateItem, setUpdateItem] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getAstrologer())
  }, [])

  useEffect(() => {
    if (!visibleAdd) {
      setUpdateItem({})
      setIsEdit(false)
    }
  }, [visibleAdd])

  useEffect(() => {
    setAstrologerData(astrologerList)
  }, [astrologerList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteAstrologer(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Astrologer" autohide={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <strong className="me-auto">Astrologer</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Astrologer Deleted Failed" : "Astrologer Deleted Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }
    let apiData = new FormData();
    apiData.append("catId", event.target.astCategory.value)
    apiData.append("name", event.target.astName.value)
    apiData.append("experience", event.target.astExperience.value)
    apiData.append("language", event.target.astLanguage.value)
    apiData.append("pma", event.target.astPma.value)
    apiData.append("basicDetail", event.target.astBasicD.value)
    apiData.append("address", event.target.astAdd.value)
    apiData.append("city", event.target.astCity.value)
    apiData.append("state", event.target.astState.value)
    apiData.append("country", event.target.astCountry.value)
    apiData.append("pincode", event.target.astPincode.value)
    apiData.append("image", event.target.astImage.files[0])
    apiData.append("description", event.target.description.value)
    if (isEdit) {
      apiData.append("id", updateItem.id)
      dispatch(updateAstrologer(apiData, (res) => handleAddResponse(res, "Update")))
    } else {
      apiData.append("email", event.target.astEmail.value)
      apiData.append("password", event.target.astPass.value)
      apiData.append("mobile", event.target.astMobile.value)
      dispatch(addAstrologer(apiData, (res) => handleAddResponse(res, "Add")))
    }
  }

  const handleAddResponse = (response, type) => {
    setVisibleAdd(false);
    let successToast = (
      <CToast title="Astrologer" autohide={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill={response !== "error" ? "#007aff" : "red"}></rect>
          </svg>
          <strong className="me-auto">Astrologer</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response !== "error" ? response : "Astrologer " + type + " Failed"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  const updateModal = (item) => {
    setIsEdit(true)
    setUpdateItem(item);
    setVisibleAdd(true);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='d-md-flex'>
            <strong>Astrologer List</strong> <small></small>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                className='me-md-2 btn-sm'
                color={"primary"}
                onClick={() => setVisibleAdd(true)}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Add
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p> */}
            {/* <DocsExample href="components/table"> */}
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr. No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
                  <CTableHeaderCell scope="col">State</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  astrologerData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>
                          <img alt='' src={`${IMAGE_BASE_URL}${item.filePath}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
                        <CTableDataCell>{item.experience}</CTableDataCell>
                        <CTableDataCell>{item.state}</CTableDataCell>
                        <CTableDataCell>
                          <CIcon onClick={() => updateModal(item)} icon={cilPencil} className="me-2 danger" />
                          <CIcon onClick={() => deleteModal(item)} icon={cilTrash} className="me-2 danger mx-2" />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                }
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>

          {/* Add Modal */}
          <CModal size='lg' visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
            <CModalHeader>
              <CModalTitle>{isEdit ? "Update" : 'Add'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleAdd}
                encType="multipart/form-data"
              >

                <div className='col-md-6'>
                  <CFormLabel htmlFor="astCategory">
                    Select Category
                  </CFormLabel>

                  <CFormSelect defaultValue={updateItem.catId} name='astCategory' id='astCategory' aria-label="Default select example">
                    <option value="">Select Category</option>
                    {
                      categoryList.map((item) => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                      })
                    }
                  </CFormSelect>
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astName">
                    Name
                  </CFormLabel>
                  <CFormInput
                    name='astName'
                    id="astName"
                    required
                    type="text"
                    placeholder="Enter Name"
                    aria-label="default input example"
                    value={updateItem.name}
                    onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
                  />
                </div>
                {
                  !isEdit ? (
                    <div className='col-md-6'>
                      <CFormLabel htmlFor="astMobile">
                        Mobile
                      </CFormLabel>
                      <CFormInput
                        name='astMobile'
                        id="astMobile"
                        required
                        type="number"
                        placeholder="Enter Mobile"
                        aria-label="default input example"
                        value={updateItem.mobile}
                        onChange={(e) => setUpdateItem({ ...updateItem, mobile: e.target.value })}
                      />
                    </div>
                  ) : null
                }
                {
                  !isEdit ? (
                    <div className='col-md-6'>
                      <CFormLabel htmlFor="astEmail">
                        Email
                      </CFormLabel>
                      <CFormInput
                        name='astEmail'
                        id="astEmail"
                        required
                        type="email"
                        placeholder="Enter Email"
                        aria-label="default input example"
                        value={updateItem.email}
                        onChange={(e) => setUpdateItem({ ...updateItem, email: e.target.value })}
                      />
                    </div>
                  ) : null
                }
                {
                  !isEdit ? (
                    <div className='col-md-6'>
                      <CFormLabel htmlFor="astPass">
                        Password
                      </CFormLabel>
                      <CFormInput
                        name='astPass'
                        id="astPass"
                        required
                        type="password"
                        placeholder="Enter Password"
                        aria-label="default input example"
                      />
                    </div>
                  ) : null
                }
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astExperience">
                    Experience
                  </CFormLabel>
                  <CFormInput
                    name='astExperience'
                    id="astExperience"
                    required
                    type="text"
                    placeholder="Enter Experience"
                    aria-label="default input example"
                    value={updateItem.experience}
                    onChange={(e) => setUpdateItem({ ...updateItem, experience: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astLanguage">
                    Language
                  </CFormLabel>
                  <CFormInput
                    name='astLanguage'
                    id="astLanguage"
                    required
                    type="text"
                    placeholder="Enter Language"
                    aria-label="default input example"
                    value={updateItem.language}
                    onChange={(e) => setUpdateItem({ ...updateItem, language: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astPma">
                    PMA
                  </CFormLabel>
                  <CFormInput
                    name='astPma'
                    id="astPma"
                    required
                    type="text"
                    placeholder="Enter PMA"
                    aria-label="default input example"
                    value={updateItem.pma}
                    onChange={(e) => setUpdateItem({ ...updateItem, pma: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astBasicD">
                    Basic Detail
                  </CFormLabel>
                  <CFormInput
                    name='astBasicD'
                    id="astBasicD"
                    required
                    type="text"
                    placeholder="Enter Besic Detail"
                    aria-label="default input example"
                    value={updateItem.basicDetail}
                    onChange={(e) => setUpdateItem({ ...updateItem, basicDetail: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astCountry">
                    Country
                  </CFormLabel>
                  <CFormInput
                    name='astCountry'
                    id="astCountry"
                    required
                    type="text"
                    placeholder="Enter Country"
                    aria-label="default input example"
                    value={updateItem.country}
                    onChange={(e) => setUpdateItem({ ...updateItem, country: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astState">
                    State
                  </CFormLabel>
                  <CFormInput
                    name='astState'
                    id="astState"
                    required
                    type="text"
                    placeholder="Enter State"
                    aria-label="default input example"
                    value={updateItem.state}
                    onChange={(e) => setUpdateItem({ ...updateItem, state: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astCity">
                    City
                  </CFormLabel>
                  <CFormInput
                    name='astCity'
                    id="astCity"
                    required
                    type="text"
                    placeholder="Enter City"
                    aria-label="default input example"
                    value={updateItem.city}
                    onChange={(e) => setUpdateItem({ ...updateItem, city: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astPincode">
                    Pincode
                  </CFormLabel>
                  <CFormInput
                    name='astPincode'
                    id="astPincode"
                    required
                    type="number"
                    placeholder="Enter Pincode"
                    aria-label="default input example"
                    value={updateItem.pincode}
                    onChange={(e) => setUpdateItem({ ...updateItem, pincode: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astAdd">
                    Address
                  </CFormLabel>
                  <CFormTextarea
                    name='astAdd'
                    id="astAdd"
                    required
                    placeholder="Enter Address"
                    aria-label="default input example"
                    rows={1}
                    value={updateItem.address}
                    onChange={(e) => setUpdateItem({ ...updateItem, address: e.target.value })}
                  ></CFormTextarea>
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astImage">
                    Select Image
                  </CFormLabel>
                  <CFormInput
                    name='astImage'
                    type="file"
                    id="astImage"
                    aria-label="file example"
                    required={!isEdit}
                  />
                  {/* <CFormFeedback invalid>Category Image Required</CFormFeedback> */}
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="astDes" className="form-label">
                    Description
                  </CFormLabel>
                  <CFormTextarea
                    id="astDes"
                    name="description"
                    placeholder="Description"
                    // invalid
                    required
                    rows={4}
                    value={updateItem.description}
                    onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
                  ></CFormTextarea>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton type='submit' color="primary">{isEdit ? "Update" : 'Add'}</CButton>
                  <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
                    Cancel
                  </CButton>
                </div>
              </CForm>
            </CModalBody>
          </CModal>
          {/* Add Modal */}

          {/* Delete Modal */}
          <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
            <CModalHeader>
              <CModalTitle>Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to delete?</CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                No
              </CButton>
              <CButton onClick={() => handleDelete()} color="primary">Yes</CButton>
            </CModalFooter>
          </CModal>
          {/* Delete Modal */}

          <CToaster ref={toaster} push={(toast)} placement="top-end" />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Astrologer
