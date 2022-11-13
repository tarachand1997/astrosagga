import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { DocsExample } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Users = () => {
  const userList = useSelector((state) => state.admin.userList)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    setUserData(userList)
  }, [userList])

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
                      </CTableRow>
                    )
                  })
                }
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
