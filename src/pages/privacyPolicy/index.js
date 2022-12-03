import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast, CToastBody, CToastHeader, CToaster, CFormInput, CFormLabel, CForm, CFormTextarea } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilPencil } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getPrivacyPolicy, addPrivacyPolicy, updatePrivacyPolicy, deletePrivacyPolicy } from '../../store/actions/adminAction'

const PrivacyPolicy = () => {
  const privacyPolicyList = useSelector((state) => state.admin.privacyPolicyList)
  const dispatch = useDispatch()
  const [privacyPolicyData, setPrivacyPolicyData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [validated, setValidated] = useState(false)
  const [updateItem, setUpdateItem] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getPrivacyPolicy())
  }, [])

  useEffect(() => {
    if (!visibleAdd) {
      setUpdateItem({})
      setIsEdit(false)
    }
  }, [visibleAdd])

  useEffect(() => {
    setPrivacyPolicyData(privacyPolicyList)
  }, [privacyPolicyList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deletePrivacyPolicy(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Privacy Policy" autohide={true}>
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
          <strong className="me-auto">Privacy Policy</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Privacy Policy Deleted Failed" : "Privacy Policy Deleted Successfully"}</CToastBody>
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
    apiData.append("title", event.target.catName.value)
    apiData.append("description", event.target.description.value)
    if (isEdit) {
      apiData.append("id", updateItem.id)
      dispatch(updatePrivacyPolicy(apiData, (res) => handleAddResponse(res, "Update")))
    } else {
      dispatch(addPrivacyPolicy(apiData, (res) => handleAddResponse(res, "Add")))
    }
  }

  const handleAddResponse = (response, type) => {
    setVisibleAdd(false);
    let successToast = (
      <CToast title="Privacy Policy" autohide={true}>
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
          <strong className="me-auto">Privacy Policy</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response !== "error" ? response : "Privacy Policy " + type + " Failed"}</CToastBody>
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
            <strong>Privacy Policy List</strong> <small></small>
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
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr. No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  privacyPolicyData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.status}</CTableDataCell>
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
          <CModal alignment="center" visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
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

                <div className="mb-3">
                  <CFormLabel htmlFor="validationDefault05">
                    Title
                  </CFormLabel>
                  <CFormInput
                    name='catName'
                    id="validationDefault05"
                    required
                    type="text"
                    value={updateItem.title}
                    onChange={(e) => setUpdateItem({ ...updateItem, title: e.target.value })}
                    placeholder="Enter Title"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea" className="form-label">
                    Description
                  </CFormLabel>
                  <CFormTextarea
                    id="validationTextarea"
                    name="description"
                    placeholder="Description"
                    // invalid
                    value={updateItem.description}
                    onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
                    required
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

export default PrivacyPolicy
