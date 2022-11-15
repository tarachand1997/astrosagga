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
import { cilDelete } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getTermCondition, deleteTermCondition } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const TermCondition = () => {
  const termConditionList = useSelector((state) => state.admin.termConditionList)
  const dispatch = useDispatch()
  const [termConditionData, setTermConditionData] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    dispatch(getTermCondition())
  }, [])

  useEffect(() => {
    setTermConditionData(termConditionList)
  }, [termConditionList])

  const deleteModal = (item) => {
    setSelectedData(item)
    setVisibleDelete(true);
  }

  const handleDelete = () => {
    let apiData = {
      id: selectedData.id
    };
    dispatch(deleteTermCondition(apiData, (response) => handleDeleteResponse(response)));
  }

  const handleDeleteResponse = (response) => {
    setVisibleDelete(false);
    let successToast = (
      <CToast title="Term & Condition" autohide={true}>
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
          <strong className="me-auto">Term & Condition</strong>
          <small>Just now</small>
        </CToastHeader>
        <CToastBody>{response == "error" ? "Term & Condition Deleted Failed" : "Term & Condition Deleted Successfully"}</CToastBody>
      </CToast>
    )
    addToast(successToast);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Terms & condition List</strong> <small></small>
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
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  termConditionData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.status}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            // key={index}
                            active={false}
                            // disabled={state === 'disabled'}
                            onClick={() => deleteModal(item)}
                          >
                            <CIcon icon={cilDelete} className="me-2" />
                          </CButton>
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

export default TermCondition
