import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CToast, CToastBody, CToastHeader, CToaster, CFormInput, CFormLabel, CForm, CFormTextarea, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilPencil } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getCategory, getCourses, addCourses, updateCourses, deleteCourses } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Courses = () => {
  const CoursesList = useSelector((state) => state.admin.coursesList)
  const categoryList = useSelector((state) => state.admin.categoryList)
  const dispatch = useDispatch()
  const [CoursesData, setCoursesData] = useState([]);
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
    dispatch(getCourses())
  }, [])

  useEffect(() => {
    if (!visibleAdd) {
      setUpdateItem({})
      setIsEdit(false)
    }
  }, [visibleAdd])

  useEffect(() => {
    setCoursesData(CoursesList)
  }, [CoursesList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteCourses(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Courses" autohide={true}>
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
          <strong className="me-auto">Courses</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response === "error" ? "Courses Deleted Failed" : "Courses Deleted Successfully"}</CToastBody>
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
    apiData.append("cat_id", event.target.courseCategory.value)
    apiData.append("courseName", event.target.catName.value)
    apiData.append("description", event.target.description.value)
    apiData.append("fees", event.target.courseFee.value)
    apiData.append("course_time", event.target.courseTime.value)
    apiData.append("course_timeString", event.target.courseTimeType.value)
    apiData.append("image", event.target.catImage.files[0])
    if (isEdit) {
      apiData.append("id", updateItem.id)
      dispatch(updateCourses(apiData, (res) => handleAddResponse(res, "Update")))
    } else {
      dispatch(addCourses(apiData, (res) => handleAddResponse(res, "Add")))
    }
  }

  const handleAddResponse = (response, type) => {
    setVisibleAdd(false);
    let successToast = (
      <CToast title="Courses" autohide={true}>
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
          <strong className="me-auto">Courses</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response !== "error" ? response : "Courses " + type + " Failed"}</CToastBody>
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
            <strong>Courses List</strong> <small></small>
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
                  <CTableHeaderCell scope="col">Course Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fees</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Course Time</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  CoursesData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.courseName}</CTableDataCell>
                        <CTableDataCell>{item.fees}</CTableDataCell>
                        <CTableDataCell>{item.course_time + " " + item.course_timeString}</CTableDataCell>
                        <CTableDataCell>
                          <img alt='' src={`${IMAGE_BASE_URL}${item.file_path}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
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
                <div>
                  <CFormLabel htmlFor="courseCategory">
                    Select Category
                  </CFormLabel>
                  <CFormSelect defaultValue={updateItem.cat_id} name='courseCategory' id='courseCategory' aria-label="Default select example">
                    <option value="">Select Category</option>
                    {
                      categoryList.map((item) => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                      })
                    }
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel htmlFor="validationDefault05">
                    Course Name
                  </CFormLabel>
                  <CFormInput
                    name='catName'
                    id="validationDefault05"
                    required
                    type="text"
                    value={updateItem.courseName}
                    onChange={(e) => setUpdateItem({ ...updateItem, courseName: e.target.value })}
                    placeholder="Enter Course Name"
                    aria-label="default input example"
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="courseFee">
                    Course Fees
                  </CFormLabel>
                  <CFormInput
                    name='courseFee'
                    id="courseFee"
                    required
                    type="number"
                    min={1}
                    value={updateItem.fees}
                    onChange={(e) => setUpdateItem({ ...updateItem, fees: e.target.value })}
                    placeholder="Enter Course Fees"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="courseTime">
                    Course Time
                  </CFormLabel>
                  <CFormInput
                    name='courseTime'
                    id="courseTime"
                    required
                    type="number"
                    min={1}
                    value={updateItem.course_time}
                    onChange={(e) => setUpdateItem({ ...updateItem, course_time: e.target.value })}
                    placeholder="Enter Course time"
                    aria-label="default input example"
                  />
                </div>
                <div className='col-md-6'>
                  <CFormLabel htmlFor="courseTimeType">
                    Select Course Time Type
                  </CFormLabel>
                  <CFormSelect defaultValue={updateItem.course_timeString} name='courseTimeType' id='courseTimeType' aria-label="Default select example">
                    <option value="">Select Course Time Type</option>
                    <option value={"day"}>Day</option>
                    <option value={"month"}>Month</option>
                    <option value={"year"}>Year</option>
                  </CFormSelect>
                </div>
                <div>
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
                <div className="mb-3">
                  <CFormLabel htmlFor="catImage">
                    Select Image
                  </CFormLabel>
                  <CFormInput
                    name='catImage'
                    type="file"
                    id="catImage"
                    aria-label="file example"
                    required={!isEdit}
                  />
                  {/* <CFormFeedback invalid>Category Image Required</CFormFeedback> */}
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

export default Courses
