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
import { getCategory } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const Category = () => {
  const categoryList = useSelector((state) => state.admin.categoryList)
  const dispatch = useDispatch()
  const [categoryListData, setCategoryListData] = useState([]);

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    setCategoryListData(categoryList)
  }, [categoryList])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Category List</strong> <small></small>
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
                  <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category Image</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  categoryListData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>
                          <img src={`${IMAGE_BASE_URL}${item.filePath}/${item.image}`} height="50" width="50" />
                        </CTableDataCell>
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

export default Category
