import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, deleteUsers } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Users = () => {
  const userList = useSelector((state) => state.admin.userList)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    setUserData(userList)
  }, [userList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteUsers(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="User" autohide={true}>
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
          <strong className="me-auto">User</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response == "error" ? "User Deleted Failed" : "User Deleted Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users List</strong> <small></small>
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
                  <CTableHeaderCell scope="col">Pincode</CTableHeaderCell>
                  <CTableHeaderCell scope="col">State</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  userData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>
                          <img src={`${IMAGE_BASE_URL}${item.filePath}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
                        <CTableDataCell>{item.pincode}</CTableDataCell>
                        <CTableDataCell>{item.state}</CTableDataCell>
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

export default Users
