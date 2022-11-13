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
import { getProductCategory } from '../../store/actions/adminAction'
import { IMAGE_BASE_URL } from '../../store/WebApiUrl'

const ProductCategory = () => {
  const productCategoryList = useSelector((state) => state.admin.productCategoryList)
  const dispatch = useDispatch()
  const [productCategoryData, setProductCategoryData] = useState([]);

  useEffect(() => {
    dispatch(getProductCategory())
  }, [])

  useEffect(() => {
    setProductCategoryData(productCategoryList)
  }, [productCategoryList])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product Category List</strong> <small></small>
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
                  productCategoryData?.map((item, index) => {
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

export default ProductCategory
