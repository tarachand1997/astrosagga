import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast, CToastBody, CToastHeader, CToaster, CFormInput, CFormLabel, CForm } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getSliders, addSliders, deleteSliders } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Slider = () => {
  const sliderList = useSelector((state) => state.admin.sliderList)
  const dispatch = useDispatch()
  const [sliderListData, setSliderListData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [validated, setValidated] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getSliders())
  }, [])

  useEffect(() => {
    setSliderListData(sliderList)
  }, [sliderList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteSliders(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Slider" autohide={true}>
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
          <strong className="me-auto">Slider</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Slider Deleted Failed" : "Slider Deleted Successfully"}</CToastBody>
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
    apiData.append("name", event.target.catName.value)
    apiData.append("image", event.target.catImage.files[0])
    dispatch(addSliders(apiData, (res) => handleAddResponse(res)))
  }

  const handleAddResponse = (response) => {
    setVisibleAdd(false);
    let successToast = (
      <CToast title="Slider" autohide={true}>
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
            <rect width="100%" height="100%" fill={response === "error" ? "red" : "#007aff"}></rect>
          </svg>
          <strong className="me-auto">Slider</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Slider Add Failed" : "Slider Added Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Slider List</strong> <small></small>
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
                  <CTableHeaderCell scope="col">Slider Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Slider Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  sliderListData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>
                          <img src={`${IMAGE_BASE_URL}${item.filePath}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CIcon onClick={() => deleteModal(item)} icon={cilTrash} className="me-2 danger" />
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
              <CModalTitle>Add</CModalTitle>
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
                    Name
                  </CFormLabel>
                  <CFormInput
                    name='catName'
                    id="validationDefault05"
                    required
                    type="text"
                    placeholder="Enter Name"
                    aria-label="default input example"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea">
                    Select Image
                  </CFormLabel>
                  <CFormInput
                    name='catImage'
                    type="file"
                    id="validationTextarea"
                    aria-label="file example"
                    required
                  />
                  {/* <CFormFeedback invalid>Category Image Required</CFormFeedback> */}
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton type='submit' color="primary">Add</CButton>
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

export default Slider
